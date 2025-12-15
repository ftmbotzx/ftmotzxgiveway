import { MessageCircle, Users, Zap, Shield } from "lucide-react";

const links = [
  {
    emoji: "📢",
    label: "ᴍᴀɪɴ ᴄʜᴀɴɴᴇʟ",
    name: "ꜰᴛᴍʙᴏᴛᴢx",
    url: "https://t.me/ftmbotzx",
    icon: MessageCircle,
  },
  {
    emoji: "💬",
    label: "ꜱᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ",
    name: "ꜰᴛᴍʙᴏᴛᴢx ꜱᴜᴘᴘᴏʀᴛ",
    url: "https://t.me/ftmbotzx_support",
    icon: Users,
  },
  {
    emoji: "👨‍💻",
    label: "ᴀꜱꜱɪꜱᴛᴀɴᴛ ᴅᴇᴠ",
    name: "ᴀꜱᴛʀᴀᴅᴇᴠ",
    url: "https://t.me/astradev",
    icon: Shield,
  },
  {
    emoji: "⚡",
    label: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ",
    name: "ꜰᴛᴍ ᴅᴇᴠᴇʟᴏᴘᴇʀᴢ",
    url: "https://t.me/ftmdeveloperz",
    icon: Zap,
  },
  {
    emoji: "🛡️",
    label: "ᴍᴏᴅᴇʀᴀᴛᴏʀ",
    name: "ᴛᴏɴʏ ᴍᴀʀᴋ",
    url: "https://t.me/mark2tony",
    icon: Shield,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border mt-8 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-foreground small-caps">
            ꜰᴛᴍʙᴏᴛᴢx ⚡
          </h3>
          <p className="text-sm text-muted-foreground small-caps">
            ᴄʀᴇᴀᴛᴇᴅ & ʜᴏꜱᴛᴇᴅ ʙʏ ꜰᴛᴍ ᴅᴇᴠᴇʟᴏᴘᴇʀᴢ
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <span className="text-lg">{link.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground small-caps truncate">
                  {link.label}
                </p>
                <p className="text-sm font-medium text-foreground small-caps truncate group-hover:text-primary transition-colors">
                  {link.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
