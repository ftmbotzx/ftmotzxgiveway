import { Gift, Users, Trophy, Clock, Eye } from "lucide-react";
import { GiveawayCard } from "@/components/GiveawayCard";
import { IconBadge } from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { useGiveaways, Giveaway } from "@/hooks/useGiveaways";
import { formatDistanceToNow } from "date-fns";

interface GiveawayListProps {
  onSelectGiveaway: (giveaway: Giveaway) => void;
}

export const GiveawayList = ({ onSelectGiveaway }: GiveawayListProps) => {
  const { data: giveaways, isLoading } = useGiveaways();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground small-caps">⏳ ʟᴏᴀᴅɪɴɢ ɢɪᴠᴇᴀᴡᴀʏꜱ...</p>
      </div>
    );
  }

  if (!giveaways?.length) {
    return (
      <GiveawayCard className="text-center py-12">
        <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground small-caps mb-2">
          ɴᴏ ɢɪᴠᴇᴀᴡᴀʏꜱ ʏᴇᴛ
        </h3>
        <p className="text-muted-foreground small-caps">
          ᴄʀᴇᴀᴛᴇ ʏᴏᴜʀ ꜰɪʀꜱᴛ ɢɪᴠᴇᴀᴡᴀʏ ᴛᴏ ɢᴇᴛ ꜱᴛᴀʀᴛᴇᴅ!
        </p>
      </GiveawayCard>
    );
  }

  return (
    <div className="space-y-4">
      {giveaways.map((giveaway) => {
        const isActive = giveaway.status === 'active' && new Date(giveaway.end_time) > new Date();
        const timeLeft = formatDistanceToNow(new Date(giveaway.end_time), { addSuffix: true });

        return (
          <GiveawayCard key={giveaway.id} highlight={isActive ? "green" : undefined}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <IconBadge icon={Gift} color={isActive ? "green" : "purple"} />
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{giveaway.title}</h3>
                  {giveaway.description && (
                    <p className="text-muted-foreground text-sm mt-1">{giveaway.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      <span className="small-caps">{giveaway.winners_count} ᴡɪɴɴᴇʀꜱ</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="small-caps">{giveaway.votes_per_user} ᴠᴏᴛᴇꜱ/ᴜꜱᴇʀ</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="small-caps">{isActive ? `ᴇɴᴅꜱ ${timeLeft}` : `ᴇɴᴅᴇᴅ ${timeLeft}`}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <span className={`px-2 py-1 rounded text-xs small-caps ${
                      isActive ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'
                    }`}>
                      {isActive ? '🟢 ᴀᴄᴛɪᴠᴇ' : '⚫ ᴇɴᴅᴇᴅ'}
                    </span>
                    {giveaway.require_subscription && (
                      <span className="px-2 py-1 rounded text-xs small-caps bg-blue-500/20 text-blue-400">
                        📢 ꜱᴜʙ ʀᴇQᴜɪʀᴇᴅ
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => onSelectGiveaway(giveaway)}
                variant="secondary"
                size="sm"
                className="small-caps"
              >
                <Eye className="w-4 h-4 mr-1" />
                ᴠɪᴇᴡ
              </Button>
            </div>
          </GiveawayCard>
        );
      })}
    </div>
  );
};
