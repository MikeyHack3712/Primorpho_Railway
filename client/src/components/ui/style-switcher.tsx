import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StyleSwitcher() {
  const currentStyle = new URLSearchParams(window.location.search).get('style') || 'cyberpunk';

  const switchStyle = (style: string) => {
    const url = new URL(window.location.href);
    if (style === 'cyberpunk') {
      url.searchParams.delete('style');
    } else {
      url.searchParams.set('style', style);
    }
    window.location.href = url.toString();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {currentStyle === 'conservative' ? 'Business' : 'Tech'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => switchStyle('cyberpunk')}
          className={currentStyle === 'cyberpunk' ? 'bg-accent' : ''}
        >
          Tech Style (Current)
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchStyle('conservative')}
          className={currentStyle === 'conservative' ? 'bg-accent' : ''}
        >
          Business Style
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}