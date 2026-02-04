import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCompareButton = () => {
  return (
    <Link to="/compare">
      <Button
        className="fixed bottom-6 right-6 z-50 h-14 px-6 rounded-full gold-gradient text-foreground hover:opacity-90 transition-all shadow-gold animate-scale-in"
        size="lg"
      >
        <Home className="w-5 h-5 mr-2" />
        Compare Homes
      </Button>
    </Link>
  );
};

export default FloatingCompareButton;
