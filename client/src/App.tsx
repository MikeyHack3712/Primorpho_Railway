import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

// Pages
import Cover from "@/pages/cover";
import Home from "@/pages/home";
import HomeConservative from "@/pages/home-conservative";
import About from "@/pages/about";
import AboutConservative from "@/pages/about-conservative";
import Services from "@/pages/services";
import ServicesConservative from "@/pages/services-conservative";
import Portfolio from "@/pages/portfolio";
import PortfolioConservative from "@/pages/portfolio-conservative";
import Tools from "@/pages/tools";
import ToolsConservative from "@/pages/tools-conservative";
import Contact from "@/pages/contact";
import ContactConservative from "@/pages/contact-conservative";
import MoodBoard from "@/pages/mood-board";
import CustomizePackage from "@/pages/customize-package";
import Blog from "@/pages/blog";
import ReserveSlot from "@/pages/reserve-slot";
import BookConsultation from "@/pages/book-consultation";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  const urlParams = new URLSearchParams(window.location.search);
  const style = urlParams.get('style');
  const isConservative = style === 'conservative';
  
  return (
    <Switch>
      <Route path="/" component={Cover} />
      <Route path="/home" component={isConservative ? HomeConservative : Home} />
      <Route path="/conservative" component={HomeConservative} />
      <Route path="/about" component={isConservative ? AboutConservative : About} />
      <Route path="/services" component={isConservative ? ServicesConservative : Services} />
      <Route path="/portfolio" component={isConservative ? PortfolioConservative : Portfolio} />
      <Route path="/tools" component={isConservative ? ToolsConservative : Tools} />
      <Route path="/contact" component={isConservative ? ContactConservative : Contact} />
      <Route path="/mood-board" component={MoodBoard} />
      <Route path="/customize-package" component={CustomizePackage} />
      <Route path="/blog" component={Blog} />
      <Route path="/reserve-slot" component={ReserveSlot} />
      <Route path="/book-consultation" component={BookConsultation} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isCoverPage = location === '/';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          {!isCoverPage && <Navigation />}
          <main className={isCoverPage ? "" : "flex-1"}>
            <Router />
          </main>
          {!isCoverPage && <Footer />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;