import { useState } from "react";
import { User, ThumbsUp, Search } from "lucide-react";
import { GiveawayCard } from "@/components/GiveawayCard";
import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParticipants, useCastVote, Participant } from "@/hooks/useGiveaways";
import { useToast } from "@/hooks/use-toast";

interface ParticipantsListProps {
  giveawayId: string;
  voterId?: string;
  votesPerUser: number;
}

export const ParticipantsList = ({ giveawayId, voterId, votesPerUser }: ParticipantsListProps) => {
  const { data: participants, isLoading } = useParticipants(giveawayId);
  const castVote = useCastVote();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [votedFor, setVotedFor] = useState<Set<string>>(new Set());

  const handleVote = async (participant: Participant) => {
    if (!voterId) {
      toast({
        title: "⚠️ ᴇʀʀᴏʀ",
        description: "ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ʏᴏᴜʀ ᴛᴇʟᴇɢʀᴀᴍ ɪᴅ ᴛᴏ ᴠᴏᴛᴇ",
        variant: "destructive"
      });
      return;
    }

    if (votedFor.size >= votesPerUser) {
      toast({
        title: "⚠️ ᴠᴏᴛᴇ ʟɪᴍɪᴛ",
        description: `ʏᴏᴜ ᴄᴀɴ ᴏɴʟʏ ᴠᴏᴛᴇ ꜰᴏʀ ${votesPerUser} ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛꜱ`,
        variant: "destructive"
      });
      return;
    }

    try {
      await castVote.mutateAsync({
        giveaway_id: giveawayId,
        voter_telegram_id: voterId,
        participant_id: participant.id
      });
      
      setVotedFor(prev => new Set([...prev, participant.id]));
      
      toast({
        title: "✅ ᴠᴏᴛᴇᴅ!",
        description: `ʏᴏᴜ ᴠᴏᴛᴇᴅ ꜰᴏʀ ${participant.telegram_name || participant.telegram_username || 'ᴜꜱᴇʀ'}`
      });
    } catch (error: any) {
      if (error.message?.includes('duplicate')) {
        toast({
          title: "⚠️ ᴀʟʀᴇᴀᴅʏ ᴠᴏᴛᴇᴅ",
          description: "ʏᴏᴜ ᴀʟʀᴇᴀᴅʏ ᴠᴏᴛᴇᴅ ꜰᴏʀ ᴛʜɪꜱ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛ",
          variant: "destructive"
        });
      } else {
        toast({
          title: "❌ ᴇʀʀᴏʀ",
          description: "ꜰᴀɪʟᴇᴅ ᴛᴏ ᴄᴀꜱᴛ ᴠᴏᴛᴇ",
          variant: "destructive"
        });
      }
    }
  };

  const filteredParticipants = participants?.filter(p => 
    (p.telegram_name?.toLowerCase().includes(search.toLowerCase())) ||
    (p.telegram_username?.toLowerCase().includes(search.toLowerCase())) ||
    (p.telegram_user_id.includes(search))
  ) || [];

  const sortedParticipants = [...filteredParticipants].sort((a, b) => 
    (b.votes_count || 0) - (a.votes_count || 0)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground small-caps">⏳ ʟᴏᴀᴅɪɴɢ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ꜱᴇᴀʀᴄʜ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛꜱ..."
          className="pl-10 bg-background/50 border-border"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="small-caps">👥 {participants?.length || 0} ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛꜱ</span>
        <span className="small-caps">🗳️ {votedFor.size}/{votesPerUser} ᴠᴏᴛᴇꜱ ᴜꜱᴇᴅ</span>
      </div>

      {/* Participants List */}
      {sortedParticipants.length === 0 ? (
        <GiveawayCard className="text-center py-8">
          <User className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground small-caps">ɴᴏ ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛꜱ ʏᴇᴛ</p>
        </GiveawayCard>
      ) : (
        <div className="space-y-2">
          {sortedParticipants.map((participant, index) => (
            <GiveawayCard key={participant.id} className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                    {index + 1}
                  </div>
                  <IconBadge icon={User} color="blue" size="sm" />
                  <div>
                    <p className="font-medium text-foreground">
                      {participant.telegram_name || participant.telegram_username || `ᴜꜱᴇʀ ${participant.telegram_user_id}`}
                    </p>
                    {participant.telegram_username && (
                      <a 
                        href={`https://t.me/${participant.telegram_username.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        @{participant.telegram_username.replace('@', '')}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-accent/20 text-accent-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="font-semibold">{participant.votes_count || 0}</span>
                  </div>
                  
                  {voterId && !votedFor.has(participant.id) && votedFor.size < votesPerUser && (
                    <Button
                      onClick={() => handleVote(participant)}
                      disabled={castVote.isPending}
                      size="sm"
                      className="small-caps"
                    >
                      ⚡ ᴠᴏᴛᴇ
                    </Button>
                  )}
                </div>
              </div>
            </GiveawayCard>
          ))}
        </div>
      )}
    </div>
  );
};
