-- Configuration table for admin settings
CREATE TABLE public.config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_username TEXT NOT NULL DEFAULT 'ftmbotzx',
  admin_password TEXT NOT NULL DEFAULT 'ftm@2025',
  telegram_bot_username TEXT DEFAULT 'ftmbotzx_bot',
  telegram_admin_id TEXT,
  required_channels TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default config
INSERT INTO public.config (admin_username, admin_password) VALUES ('ftmbotzx', 'ftm@2025');

-- Giveaways table
CREATE TABLE public.giveaways (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  chat_ids TEXT[] DEFAULT '{}',
  winners_count INTEGER NOT NULL DEFAULT 1,
  votes_per_user INTEGER NOT NULL DEFAULT 1,
  require_subscription BOOLEAN NOT NULL DEFAULT true,
  require_voting BOOLEAN NOT NULL DEFAULT false,
  rewards JSONB DEFAULT '[]',
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'ended', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Participants table
CREATE TABLE public.participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  giveaway_id UUID NOT NULL REFERENCES public.giveaways(id) ON DELETE CASCADE,
  telegram_user_id TEXT NOT NULL,
  telegram_username TEXT,
  telegram_name TEXT,
  is_subscribed BOOLEAN NOT NULL DEFAULT false,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(giveaway_id, telegram_user_id)
);

-- Votes table
CREATE TABLE public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  giveaway_id UUID NOT NULL REFERENCES public.giveaways(id) ON DELETE CASCADE,
  voter_telegram_id TEXT NOT NULL,
  participant_id UUID NOT NULL REFERENCES public.participants(id) ON DELETE CASCADE,
  voted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(giveaway_id, voter_telegram_id, participant_id)
);

-- Enable realtime for giveaways and participants
ALTER PUBLICATION supabase_realtime ADD TABLE public.giveaways;
ALTER PUBLICATION supabase_realtime ADD TABLE public.participants;
ALTER PUBLICATION supabase_realtime ADD TABLE public.votes;

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for timestamp updates
CREATE TRIGGER update_config_updated_at
  BEFORE UPDATE ON public.config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_giveaways_updated_at
  BEFORE UPDATE ON public.giveaways
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();