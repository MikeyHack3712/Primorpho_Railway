import React from 'react';

export default function TechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-15">
      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Horizontal Circuit Lines */}
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none" filter="url(#glow)">
          <path d="M0,100 L200,100 L220,120 L300,120" className="animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }} />
          <path d="M100,200 L400,200 L420,180 L500,180" className="animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }} />
          <path d="M0,300 L150,300 L170,280 L350,280" className="animate-pulse" style={{ animationDelay: '2s', animationDuration: '3s' }} />
          <path d="M200,450 L600,450 L620,470 L800,470" className="animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '6s' }} />
        </g>
        
        {/* Vertical Circuit Lines */}
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none" filter="url(#glow)">
          <path d="M150,0 L150,200 L170,220 L170,300" className="animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4s' }} />
          <path d="M400,50 L400,350 L380,370 L380,500" className="animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '5s' }} />
          <path d="M600,0 L600,150 L620,170 L620,400" className="animate-pulse" style={{ animationDelay: '3s', animationDuration: '3.5s' }} />
        </g>
        
        {/* Circuit Nodes */}
        <g fill="url(#circuitGradient)">
          <circle cx="200" cy="100" r="3" className="animate-ping" style={{ animationDelay: '0s', animationDuration: '2s' }} />
          <circle cx="400" cy="200" r="3" className="animate-ping" style={{ animationDelay: '1s', animationDuration: '2.5s' }} />
          <circle cx="150" cy="300" r="3" className="animate-ping" style={{ animationDelay: '2s', animationDuration: '3s' }} />
          <circle cx="600" cy="450" r="3" className="animate-ping" style={{ animationDelay: '1.5s', animationDuration: '2s' }} />
          <circle cx="170" cy="220" r="2" className="animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
          <circle cx="380" cy="370" r="2" className="animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '3s' }} />
        </g>
      </svg>
      
      {/* Floating Tech Icons */}
      <div className="absolute inset-0">
        {/* Neural Network Nodes */}
        <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-cyan-400/20 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 left-32 w-3 h-3 rounded-full bg-purple-400/20 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-48 left-16 w-2 h-2 rounded-full bg-yellow-400/20 animate-pulse" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
        
        <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-cyan-400/20 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-64 right-40 w-4 h-4 rounded-full bg-purple-400/20 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
        <div className="absolute top-80 right-16 w-2 h-2 rounded-full bg-yellow-400/20 animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '3s' }}></div>
        
        {/* Data Flow Indicators */}
        <div className="absolute bottom-32 left-24 w-6 h-1 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
        <div className="absolute bottom-48 right-32 w-8 h-1 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-64 left-1/2 w-4 h-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}></div>
        
        {/* Geometric Tech Elements */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-cyan-400/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 border border-purple-400/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 border border-yellow-400/20 rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
      </div>
      
      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-pulse" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
      </div>
    </div>
  );
}