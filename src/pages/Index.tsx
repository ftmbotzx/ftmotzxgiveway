import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CreateGiveaway } from "@/components/CreateGiveaway";
import { GiveawayDetails } from "@/components/GiveawayDetails";

const Index = () => {
  const [activeView, setActiveView] = useState<"create" | "details">("create");

  return (
    <div className="min-h-screen bg-background">
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="max-w-2xl mx-auto px-4 py-4">
        {activeView === "create" ? <CreateGiveaway /> : <GiveawayDetails />}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
