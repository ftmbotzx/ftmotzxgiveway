import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiveawayCard } from "@/components/GiveawayCard";
import { IconBadge } from "@/components/IconBadge";
import { Lock, User } from "lucide-react";
import { loginAdmin } from "@/lib/adminAuth";
import { useConfig } from "@/hooks/useConfig";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: config } = useConfig();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config) {
      toast({
        title: "⚠️ ᴇʀʀᴏʀ",
        description: "ᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ ɴᴏᴛ ʟᴏᴀᴅᴇᴅ",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    const success = loginAdmin(username, password, config);
    
    if (success) {
      toast({
        title: "✅ ꜱᴜᴄᴄᴇꜱꜱ",
        description: "ʟᴏɢɢᴇᴅ ɪɴ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ!"
      });
      onLogin();
    } else {
      toast({
        title: "❌ ᴇʀʀᴏʀ",
        description: "ɪɴᴠᴀʟɪᴅ ᴄʀᴇᴅᴇɴᴛɪᴀʟꜱ",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <GiveawayCard className="w-full max-w-md">
        <div className="text-center mb-6">
          <IconBadge icon={Lock} color="purple" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground small-caps">
            🔐 ᴀᴅᴍɪɴ ʟᴏɢɪɴ
          </h1>
          <p className="text-muted-foreground text-sm small-caps mt-2">
            ᴇɴᴛᴇʀ ʏᴏᴜʀ ᴄʀᴇᴅᴇɴᴛɪᴀʟꜱ ᴛᴏ ᴀᴄᴄᴇꜱꜱ ᴛʜᴇ ᴘᴀɴᴇʟ
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="small-caps text-foreground">
              👤 ᴜꜱᴇʀɴᴀᴍᴇ
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ᴇɴᴛᴇʀ ᴜꜱᴇʀɴᴀᴍᴇ"
                className="pl-10 bg-background/50 border-border"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="small-caps text-foreground">
              🔑 ᴘᴀꜱꜱᴡᴏʀᴅ
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ᴇɴᴛᴇʀ ᴘᴀꜱꜱᴡᴏʀᴅ"
                className="pl-10 bg-background/50 border-border"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground small-caps"
          >
            {loading ? "⏳ ʟᴏɢɢɪɴɢ ɪɴ..." : "🚀 ʟᴏɢɪɴ"}
          </Button>
        </form>
      </GiveawayCard>
    </div>
  );
};
