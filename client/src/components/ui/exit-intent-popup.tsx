import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const { toast } = useToast();

  const auditMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/audit", { websiteUrl: url });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Audit Initiated!",
        description: "Your free website audit is processing. We'll send results to your email shortly.",
        className: "glass-card border-primary/30 text-white",
      });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Audit Failed",
        description: error.message || "Failed to start audit. Please try again.",
        variant: "destructive",
        className: "glass-card border-red-500/30 text-white",
      });
    },
  });

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (!hasShown && e.clientY <= 0) {
        setHasShown(true);
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteUrl) {
      auditMutation.mutate(websiteUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-card border-primary/30 max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-cyber text-yellow-400">
              WAIT! FREE AUDIT?
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-primary"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="white-highlight text-center">
            Get a free quantum analysis of your website before you leave. 
            Discover optimization opportunities worth thousands.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="website" className="text-sm font-cyber white-highlight">
                WEBSITE URL
              </Label>
              <Input
                id="website"
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://your-website.com"
                className="bg-transparent border-primary/30 text-white"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={auditMutation.isPending}
              className="cyber-button-hover w-full py-3 font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10"
            >
              {auditMutation.isPending ? "SCANNING..." : "GET FREE AUDIT"}
            </Button>
          </form>
          
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="w-full text-sm white-highlight hover:text-primary"
          >
            No thanks, I'll pass on optimization
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
