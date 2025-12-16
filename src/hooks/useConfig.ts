import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Config {
  id: string;
  admin_username: string;
  admin_password: string;
  telegram_bot_username: string | null;
  telegram_admin_id: string | null;
  required_channels: string[];
  created_at: string;
  updated_at: string;
}

export const useConfig = () => {
  return useQuery({
    queryKey: ['config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('config')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data as Config | null;
    }
  });
};

export const useUpdateConfig = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: Partial<Config>) => {
      const { data: existing } = await supabase
        .from('config')
        .select('id')
        .limit(1)
        .maybeSingle();
      
      if (existing) {
        const { data, error } = await supabase
          .from('config')
          .update(updates)
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('config')
          .insert(updates)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['config'] });
    }
  });
};
