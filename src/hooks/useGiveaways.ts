import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Reward {
  position: number;
  prize: string;
}

export interface Giveaway {
  id: string;
  title: string;
  description: string | null;
  chat_ids: string[];
  winners_count: number;
  votes_per_user: number;
  require_subscription: boolean;
  require_voting: boolean;
  rewards: Reward[];
  start_time: string;
  end_time: string;
  status: 'active' | 'ended' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Participant {
  id: string;
  giveaway_id: string;
  telegram_user_id: string;
  telegram_username: string | null;
  telegram_name: string | null;
  is_subscribed: boolean;
  registered_at: string;
  votes_count?: number;
}

export interface Vote {
  id: string;
  giveaway_id: string;
  voter_telegram_id: string;
  participant_id: string;
  voted_at: string;
}

export const useGiveaways = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('giveaways-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'giveaways' }, () => {
        queryClient.invalidateQueries({ queryKey: ['giveaways'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['giveaways'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('giveaways')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return (data || []).map(g => ({
        ...g,
        rewards: (g.rewards as unknown as Reward[]) || []
      })) as Giveaway[];
    }
  });
};

export const useGiveaway = (id: string) => {
  return useQuery({
    queryKey: ['giveaway', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('giveaways')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      return {
        ...data,
        rewards: (data.rewards as unknown as Reward[]) || []
      } as Giveaway;
    },
    enabled: !!id
  });
};

export const useCreateGiveaway = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (giveaway: Omit<Giveaway, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('giveaways')
        .insert({
          ...giveaway,
          rewards: giveaway.rewards as unknown as any
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['giveaways'] });
    }
  });
};

export const useParticipants = (giveawayId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`participants-${giveawayId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'participants', filter: `giveaway_id=eq.${giveawayId}` }, () => {
        queryClient.invalidateQueries({ queryKey: ['participants', giveawayId] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [giveawayId, queryClient]);

  return useQuery({
    queryKey: ['participants', giveawayId],
    queryFn: async () => {
      const { data: participants, error: pError } = await supabase
        .from('participants')
        .select('*')
        .eq('giveaway_id', giveawayId)
        .order('registered_at', { ascending: false });
      
      if (pError) throw pError;

      const { data: votes, error: vError } = await supabase
        .from('votes')
        .select('participant_id')
        .eq('giveaway_id', giveawayId);
      
      if (vError) throw vError;

      const voteCounts: Record<string, number> = {};
      votes?.forEach(v => {
        voteCounts[v.participant_id] = (voteCounts[v.participant_id] || 0) + 1;
      });

      return (participants || []).map(p => ({
        ...p,
        votes_count: voteCounts[p.id] || 0
      })) as Participant[];
    },
    enabled: !!giveawayId
  });
};

export const useRegisterParticipant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (participant: { giveaway_id: string; telegram_user_id: string; telegram_username?: string; telegram_name?: string; is_subscribed: boolean }) => {
      const { data, error } = await supabase
        .from('participants')
        .insert(participant)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['participants', variables.giveaway_id] });
    }
  });
};

export const useCastVote = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (vote: { giveaway_id: string; voter_telegram_id: string; participant_id: string }) => {
      const { data, error } = await supabase
        .from('votes')
        .insert(vote)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['participants', variables.giveaway_id] });
    }
  });
};
