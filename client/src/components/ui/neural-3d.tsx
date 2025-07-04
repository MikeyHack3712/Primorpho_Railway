import React from 'react';

interface Neural3DProps {
  intensity?: 'subtle' | 'normal' | 'enhanced';
}

export default function Neural3D({ intensity = 'normal' }: Neural3DProps) {
  const intensityClasses = {
    subtle: 'opacity-20 scale-75',
    normal: 'opacity-40 scale-90', 
    enhanced: 'opacity-60 scale-100'
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${intensityClasses[intensity]}`}>
      {/* Enhanced 3D Neural Network */}
      <div className="absolute inset-0 perspective-[2000px] transform-gpu">
        
        {/* Large Rotating Neural Sphere */}
        <div className="neural-mega-sphere">
          {Array.from({ length: 80 }, (_, i) => {
            const delay = (i * 0.1) % 6;
            const radius = 200 + (i % 5) * 80;
            const theta = (i * 137.5) * (Math.PI / 180); // Golden angle
            const phi = Math.acos(1 - 2 * (i / 80));
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            const nodeType = i % 3;
            const color = nodeType === 0 ? 'cyan' : nodeType === 1 ? 'purple' : 'yellow';
            
            return (
              <div
                key={i}
                className={`mega-neural-node mega-node-${color}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Massive Central Core */}
        <div className="mega-core">
          <div className="core-center" />
          <div className="core-energy-waves">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="energy-wave"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  transform: `rotateY(${i * 60}deg)`,
                }}
              />
            ))}
          </div>
        </div>



        {/* Orbiting Data Clusters */}
        <div className="data-clusters">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="data-cluster"
              style={{
                transform: `rotateY(${i * 30}deg) translateZ(400px)`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <div className="cluster-core" />
              {Array.from({ length: 5 }, (_, j) => (
                <div
                  key={j}
                  className="cluster-satellite"
                  style={{
                    transform: `rotateZ(${j * 72}deg) translateX(20px)`,
                    animationDelay: `${(i + j) * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Floating Holographic Elements */}
        <div className="holo-elements">
          <div className="holo-hexagon" />
        </div>
      </div>
    </div>
  );
}