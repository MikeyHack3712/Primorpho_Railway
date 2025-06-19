import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import StickyCTA from "@/components/ui/sticky-cta";

import LiveChatWidget from "@/components/ui/live-chat-widget";

import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import ReserveSlot from "@/pages/reserve-slot";
import BookConsultation from "@/pages/book-consultation";
import Tools from "@/pages/tools";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/reserve-slot" component={ReserveSlot} />
          <Route path="/book-consultation" component={BookConsultation} />
          <Route path="/tools" component={Tools} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <StickyCTA />
      <LiveChatWidget />

    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
