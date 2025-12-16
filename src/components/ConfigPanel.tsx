import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GiveawayCard } from "@/components/GiveawayCard";
import { IconBadge } from "@/components/IconBadge";
import { Settings, Save, Plus, Trash2, Bot, Key, Users } from "lucide-react";
import { useConfig, useUpdateConfig } from "@/hooks/useConfig";
import { useToast } from "@/hooks/use-toast";

export const ConfigPanel = () => {
  const { data: config, isLoading } = useConfig();
  const updateConfig = useUpdateConfig();
  const { toast } = useToast();

  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [botUsername, setBotUsername] = useState("");
  const [telegramAdminId, setTelegramAdminId] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [newChannel, setNewChannel] = useState("");

  useEffect(() => {
    if (config) {
      setAdminUsername(config.admin_username);
      setAdminPassword(config.admin_password);
      setBotUsername(config.telegram_bot_username || "");
      setTelegramAdminId(config.telegram_admin_id || "");
      setChannels(config.required_channels || []);
    }
  }, [config]);

  const handleAddChannel = () => {
    if (newChannel.trim() && !channels.includes(newChannel.trim())) {
      setChannels([...channels, newChannel.trim()]);
      setNewChannel("");
    }
  };

  const handleRemoveChannel = (index: number) => {
    setChannels(channels.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await updateConfig.mutateAsync({
        admin_username: adminUsername,
        admin_password: adminPassword,
        telegram_bot_username: botUsername || null,
        telegram_admin_id: telegramAdminId || null,
        required_channels: channels
      });
      
      toast({
        title: "✅ ꜱᴀᴠᴇᴅ",
        description: "ᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ ᴜᴘᴅᴀᴛᴇᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ!"
      });
    } catch (error) {
      toast({
        title: "❌ ᴇʀʀᴏʀ",
        description: "ꜰᴀɪʟᴇᴅ ᴛᴏ ꜱᴀᴠᴇ ᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground small-caps">⏳ ʟᴏᴀᴅɪɴɢ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin Credentials */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Key} color="pink" />
          <h2 className="font-semibold text-foreground small-caps">🔐 ᴀᴅᴍɪɴ ᴄʀᴇᴅᴇɴᴛɪᴀʟꜱ</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="small-caps text-muted-foreground">👤 ᴜꜱᴇʀɴᴀᴍᴇ</Label>
            <Input
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              placeholder="ᴀᴅᴍɪɴ ᴜꜱᴇʀɴᴀᴍᴇ"
              className="bg-background/50 border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="small-caps text-muted-foreground">🔑 ᴘᴀꜱꜱᴡᴏʀᴅ</Label>
            <Input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="ᴀᴅᴍɪɴ ᴘᴀꜱꜱᴡᴏʀᴅ"
              className="bg-background/50 border-border"
            />
          </div>
        </div>
      </GiveawayCard>

      {/* Telegram Bot Settings */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Bot} color="blue" />
          <h2 className="font-semibold text-foreground small-caps">🤖 ᴛᴇʟᴇɢʀᴀᴍ ʙᴏᴛ ꜱᴇᴛᴛɪɴɢꜱ</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="small-caps text-muted-foreground">🤖 ʙᴏᴛ ᴜꜱᴇʀɴᴀᴍᴇ</Label>
            <Input
              value={botUsername}
              onChange={(e) => setBotUsername(e.target.value)}
              placeholder="ᴇ.ɢ. ꜰᴛᴍʙᴏᴛᴢx_ʙᴏᴛ"
              className="bg-background/50 border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="small-caps text-muted-foreground">🆔 ᴛᴇʟᴇɢʀᴀᴍ ᴀᴅᴍɪɴ ɪᴅ</Label>
            <Input
              value={telegramAdminId}
              onChange={(e) => setTelegramAdminId(e.target.value)}
              placeholder="ʏᴏᴜʀ ᴛᴇʟᴇɢʀᴀᴍ ᴜꜱᴇʀ ɪᴅ"
              className="bg-background/50 border-border"
            />
          </div>
        </div>
      </GiveawayCard>

      {/* Required Channels */}
      <GiveawayCard>
        <div className="flex items-center gap-3 mb-4">
          <IconBadge icon={Users} color="green" />
          <h2 className="font-semibold text-foreground small-caps">📢 ʀᴇQᴜɪʀᴇᴅ ᴄʜᴀɴɴᴇʟꜱ</h2>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 small-caps">
          ᴜꜱᴇʀꜱ ᴍᴜꜱᴛ ʙᴇ ꜱᴜʙꜱᴄʀɪʙᴇᴅ ᴛᴏ ᴛʜᴇꜱᴇ ᴄʜᴀɴɴᴇʟꜱ ᴛᴏ ᴘᴀʀᴛɪᴄɪᴘᴀᴛᴇ
        </p>

        <div className="flex gap-2 mb-4">
          <Input
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
            placeholder="ᴇ.ɢ. @ꜰᴛᴍʙᴏᴛᴢx ᴏʀ -100123456789"
            className="bg-background/50 border-border flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAddChannel()}
          />
          <Button onClick={handleAddChannel} variant="secondary" size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {channels.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4 small-caps">
              ɴᴏ ᴄʜᴀɴɴᴇʟꜱ ᴀᴅᴅᴇᴅ ʏᴇᴛ
            </p>
          ) : (
            channels.map((channel, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-background/50 rounded-lg p-3 border border-border"
              >
                <span className="text-foreground">{channel}</span>
                <Button
                  onClick={() => handleRemoveChannel(index)}
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </GiveawayCard>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={updateConfig.isPending}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground small-caps"
      >
        <Save className="w-4 h-4 mr-2" />
        {updateConfig.isPending ? "⏳ ꜱᴀᴠɪɴɢ..." : "💾 ꜱᴀᴠᴇ ᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ"}
      </Button>
    </div>
  );
};
