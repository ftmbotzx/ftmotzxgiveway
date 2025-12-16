-- Enable RLS on all tables
ALTER TABLE public.config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.giveaways ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Config table: public read for verifying admin, no public write
CREATE POLICY "Anyone can read config for verification"
  ON public.config FOR SELECT
  USING (true);

-- Giveaways: public read, admin manages via edge function
CREATE POLICY "Anyone can view giveaways"
  ON public.giveaways FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create giveaways"
  ON public.giveaways FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update giveaways"
  ON public.giveaways FOR UPDATE
  USING (true);

-- Participants: public read/write for registration
CREATE POLICY "Anyone can view participants"
  ON public.participants FOR SELECT
  USING (true);

CREATE POLICY "Anyone can register as participant"
  ON public.participants FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update participants"
  ON public.participants FOR UPDATE
  USING (true);

-- Votes: public read/write
CREATE POLICY "Anyone can view votes"
  ON public.votes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can cast votes"
  ON public.votes FOR INSERT
  WITH CHECK (true);