import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiveawayCard } from "@/components/GiveawayCard";
import { IconBadge } from "@/components/IconBadge";
import { User, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useRegisterParticipant, Giveaway } from "@/hooks/useGiveaways";
import { useConfig } from "@/hooks/useConfig";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserParticipationProps {
  giveaway: Giveaway;
  onParticipated: (telegramId: string) => void;
}

export const UserParticipation = ({ giveaway, onParticipated }: UserParticipationProps) => {
  const [telegramId, setTelegramId] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [telegramName, setTelegramName] = useState("");
  const [checking, setChecking] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<Record<string, boolean>>({});
  
  const { data: config } = useConfig();
  const registerParticipant = useRegisterParticipant();
  const { toast } = useToast();

  const checkSubscriptions = async () => {
    if (!telegramId.trim()) {
      toast({
        title: "⚠️ ᴇʀʀᴏʀ",
        description: "ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ʏᴏᴜʀ ᴛᴇʟᴇɢʀᴀᴍ ɪᴅ",
        variant: "destructive"
      });
      return;
    }

    setChecking(true);
    const channels = config?.required_channels || [];
    
    if (channels.length === 0) {
      // No channels to check, allow participation
      setSubscriptionStatus({});
      handleRegister(true);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('telegram-bot', {
        body: {
          action: 'check_all_subscriptions',
          data: {
            channels,
            user_id: telegramId
          }
        }
      });

      if (error) throw error;

      const statusMap: Record<string, boolean> = {};
      data.channels?.forEach((c: any) => {
        statusMap[c.channel_id] = c.subscribed;
      });
      setSubscriptionStatus(statusMap);

      if (data.all_subscribed) {
        handleRegister(true);
      } else {
        toast({
          title: "⚠️ ꜱᴜʙꜱᴄʀɪᴘᴛɪᴏɴ ʀᴇQᴜɪʀᴇᴅ",
          description: "ᴘʟᴇᴀꜱᴇ ꜱᴜʙꜱᴄʀɪʙᴇ ᴛᴏ ᴀʟʟ ʀᴇQᴜɪʀᴇᴅ ᴄʜᴀɴɴᴇʟꜱ",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Subscription check error:', error);
      toast({
        title: "⚠️ ᴡᴀʀɴɪɴɢ",
        description: "ᴄᴏᴜʟᴅ ɴᴏᴛ ᴠᴇʀɪꜰʏ ꜱᴜʙꜱᴄʀɪᴘᴛɪᴏɴꜱ. ᴘʀᴏᴄᴇᴇᴅɪɴɢ ᴀɴʏᴡᴀʏ...",
      });
      handleRegister(false);
    } finally {
      setChecking(false);
    }
  };

  const handleRegister = async (isSubscribed: boolean) => {
    try {
      await registerParticipant.mutateAsync({
        giveaway_id: giveaway.id,
        telegram_user_id: telegramId,
        telegram_username: telegramUsername || undefined,
        telegram_name: telegramName || undefined,
        is_subscribed: isSubscribed
      });

      // Send notification to channel
      if (config?.required_channels?.length) {
        try {
          await supabase.functions.invoke('telegram-bot', {
            body: {
              action: 'send_message',
              data: {
                chat_id: config.required_channels[0],
                text: `[⚡] ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛ ᴅᴇᴛᴀɪʟꜱ [⚡]\n\n▸ ᴜꜱᴇʀ: ${telegramName || 'ᴜɴᴋɴᴏᴡɴ'}\n▸ ᴜꜱᴇʀ-ɪᴅ: ${telegramId}\n▸ ᴜꜱᴇʀɴᴀᴍᴇ: ${telegramUsername ? `@${telegramUsername.replace('@', '')}` : 'ɴ/ᴀ'}\n\nɴᴏᴛᴇ: ᴏɴʟʏ ᴄʜᴀɴɴᴇʟ ꜱᴜʙꜱᴄʀɪʙᴇʀꜱ ᴄᴀɴ ᴠᴏᴛᴇ.\n\n© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴜꜱɪɴɢ @${config.telegram_bot_username || 'ꜰᴛᴍʙᴏᴛᴢx'}`,
                reply_markup: {
                  inline_keyboard: [
                    [
                      { text: 'ℹ️ ɪɴꜰᴏ', url: `${window.location.origin}?giveaway=${giveaway.id}` },
                      { text: '⚡ ᴠᴏᴛᴇ', url: `${window.location.origin}?giveaway=${giveaway.id}&vote=true` }
                    ]
                  ]
                }
              }
            }
          });
        } catch (e) {
          console.error('Failed to send notification:', e);
        }
      }

      toast({
        title: "✅ ʀᴇɢɪꜱᴛᴇʀᴇᴅ!",
        description: "ʏᴏᴜ ʜᴀᴠᴇ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴊᴏɪɴᴇᴅ ᴛʜᴇ ɢɪᴠᴇᴀᴡᴀʏ!"
      });
      
      onParticipated(telegramId);
    } catch (error: any) {
      if (error.message?.includes('duplicate')) {
        toast({
          title: "ℹ️ ᴀʟʀᴇᴀᴅʏ ʀᴇɢɪꜱᴛᴇʀᴇᴅ",
          description: "ʏᴏᴜ ᴀʀᴇ ᴀʟʀᴇᴀᴅʏ ᴘᴀʀᴛɪᴄɪᴘᴀᴛɪɴɢ!"
        });
        onParticipated(telegramId);
      } else {
        toast({
          title: "❌ ᴇʀʀᴏʀ",
          description: "ꜰᴀɪʟᴇᴅ ᴛᴏ ʀᴇɢɪꜱᴛᴇʀ",
          variant: "destructive"
        });
      }
    }
  };

  const requiredChannels = config?.required_channels || [];

  return (
    <GiveawayCard>
      <div className="flex items-center gap-3 mb-4">
        <IconBadge icon={User} color="green" />
        <h2 className="font-semibold text-foreground small-caps">🎯 ᴊᴏɪɴ ɢɪᴠᴇᴀᴡᴀʏ</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="small-caps text-muted-foreground">🆔 ᴛᴇʟᴇɢʀᴀᴍ ᴜꜱᴇʀ ɪᴅ *</Label>
          <Input
            value={telegramId}
            onChange={(e) => setTelegramId(e.target.value)}
            placeholder="ᴇ.ɢ. 1234567890"
            className="bg-background/50 border-border"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="small-caps text-muted-foreground">👤 ᴛᴇʟᴇɢʀᴀᴍ ᴜꜱᴇʀɴᴀᴍᴇ</Label>
          <Input
            value={telegramUsername}
            onChange={(e) => setTelegramUsername(e.target.value)}
            placeholder="ᴇ.ɢ. @ʏᴏᴜʀᴜꜱᴇʀɴᴀᴍᴇ"
            className="bg-background/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label className="small-caps text-muted-foreground">📝 ʏᴏᴜʀ ɴᴀᴍᴇ</Label>
          <Input
            value={telegramName}
            onChange={(e) => setTelegramName(e.target.value)}
            placeholder="ᴇ.ɢ. ᴊᴏʜɴ ᴅᴏᴇ"
            className="bg-background/50 border-border"
          />
        </div>

        {/* Required Channels */}
        {requiredChannels.length > 0 && (
          <div className="space-y-2">
            <Label className="small-caps text-muted-foreground">📢 ʀᴇQᴜɪʀᴇᴅ ꜱᴜʙꜱᴄʀɪᴘᴛɪᴏɴꜱ</Label>
            <div className="space-y-2">
              {requiredChannels.map((channel, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded bg-background/50 border border-border"
                >
                  <a 
                    href={`https://t.me/${channel.replace('@', '').replace('-100', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {channel}
                  </a>
                  {subscriptionStatus[channel] !== undefined && (
                    subscriptionStatus[channel] ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={checkSubscriptions}
          disabled={checking || registerParticipant.isPending || !telegramId.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground small-caps"
        >
          {checking ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ᴄʜᴇᴄᴋɪɴɢ...
            </>
          ) : (
            "🚀 ᴘᴀʀᴛɪᴄɪᴘᴀᴛᴇ"
          )}
        </Button>
      </div>
    </GiveawayCard>
  );
};
