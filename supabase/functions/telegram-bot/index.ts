import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();
    console.log(`Telegram bot action: ${action}`, data);

    let result;

    switch (action) {
      case 'check_subscription': {
        // Check if user is subscribed to a channel
        const { channel_id, user_id } = data;
        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`
        );
        const memberData = await response.json();
        console.log('getChatMember response:', memberData);
        
        if (memberData.ok) {
          const status = memberData.result.status;
          const isSubscribed = ['member', 'administrator', 'creator'].includes(status);
          result = { subscribed: isSubscribed, status };
        } else {
          result = { subscribed: false, error: memberData.description };
        }
        break;
      }

      case 'check_all_subscriptions': {
        // Check multiple channels
        const { channels, user_id } = data;
        const results = await Promise.all(
          channels.map(async (channel_id: string) => {
            try {
              const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember?chat_id=${channel_id}&user_id=${user_id}`
              );
              const memberData = await response.json();
              if (memberData.ok) {
                const status = memberData.result.status;
                return { channel_id, subscribed: ['member', 'administrator', 'creator'].includes(status), status };
              }
              return { channel_id, subscribed: false, error: memberData.description };
            } catch (err) {
              return { channel_id, subscribed: false, error: String(err) };
            }
          })
        );
        result = { channels: results, all_subscribed: results.every(r => r.subscribed) };
        break;
      }

      case 'send_message': {
        // Send message to channel/chat
        const { chat_id, text, parse_mode, reply_markup } = data;
        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id,
              text,
              parse_mode: parse_mode || 'HTML',
              reply_markup
            })
          }
        );
        result = await response.json();
        console.log('sendMessage response:', result);
        break;
      }

      case 'get_chat': {
        // Get chat info
        const { chat_id } = data;
        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat?chat_id=${chat_id}`
        );
        result = await response.json();
        break;
      }

      case 'get_me': {
        // Get bot info
        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
        );
        result = await response.json();
        break;
      }

      case 'create_invite_link': {
        // Create invite link for a channel
        const { chat_id, name, expire_date, member_limit } = data;
        const response = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/createChatInviteLink`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id,
              name,
              expire_date,
              member_limit
            })
          }
        );
        result = await response.json();
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Telegram bot error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
