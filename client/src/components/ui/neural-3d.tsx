import React from 'react';

export default function Neural3D() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
      {/* 3D Neural Network Container */}
      <div className="absolute inset-0 perspective-[1000px] transform-gpu">
        
        {/* Floating Neural Nodes */}
        <div className="neural-sphere">
          {Array.from({ length: 30 }, (_, i) => {
            const delay = i * 0.2;
            const duration = 8 + (i % 4);
            const scale = 0.8 + (i % 3) * 0.1;
            const x = (i % 6) * 20 - 50;
            const y = Math.floor(i / 6) * 20 - 40;
            const z = (i % 3) * 15 - 15;
            
            return (
              <div
                key={i}
                className="neural-node"
                style={{
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  transform: `translate3d(${x}%, ${y}%, ${z}px) scale(${scale})`,
                }}
              />
            );
          })}
        </div>

        {/* Central Core */}
        <div className="neural-core">
          <div className="core-inner" />
          <div className="core-rings">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
          </div>
        </div>

        {/* Data Streams */}
        <div className="data-streams">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="data-stream"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-50px)`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Tech Icons */}
        <div className="tech-icons">
          <div className="tech-icon icon-1">⚡</div>
          <div className="tech-icon icon-2">🔮</div>
          <div className="tech-icon icon-3">💫</div>
          <div className="tech-icon icon-4">⚡</div>
        </div>
      </div>
    </div>
  );
}