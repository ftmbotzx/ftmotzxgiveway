import { useState, useEffect } from "react";
import { 
  Star, Trophy, Users, Info, Award, Megaphone, Gift, 
  CheckSquare, UserPlus, BarChart3, Calendar, Clock, Share2
} from "lucide-react";
import { GiveawayCard } from "./GiveawayCard";
import { IconBadge } from "./IconBadge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const GiveawayDetails = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 21, minutes: 57, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleParticipate = () => {
    toast.success("🎉 ʏᴏᴜ'ᴠᴇ ᴊᴏɪɴᴇᴅ ᴛʜᴇ ɢɪᴠᴇᴀᴡᴀʏ!");
  };

  const handleShare = () => {
    toast.success("📤 ʟɪɴᴋ ᴄᴏᴘɪᴇᴅ ᴛᴏ ᴄʟɪᴘʙᴏᴀʀᴅ!");
  };

  const rewards = [
    { place: "1ꜱᴛ", icon: Trophy, color: "orange" as const, reward: "ꜰʀᴇᴇ 1 ᴍᴏɴᴛʜ ɪɴꜰɪɴɪᴛʏ ᴘʟᴀɴ ᴏꜰ ᴀɴʏ 1 ʙᴏᴛ" },
    { place: "2ɴᴅ", icon: Award, color: "blue" as const, reward: "ꜰʀᴇᴇ 1 ᴍᴏɴᴛʜ ɪɴꜰɪɴɪᴛʏ ᴘʟᴀɴ ᴏꜰ ᴀɴʏ 1 ʙᴏᴛ" },
    { place: "3ʀᴅ", icon: Trophy, color: "orange" as const, reward: "ꜰʀᴇᴇ 1 ᴍᴏɴᴛʜ ɪɴꜰɪɴɪᴛʏ ᴘʟᴀɴ ᴏꜰ ᴀɴʏ 1 ʙᴏᴛ" },
  ];

  const leaderboard = [
    { rank: 1, name: "ꜰᴛᴍ ᴅᴇᴠᴇʟᴏᴘᴇʀᴢ", username: "@ftmdeveloperz", votes: 1, eligible: true },
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* Hero */}
      <div className="text-center py-6 bg-gradient-to-b from-card to-background rounded-b-3xl">
        <div className="w-20 h-20 bg-foreground/10 rounded-full mx-auto mb-4 flex items-center justify-center animate-float">
          <Star size={40} className="text-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground small-caps">
          ɢɪᴠᴇᴀᴡᴀʏ ᴅᴇᴛᴀɪʟꜱ ⭐
        </h2>
        <p className="text-muted-foreground small-caps mt-1">
          ᴊᴏɪɴ ᴛʜɪꜱ ɢɪᴠᴇᴀᴡᴀʏ ᴀɴᴅ ᴇᴀʀɴ ᴇxᴄɪᴛɪɴɢ ʀᴇᴡᴀʀᴅꜱ
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <GiveawayCard className="text-center">
          <IconBadge icon={Trophy} color="orange" className="mx-auto mb-2" />
          <p className="text-3xl font-bold text-badge-orange">3</p>
          <p className="text-sm text-muted-foreground small-caps">ᴛᴏᴛᴀʟ ᴡɪɴɴᴇʀꜱ</p>
        </GiveawayCard>
        <GiveawayCard className="text-center">
          <IconBadge icon={Users} color="purple" className="mx-auto mb-2" />
          <p className="text-3xl font-bold text-badge-purple">1</p>
          <p className="text-sm text-muted-foreground small-caps">ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛꜱ</p>
        </GiveawayCard>
      </div>

      {/* Tabs */}
      <GiveawayCard>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 bg-secondary/50">
            <TabsTrigger value="details" className="data-[state=active]:gradient-primary data-[state=active]:text-foreground small-caps">
              <Info size={16} className="mr-1" />
              ᴅᴇᴛᴀɪʟꜱ
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:gradient-primary data-[state=active]:text-foreground small-caps">
              <Trophy size={16} className="mr-1" />
              ʟᴇᴀᴅᴇʀꜱ
            </TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:gradient-primary data-[state=active]:text-foreground small-caps">
              <Megaphone size={16} className="mr-1" />
              ɴᴇᴡꜱ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4 space-y-4">
            {/* Rewards */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <IconBadge icon={Gift} color="green" size="sm" />
                <h4 className="font-semibold small-caps">ʀᴇᴡᴀʀᴅꜱ 🎁</h4>
              </div>
              <div className="space-y-2">
                {rewards.map((r, idx) => (
                  <div key={idx} className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <IconBadge icon={r.icon} color={r.color} size="sm" />
                      <div>
                        <p className="font-semibold small-caps">{r.place} ᴘʟᴀᴄᴇ</p>
                        <p className="text-xs text-muted-foreground small-caps">ᴡɪɴɴᴇʀ</p>
                      </div>
                    </div>
                    <div className="mt-2 bg-secondary/50 rounded p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full badge-orange flex items-center justify-center text-xs font-bold">1</div>
                        <span className="text-sm small-caps">{r.reward}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <IconBadge icon={Trophy} color="orange" size="sm" />
              <h4 className="font-semibold small-caps">ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ 🏆</h4>
              <span className="ml-auto text-xs bg-muted px-2 py-1 rounded">31</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 small-caps">
              ℹ️ 1 ᴘᴀʀᴛɪᴄɪᴘᴀɴᴛ ɪꜱ ᴇʟɪɢɪʙʟᴇ ꜰᴏʀ ꜱᴇʟᴇᴄᴛɪᴏɴ ᴀꜱ ᴡɪɴɴᴇʀ
            </p>
            {leaderboard.map((user) => (
              <div key={user.rank} className="bg-secondary/50 rounded-lg p-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full badge-orange flex items-center justify-center font-bold">
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border-2 border-badge-purple">
                    <span className="text-xs font-bold">ꜰᴛᴍ</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold small-caps">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-badge-blue">{user.votes}</p>
                    <p className="text-xs text-muted-foreground">ᴠᴏᴛᴇꜱ</p>
                  </div>
                </div>
                {user.eligible && (
                  <div className="mt-3 flex justify-center">
                    <span className="gradient-green text-foreground px-4 py-2 rounded-full text-sm font-bold small-caps">
                      ↑ ᴡɪɴɴᴇʀ ᴇʟɪɢɪʙʟᴇ ↑
                    </span>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="announcements" className="mt-4">
            <div className="text-center py-8">
              <Megaphone size={40} className="mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground small-caps">ɴᴏ ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛꜱ ʏᴇᴛ 📢</p>
            </div>
          </TabsContent>
        </Tabs>
      </GiveawayCard>

      {/* Participation Requirements */}
      <GiveawayCard highlight="green">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <IconBadge icon={CheckSquare} color="green" size="sm" />
            <h4 className="font-semibold small-caps">ᴘᴀʀᴛɪᴄɪᴘᴀᴛɪᴏɴ ʀᴇQᴜɪʀᴇᴍᴇɴᴛꜱ ✅</h4>
          </div>
          <span className="text-xs bg-muted px-2 py-1 rounded">0%</span>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
          <IconBadge icon={UserPlus} color="orange" size="sm" />
          <div className="flex-1">
            <p className="font-medium small-caps">ꜱᴜʙꜱᴄʀɪʙᴇ ᴄʜᴀᴛꜱ</p>
            <p className="text-xs text-muted-foreground small-caps">ᴊᴏɪɴ 2 ᴄʜᴀᴛ(ꜱ)</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            ✕
          </button>
        </div>
      </GiveawayCard>

      {/* Winner Eligibility */}
      <GiveawayCard>
        <div className="flex items-center gap-2 mb-3">
          <IconBadge icon={Trophy} color="orange" size="sm" />
          <h4 className="font-semibold small-caps">ᴡɪɴɴᴇʀ ᴇʟɪɢɪʙɪʟɪᴛʏ 🏆</h4>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
          <IconBadge icon={BarChart3} color="blue" size="sm" />
          <span className="flex-1 small-caps">ᴍɪɴɪᴍᴜᴍ ᴠᴏᴛᴇꜱ ʀᴇQᴜɪʀᴇᴅ</span>
          <div className="text-right">
            <span className="text-badge-blue font-bold">1</span>
            <span className="text-xs text-muted-foreground ml-1">ᴠᴏᴛᴇꜱ</span>
          </div>
        </div>
      </GiveawayCard>

      {/* Start Time */}
      <GiveawayCard highlight="green">
        <div className="flex items-center gap-2">
          <IconBadge icon={Calendar} color="green" size="sm" />
          <div>
            <p className="text-sm text-badge-green small-caps">ꜱᴛᴀʀᴛ ᴛɪᴍᴇ</p>
            <p className="font-semibold small-caps">ᴅᴇᴄ 12, 2025 • 6:36 ᴘᴍ</p>
          </div>
        </div>
      </GiveawayCard>

      {/* End Time */}
      <GiveawayCard highlight="red">
        <div className="flex items-center gap-2">
          <IconBadge icon={Calendar} color="red" size="sm" />
          <div>
            <p className="text-sm text-badge-red small-caps">ᴇɴᴅ ᴛɪᴍᴇ</p>
            <p className="font-semibold small-caps">ᴅᴇᴄ 13, 2025 • 6:36 ᴘᴍ</p>
          </div>
        </div>
      </GiveawayCard>

      {/* Time Remaining */}
      <GiveawayCard>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <IconBadge icon={Clock} color="pink" size="sm" />
            <h4 className="font-semibold small-caps">ᴛɪᴍᴇ ʀᴇᴍᴀɪɴɪɴɢ ⏰</h4>
          </div>
          <span className="text-xs bg-muted px-2 py-1 rounded">9%</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { value: timeLeft.days.toString().padStart(2, "0"), label: "ᴅ", color: "text-badge-red" },
            { value: timeLeft.hours.toString().padStart(2, "0"), label: "ʜ", color: "text-badge-yellow" },
            { value: timeLeft.minutes.toString().padStart(2, "0"), label: "ᴍ", color: "text-badge-green" },
            { value: timeLeft.seconds.toString().padStart(2, "0"), label: "ꜱ", color: "text-badge-pink" },
          ].map((t, i) => (
            <div key={i} className="bg-secondary/50 rounded-lg p-3">
              <p className={`text-2xl font-bold font-mono ${t.color} animate-countdown`}>{t.value}</p>
              <p className="text-xs text-muted-foreground">{t.label}</p>
            </div>
          ))}
        </div>
      </GiveawayCard>

      {/* Giveaway Host */}
      <GiveawayCard>
        <div className="flex items-center gap-2 mb-3">
          <IconBadge icon={Users} color="purple" size="sm" />
          <h4 className="font-semibold small-caps">ɢɪᴠᴇᴀᴡᴀʏ ʜᴏꜱᴛ 👤</h4>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted border-2 border-badge-purple flex items-center justify-center">
            <span className="text-xs font-bold">ꜰᴛᴍ</span>
          </div>
          <div>
            <p className="font-semibold small-caps">ꜰᴛᴍ ᴅᴇᴠᴇʟᴏᴘᴇʀᴢ ⚡</p>
            <p className="text-sm text-muted-foreground">@ftmdeveloperz</p>
          </div>
        </div>
      </GiveawayCard>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button
            onClick={handleParticipate}
            className="flex-1 h-14 gradient-green text-foreground font-bold text-lg border-0"
          >
            <Gift size={22} className="mr-2" />
            <span className="small-caps">ᴘᴀʀᴛɪᴄɪᴘᴀᴛᴇ 🎉</span>
          </Button>
          <Button
            onClick={handleShare}
            variant="secondary"
            className="h-14 px-6"
          >
            <Share2 size={22} />
          </Button>
        </div>
      </div>
    </div>
  );
};
