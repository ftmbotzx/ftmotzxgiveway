import { useState } from "react";
import { 
  MessageCircle, Trophy, CheckCircle, UserPlus, Vote, 
  Gift, Calendar, Bell, Plus, X, ChevronDown, ChevronUp 
} from "lucide-react";
import { GiveawayCard } from "./GiveawayCard";
import { IconBadge } from "./IconBadge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { toast } from "sonner";

interface Reward {
  id: number;
  value: string;
}

interface WinnerRewards {
  position: number;
  rewards: Reward[];
  isOpen: boolean;
}

export const CreateGiveaway = () => {
  const [chatLink, setChatLink] = useState("https://t.me/+OMyq0kSbPbBhM2Nl");
  const [totalWinners, setTotalWinners] = useState(3);
  const [minVotes, setMinVotes] = useState(1);
  
  const [participation, setParticipation] = useState({
    chatMember: true,
    premiumUser: false,
    chatBooster: false,
  });
  
  const [voting, setVoting] = useState({
    chatMember: true,
    premiumUser: false,
  });

  const [winnerRewards, setWinnerRewards] = useState<WinnerRewards[]>([
    { position: 1, rewards: [{ id: 1, value: "ꜰʀᴇᴇ 1 ᴍᴏɴᴛʜ ɪɴꜰɪɴɪᴛʏ ᴘʟᴀɴ" }], isOpen: true },
    { position: 2, rewards: [{ id: 1, value: "ꜰʀᴇᴇ 1 ᴍᴏɴᴛʜ ɪɴꜰɪɴɪᴛʏ ᴘʟᴀɴ" }], isOpen: true },
    { position: 3, rewards: [{ id: 1, value: "ꜰʀᴇᴇ 1 ᴍᴏɴᴛʜ ɪɴꜰɪɴɪᴛʏ ᴘʟᴀɴ" }], isOpen: true },
  ]);

  const [startDate, setStartDate] = useState("2025-12-12T20:38");
  const [endDate, setEndDate] = useState("2025-12-13T20:38");

  const toggleRewardsOpen = (position: number) => {
    setWinnerRewards(prev => 
      prev.map(wr => 
        wr.position === position ? { ...wr, isOpen: !wr.isOpen } : wr
      )
    );
  };

  const addReward = (position: number) => {
    setWinnerRewards(prev => 
      prev.map(wr => {
        if (wr.position === position && wr.rewards.length < 10) {
          const newId = Math.max(...wr.rewards.map(r => r.id)) + 1;
          return { ...wr, rewards: [...wr.rewards, { id: newId, value: "" }] };
        }
        return wr;
      })
    );
  };

  const removeReward = (position: number, rewardId: number) => {
    setWinnerRewards(prev => 
      prev.map(wr => {
        if (wr.position === position) {
          return { ...wr, rewards: wr.rewards.filter(r => r.id !== rewardId) };
        }
        return wr;
      })
    );
  };

  const updateReward = (position: number, rewardId: number, value: string) => {
    setWinnerRewards(prev => 
      prev.map(wr => {
        if (wr.position === position) {
          return {
            ...wr,
            rewards: wr.rewards.map(r => r.id === rewardId ? { ...r, value } : r)
          };
        }
        return wr;
      })
    );
  };

  const handleStartGiveaway = () => {
    toast.success("🎉 ɢɪᴠᴇᴀᴡᴀʏ ꜱᴛᴀʀᴛᴇᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ!");
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Hero */}
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-foreground/10 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Gift size={40} className="text-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground small-caps">
          ᴄʀᴇᴀᴛᴇ ɢɪᴠᴇᴀᴡᴀʏ 🎁
        </h2>
        <p className="text-muted-foreground small-caps mt-1">
          ɢʀᴏᴡ ʏᴏᴜʀ ᴄᴏᴍᴍᴜɴɪᴛʏ ᴀɴᴅ ᴇɴɢᴀɢᴇ ᴜꜱᴇʀꜱ
        </p>
      </div>

      {/* Chats */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={MessageCircle} color="purple" />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground small-caps">ᴄʜᴀᴛꜱ 💬</h3>
            <span className="text-sm text-muted-foreground">1 ᴄʜᴀᴛ</span>
          </div>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <MessageCircle size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium small-caps">ᴀ</p>
            <p className="text-xs text-muted-foreground truncate">{chatLink}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ᴛᴇʟᴇɢʀᴀᴍ ɢʀᴏᴜᴘꜱ ᴏʀ ᴄʜᴀɴɴᴇʟꜱ ʀᴇQᴜɪʀᴇᴅ ᴛᴏ ᴊᴏɪɴ
        </p>
      </GiveawayCard>

      {/* Total Winners */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Trophy} color="orange" />
          <h3 className="font-semibold text-foreground small-caps">ᴛᴏᴛᴀʟ ᴡɪɴɴᴇʀꜱ 🏆</h3>
        </div>
        <Input
          type="number"
          value={totalWinners}
          onChange={(e) => setTotalWinners(Number(e.target.value))}
          className="bg-secondary/50 border-0"
          min={1}
          max={100}
        />
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ᴄʜᴏᴏꜱᴇ ʜᴏᴡ ᴍᴀɴʏ ᴜꜱᴇʀꜱ ᴡɪʟʟ ᴡɪɴ
        </p>
      </GiveawayCard>

      {/* Minimum Votes */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={CheckCircle} color="green" />
          <h3 className="font-semibold text-foreground small-caps">ᴍɪɴɪᴍᴜᴍ ᴠᴏᴛᴇꜱ ✅</h3>
        </div>
        <Input
          type="number"
          value={minVotes}
          onChange={(e) => setMinVotes(Number(e.target.value))}
          className="bg-secondary/50 border-0"
          min={1}
        />
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ᴍɪɴɪᴍᴜᴍ ᴠᴏᴛᴇꜱ ɴᴇᴇᴅᴇᴅ ᴛᴏ ʙᴇ ᴇʟɪɢɪʙʟᴇ
        </p>
      </GiveawayCard>

      {/* Participation Requirements */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={UserPlus} color="purple" />
          <h3 className="font-semibold text-foreground small-caps">ᴘᴀʀᴛɪᴄɪᴘᴀᴛɪᴏɴ ʀᴇQᴜɪʀᴇᴍᴇɴᴛꜱ 👥</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "chatMember", label: "ᴄʜᴀᴛ ᴍᴇᴍʙᴇʀ" },
            { key: "premiumUser", label: "ᴘʀᴇᴍɪᴜᴍ ᴜꜱᴇʀ" },
            { key: "chatBooster", label: "ᴄʜᴀᴛ ʙᴏᴏꜱᴛᴇʀ" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
              <span className="text-foreground small-caps">{item.label}</span>
              <Switch
                checked={participation[item.key as keyof typeof participation]}
                onCheckedChange={(checked) => 
                  setParticipation(prev => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ᴄʜᴏᴏꜱᴇ ᴡʜᴀᴛ ᴜꜱᴇʀꜱ ᴍᴜꜱᴛ ᴍᴇᴇᴛ ᴛᴏ ᴊᴏɪɴ
        </p>
      </GiveawayCard>

      {/* Voting Requirements */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Vote} color="pink" />
          <h3 className="font-semibold text-foreground small-caps">ᴠᴏᴛɪɴɢ ʀᴇQᴜɪʀᴇᴍᴇɴᴛꜱ 🗳️</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "chatMember", label: "ᴄʜᴀᴛ ᴍᴇᴍʙᴇʀ" },
            { key: "premiumUser", label: "ᴘʀᴇᴍɪᴜᴍ ᴜꜱᴇʀ" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between bg-secondary/50 rounded-lg p-3">
              <span className="text-foreground small-caps">{item.label}</span>
              <Switch
                checked={voting[item.key as keyof typeof voting]}
                onCheckedChange={(checked) => 
                  setVoting(prev => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ᴅᴇꜰɪɴᴇ ᴄᴏɴᴅɪᴛɪᴏɴꜱ ᴛᴏ ᴄᴀꜱᴛ ᴀ ᴠᴏᴛᴇ
        </p>
      </GiveawayCard>

      {/* Rewards */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Gift} color="green" />
          <h3 className="font-semibold text-foreground small-caps">ʀᴇᴡᴀʀᴅꜱ 🎁</h3>
        </div>
        <div className="space-y-4">
          {winnerRewards.map((wr) => (
            <div key={wr.position} className="bg-secondary/30 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleRewardsOpen(wr.position)}
                className="w-full flex items-center justify-between p-3 hover:bg-secondary/50 transition-colors"
              >
                <span className="text-foreground small-caps">
                  ʀᴇᴡᴀʀᴅꜱ ꜰᴏʀ ᴡɪɴɴᴇʀ #{wr.position}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {wr.rewards.length}/10
                  </span>
                  {wr.isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>
              {wr.isOpen && (
                <div className="px-3 pb-3 space-y-2">
                  {wr.rewards.map((reward, idx) => (
                    <div key={reward.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full badge-cyan flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      <Input
                        value={reward.value}
                        onChange={(e) => updateReward(wr.position, reward.id, e.target.value)}
                        placeholder="ʀᴇᴡᴀʀᴅ ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ"
                        className="bg-secondary/50 border-0 flex-1 small-caps"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeReward(wr.position, reward.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/20"
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  ))}
                  {wr.rewards.length < 10 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addReward(wr.position)}
                      className="w-full text-primary hover:bg-primary/20"
                    >
                      <Plus size={16} className="mr-1" />
                      <span className="small-caps">ᴀᴅᴅ ʀᴇᴡᴀʀᴅ</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ʟɪꜱᴛ ᴛʜᴇ ʀᴇᴡᴀʀᴅꜱ ꜰᴏʀ ᴇᴀᴄʜ ᴡɪɴɴɪɴɢ ᴘᴏꜱɪᴛɪᴏɴ
        </p>
      </GiveawayCard>

      {/* Start Date */}
      <GiveawayCard highlight="green">
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Calendar} color="blue" />
          <h3 className="font-semibold text-foreground small-caps">ꜱᴛᴀʀᴛ ᴅᴀᴛᴇ 📅</h3>
        </div>
        <Input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-secondary/50 border-0"
        />
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ꜱᴛᴀʀᴛ ᴅᴀᴛᴇ ᴀɴᴅ ᴛɪᴍᴇ
        </p>
      </GiveawayCard>

      {/* End Date */}
      <GiveawayCard highlight="red">
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Calendar} color="red" />
          <h3 className="font-semibold text-foreground small-caps">ᴇɴᴅ ᴅᴀᴛᴇ 📅</h3>
        </div>
        <Input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-secondary/50 border-0"
        />
        <p className="text-xs text-muted-foreground mt-3 small-caps">
          ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ᴇɴᴅ ᴅᴀᴛᴇ ᴀɴᴅ ᴛɪᴍᴇ
        </p>
      </GiveawayCard>

      {/* Start Giveaway Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleStartGiveaway}
            className="w-full h-14 gradient-primary text-foreground font-bold text-lg border-0 glow-purple"
          >
            <Bell size={22} className="mr-2" />
            <span className="small-caps">ꜱᴛᴀʀᴛ ɢɪᴠᴇᴀᴡᴀʏ 🚀</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
