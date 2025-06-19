import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Phone } from "lucide-react";

export default function StickyCTA() {
  return (
    <div className="mobile-sticky md:hidden">
      <div className="flex gap-2 p-4">
        <Link href="/reserve-slot" className="flex-1">
          <Button className="cyber-button-hover w-full py-3 font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10">
            <Rocket className="w-4 h-4 mr-2" />
            RESERVE SLOT
          </Button>
        </Link>
        <Link href="/contact" className="flex-1">
          <Button className="cyber-button-hover w-full py-3 font-cyber font-semibold bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10">
            <Phone className="w-4 h-4 mr-2" />
            CONTACT
          </Button>
        </Link>
      </div>
    </div>
  );
}
