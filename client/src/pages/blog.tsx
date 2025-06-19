import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, User, ArrowRight, Zap, Shield, Cpu } from "lucide-react";

export default function Blog() {
  const articles = [
    {
      title: "Neural Website Optimization: The Quantum Advantage",
      excerpt: "Discover how quantum-enhanced optimization techniques can boost your website performance by 300% while maintaining security protocols.",
      author: "Primorpho Dev Team",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Performance",
      color: "primary",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Security Protocols for Modern Web Applications",
      excerpt: "Implementing military-grade security measures without compromising user experience. A comprehensive guide to cyber defense.",
      author: "Primorpho Dev Team", 
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Security",
      color: "purple-400",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "AI-Driven Development: The Future is Here",
      excerpt: "How artificial intelligence is revolutionizing web development workflows and creating unprecedented user experiences.",
      author: "Primorpho Dev Team",
      date: "December 5, 2024", 
      readTime: "6 min read",
      category: "AI/ML",
      color: "yellow-400",
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      title: "Mobile-First Design in the Quantum Era",
      excerpt: "Adaptive interfaces that respond to user behavior in real-time. Learn the secrets of neural-enhanced mobile optimization.",
      author: "Primorpho Dev Team",
      date: "November 28, 2024",
      readTime: "7 min read", 
      category: "Design",
      color: "primary",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "E-commerce Revolution: Beyond Traditional Platforms",
      excerpt: "Case study: How we achieved 400% revenue growth for EcoMart Online using quantum-enhanced e-commerce solutions.",
      author: "Primorpho Dev Team",
      date: "November 20, 2024",
      readTime: "10 min read",
      category: "Case Study", 
      color: "purple-400",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "The Psychology of Cyberpunk UI Design",
      excerpt: "Understanding how futuristic interfaces influence user behavior and drive conversions in the digital landscape.",
      author: "Primorpho Dev Team",
      date: "November 15, 2024",
      readTime: "4 min read",
      category: "UX/UI",
      color: "yellow-400", 
      icon: <Cpu className="w-5 h-5" />,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 relative grid-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              NEURAL.<span className="text-primary animate-glow-pulse">INSIGHTS</span>
            </h1>
            <p className="text-xl white-highlight max-w-3xl mx-auto font-futura">
              Quantum-enhanced development insights, industry analysis, and technological breakthroughs 
              from the digital frontier.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 rounded-xl scan-line mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                  FEATURED ARTICLE
                </Badge>
                <h2 className="text-3xl md:text-4xl font-cyber font-bold mb-6 white-highlight">
                  The Rise of <span className="text-primary animate-glow-pulse">Quantum Computing</span> in Web Development
                </h2>
                <p className="text-lg white-highlight mb-8 font-futura">
                  Explore how quantum computing principles are being applied to modern web development,
                  creating unprecedented performance gains and opening new possibilities for interactive experiences.
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="white-highlight text-sm">Primorpho Dev Team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span className="white-highlight text-sm">December 20, 2024</span>
                  </div>
                </div>
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10">
                  READ FULL ARTICLE
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="holographic glass-card p-8 rounded-xl">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-purple-400 rounded-lg flex items-center justify-center">
                    <Cpu className="w-12 h-12 text-black" />
                  </div>
                  <h3 className="text-xl font-cyber text-primary mb-4">QUANTUM INSIGHTS</h3>
                  <p className="white-highlight text-sm">
                    Discover how quantum principles are revolutionizing digital experiences
                    and creating new paradigms in web development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-cyber font-bold mb-6 white-highlight">
              LATEST.<span className="text-yellow-400 animate-glow-pulse">ARTICLES</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="glass-card border-primary/30 hover:animate-neural-pulse transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`bg-${article.color}/20 text-${article.color} border-${article.color}/30`}>
                      {article.category}
                    </Badge>
                    <div className={`text-${article.color}`}>
                      {article.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-cyber white-highlight leading-tight">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="white-highlight text-sm mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs white-highlight mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span className="white-highlight">{article.date}</span>
                    </div>
                    <Button size="sm" className={`cyber-button-hover bg-transparent border border-${article.color} text-white hover:bg-${article.color}/10`}>
                      READ MORE
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 rounded-xl scan-line text-center">
            <h2 className="text-3xl md:text-5xl font-cyber font-bold mb-6 white-highlight">
              NEURAL <span className="text-primary animate-glow-pulse">UPDATES</span>
            </h2>
            <p className="text-xl white-highlight mb-8 max-w-2xl mx-auto">
              Subscribe to receive quantum-enhanced insights, development breakthroughs, 
              and industry analysis directly to your neural interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg bg-transparent border border-primary/30 text-white placeholder:text-gray-400"
              />
              <Button className="cyber-button-hover px-8 py-3 rounded-lg font-cyber font-semibold bg-transparent border border-primary text-white hover:bg-primary/10">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 rounded-xl scan-line">
            <h2 className="text-3xl md:text-5xl font-cyber font-bold mb-6 white-highlight">
              NEED EXPERT <span className="text-primary animate-glow-pulse">CONSULTATION</span>?
            </h2>
            <p className="text-xl white-highlight mb-8 max-w-2xl mx-auto">
              Ready to implement these advanced concepts in your project? 
              Schedule a consultation with our development team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-consultation">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-primary text-white hover:bg-primary/10">
                  BOOK CONSULTATION
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="cyber-button-hover px-8 py-4 rounded-lg font-cyber font-semibold text-lg bg-transparent border border-yellow-400 text-white hover:bg-yellow-400/10">
                  ASK QUESTIONS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
