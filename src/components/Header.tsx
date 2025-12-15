import { Gift, Plus, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  activeView: "create" | "details";
  onViewChange: (view: "create" | "details") => void;
}

export const Header = ({ activeView, onViewChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Gift size={22} className="text-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground small-caps">
                ꜰᴛᴍʙᴏᴛᴢx ⚡
              </h1>
              <p className="text-xs text-muted-foreground small-caps">
                ɢɪᴠᴇᴀᴡᴀʏ ᴘᴀɴᴇʟ
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={activeView === "create" ? "default" : "secondary"}
            size="sm"
            onClick={() => onViewChange("create")}
            className={activeView === "create" ? "gradient-primary border-0" : ""}
          >
            <Plus size={16} className="mr-1" />
            <span className="small-caps">ᴄʀᴇᴀᴛᴇ</span>
          </Button>
          <Button
            variant={activeView === "details" ? "default" : "secondary"}
            size="sm"
            onClick={() => onViewChange("details")}
            className={activeView === "details" ? "gradient-primary border-0" : ""}
          >
            <Eye size={16} className="mr-1" />
            <span className="small-caps">ᴅᴇᴛᴀɪʟꜱ</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
