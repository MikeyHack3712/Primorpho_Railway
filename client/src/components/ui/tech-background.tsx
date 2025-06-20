import React from 'react';

export default function TechBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      {/* Animated Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Electricity Flow Gradients */}
          <linearGradient id="electricFlow1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="30%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#ff00ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;400 0;-100 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
          
          <linearGradient id="electricFlow2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffff00" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#00ffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="400 0;-100 0;400 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </linearGradient>
          
          <linearGradient id="electricFlow3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="35%" stopColor="#ff00ff" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#00ffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="0 -100;0 400;0 -100"
              dur="5s"
              repeatCount="indefinite"
            />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="electricGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Base Circuit Lines */}
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none" filter="url(#glow)" opacity="0.6">
          <path d="M0,100 L200,100 L220,120 L400,120 L420,100 L600,100" />
          <path d="M100,200 L500,200 L520,180 L700,180 L720,200 L900,200" />
          <path d="M0,300 L250,300 L270,280 L450,280 L470,300 L700,300" />
          <path d="M200,450 L600,450 L620,470 L900,470 L920,450 L1200,450" />
          <path d="M50,550 L350,550 L370,530 L550,530 L570,550 L800,550" />
        </g>
        
        {/* Animated Electricity Lines */}
        <g strokeWidth="3" fill="none" filter="url(#electricGlow)">
          <path d="M0,100 L200,100 L220,120 L400,120 L420,100 L600,100" stroke="url(#electricFlow1)" />
          <path d="M100,200 L500,200 L520,180 L700,180 L720,200 L900,200" stroke="url(#electricFlow2)" />
          <path d="M0,300 L250,300 L270,280 L450,280 L470,300 L700,300" stroke="url(#electricFlow1)" style={{ animationDelay: '1.5s' }} />
          <path d="M200,450 L600,450 L620,470 L900,470 L920,450 L1200,450" stroke="url(#electricFlow2)" style={{ animationDelay: '2s' }} />
          <path d="M50,550 L350,550 L370,530 L550,530 L570,550 L800,550" stroke="url(#electricFlow1)" style={{ animationDelay: '0.5s' }} />
        </g>
        
        {/* Base Vertical Circuit Lines */}
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none" filter="url(#glow)" opacity="0.6">
          <path d="M150,0 L150,200 L170,220 L170,400 L150,420 L150,600" />
          <path d="M400,50 L400,350 L380,370 L380,550 L400,570 L400,700" />
          <path d="M600,0 L600,250 L620,270 L620,500 L600,520 L600,700" />
          <path d="M800,100 L800,300 L780,320 L780,450 L800,470 L800,600" />
        </g>
        
        {/* Animated Vertical Electricity Lines */}
        <g strokeWidth="3" fill="none" filter="url(#electricGlow)">
          <path d="M150,0 L150,200 L170,220 L170,400 L150,420 L150,600" stroke="url(#electricFlow3)" />
          <path d="M400,50 L400,350 L380,370 L380,550 L400,570 L400,700" stroke="url(#electricFlow3)" style={{ animationDelay: '1s' }} />
          <path d="M600,0 L600,250 L620,270 L620,500 L600,520 L600,700" stroke="url(#electricFlow3)" style={{ animationDelay: '2s' }} />
          <path d="M800,100 L800,300 L780,320 L780,450 L800,470 L800,600" stroke="url(#electricFlow3)" style={{ animationDelay: '3s' }} />
        </g>
        
        {/* Circuit Nodes with Electric Sparks */}
        <g>
          {/* Main Connection Nodes */}
          <circle cx="200" cy="100" r="5" fill="#00ffff" className="animate-ping" style={{ animationDelay: '0s', animationDuration: '2s' }} filter="url(#electricGlow)" />
          <circle cx="400" cy="200" r="5" fill="#ff00ff" className="animate-ping" style={{ animationDelay: '1s', animationDuration: '2.5s' }} filter="url(#electricGlow)" />
          <circle cx="150" cy="300" r="5" fill="#ffff00" className="animate-ping" style={{ animationDelay: '2s', animationDuration: '3s' }} filter="url(#electricGlow)" />
          <circle cx="600" cy="450" r="5" fill="#00ffff" className="animate-ping" style={{ animationDelay: '1.5s', animationDuration: '2s' }} filter="url(#electricGlow)" />
          
          {/* Secondary Nodes */}
          <circle cx="170" cy="220" r="4" fill="#ff00ff" className="animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }} filter="url(#electricGlow)" />
          <circle cx="380" cy="370" r="4" fill="#00ffff" className="animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '3s' }} filter="url(#electricGlow)" />
          <circle cx="220" cy="120" r="4" fill="#ffff00" className="animate-ping" style={{ animationDelay: '1.5s', animationDuration: '3s' }} filter="url(#electricGlow)" />
          <circle cx="520" cy="180" r="4" fill="#ff00ff" className="animate-ping" style={{ animationDelay: '2.5s', animationDuration: '2s' }} filter="url(#electricGlow)" />
          <circle cx="270" cy="280" r="4" fill="#00ffff" className="animate-pulse" style={{ animationDelay: '3s', animationDuration: '4s' }} filter="url(#electricGlow)" />
          <circle cx="620" cy="470" r="4" fill="#ffff00" className="animate-ping" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} filter="url(#electricGlow)" />
          
          {/* Electric Sparks */}
          <g opacity="0.8">
            <circle cx="200" cy="100" r="8" fill="none" stroke="#00ffff" strokeWidth="1" className="animate-ping" style={{ animationDelay: '0s', animationDuration: '1s' }} />
            <circle cx="400" cy="200" r="10" fill="none" stroke="#ff00ff" strokeWidth="1" className="animate-ping" style={{ animationDelay: '0.5s', animationDuration: '1.5s' }} />
            <circle cx="150" cy="300" r="6" fill="none" stroke="#ffff00" strokeWidth="1" className="animate-ping" style={{ animationDelay: '1s', animationDuration: '1s' }} />
            <circle cx="600" cy="450" r="9" fill="none" stroke="#00ffff" strokeWidth="1" className="animate-ping" style={{ animationDelay: '1.5s', animationDuration: '1.2s' }} />
          </g>
        </g>
        
        {/* Electric Bolt Connections */}
        <g strokeWidth="2" fill="none" filter="url(#electricGlow)">
          <path d="M200,100 Q300,150 400,200" stroke="url(#electricFlow1)" opacity="0.7" />
          <path d="M400,200 Q275,250 150,300" stroke="url(#electricFlow2)" opacity="0.7" style={{ animationDelay: '1s' }} />
          <path d="M150,300 Q375,375 600,450" stroke="url(#electricFlow1)" opacity="0.7" style={{ animationDelay: '2s' }} />
          <path d="M170,220 Q290,295 380,370" stroke="url(#electricFlow3)" opacity="0.7" style={{ animationDelay: '0.5s' }} />
        </g>
        
        {/* Lightning Bolt Effects */}
        <g strokeWidth="1" fill="none" opacity="0.6">
          <path d="M220,120 L225,125 L218,130 L230,135 L215,140" stroke="#00ffff" className="animate-pulse" style={{ animationDelay: '0s', animationDuration: '0.5s' }} filter="url(#electricGlow)" />
          <path d="M520,180 L515,185 L525,190 L510,195 L520,200" stroke="#ff00ff" className="animate-pulse" style={{ animationDelay: '1s', animationDuration: '0.3s' }} filter="url(#electricGlow)" />
          <path d="M270,280 L275,275 L265,285 L280,290 L270,295" stroke="#ffff00" className="animate-pulse" style={{ animationDelay: '2s', animationDuration: '0.4s' }} filter="url(#electricGlow)" />
          <path d="M620,470 L615,465 L625,475 L610,480 L620,485" stroke="#00ffff" className="animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '0.6s' }} filter="url(#electricGlow)" />
        </g>
      </svg>
      
      {/* Floating Tech Icons */}
      <div className="absolute inset-0">
        {/* Neural Network Nodes */}
        <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 left-32 w-6 h-6 rounded-full bg-purple-400/40 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-48 left-16 w-4 h-4 rounded-full bg-yellow-400/40 animate-pulse" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
        
        <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-64 right-40 w-8 h-8 rounded-full bg-purple-400/40 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
        <div className="absolute top-80 right-16 w-4 h-4 rounded-full bg-yellow-400/40 animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '3s' }}></div>
        
        <div className="absolute bottom-40 left-20 w-5 h-5 rounded-full bg-cyan-400/30 animate-ping" style={{ animationDelay: '3s', animationDuration: '2s' }}></div>
        <div className="absolute bottom-60 right-30 w-7 h-7 rounded-full bg-purple-400/30 animate-ping" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        
        {/* Data Flow Indicators */}
        <div className="absolute bottom-32 left-24 w-12 h-2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
        <div className="absolute bottom-48 right-32 w-16 h-2 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute bottom-64 left-1/2 w-10 h-2 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-14 h-2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        
        {/* Geometric Tech Elements */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-cyan-400/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-10 h-10 border-2 border-purple-400/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 border-2 border-yellow-400/30 rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-6 h-6 border border-cyan-400/40 animate-spin" style={{ animationDuration: '12s' }}></div>
        
        {/* Tech Circuit Patterns */}
        <div className="absolute top-10 right-10 w-16 h-16 border border-purple-400/20 animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-400/30 animate-ping" style={{ animationDelay: '3s', animationDuration: '2s' }}></div>
        </div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border border-cyan-400/20 rotate-45 animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400/40 animate-ping" style={{ animationDelay: '2s', animationDuration: '3s' }}></div>
        </div>
      </div>
      
      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
        <div className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent animate-pulse" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent animate-pulse" style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
        
        {/* Vertical Scanning Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent animate-pulse" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/25 to-transparent animate-pulse" style={{ animationDelay: '3s', animationDuration: '7s' }}></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/25 to-transparent animate-pulse" style={{ animationDelay: '5s', animationDuration: '6s' }}></div>
      </div>
    </div>
  );
}