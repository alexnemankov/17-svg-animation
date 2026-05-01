import React, { useEffect, useRef } from 'react';
import './Padlock.css';

export interface PadlockProps {
  animationState: 'loop' | 'locked' | 'unlocked';
}

const DURATION = 6000;
const NUM_PARTICLES = 45;
const COLORS = ['#FFD700', '#FFC107', '#FFE082', '#FFF8E1'];

export const PadlockComponent: React.FC<PadlockProps> = ({ animationState }) => {
  const particlesGroupRef = useRef<SVGGElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const group = particlesGroupRef.current;
    if (!group) return;

    // Clear any existing particles if component remounts
    while (group.firstChild) {
      group.removeChild(group.firstChild);
    }

    const particles: any[] = [];

    // Initialize particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const baseR = Math.random() * 2.5 + 1;
      circle.setAttribute('fill', COLORS[Math.floor(Math.random() * COLORS.length)]);
      group.appendChild(circle);

      particles.push({
        el: circle,
        baseR,
        angle: Math.random() * Math.PI * 2,
        orbitSpeed: Math.random() * 0.035 + 0.015,
        maxRadius: Math.random() * 70 + 40,
        wobbleOffset: Math.random() * Math.PI * 2,
        explosionAngle: 0
      });
    }

    startTimeRef.current = Date.now();

    const renderPhysics = () => {
      // If state is not 'loop', we hide all particles
      if (animationState !== 'loop') {
         particles.forEach(p => {
             p.el.setAttribute('opacity', '0');
         });
         animationRef.current = requestAnimationFrame(renderPhysics);
         return;
      }

      const t = (Date.now() - startTimeRef.current) % DURATION;
      const progress = t / DURATION;

      particles.forEach(p => {
        let opacity = 0;
        let currentRadius = 0;

        if (progress < 0.1) {
          opacity = progress / 0.1;
          currentRadius = p.maxRadius;
        } else if (progress < 0.38) {
          opacity = 1;
          let swirl = (progress - 0.1) / 0.28;
          currentRadius = p.maxRadius * (1 - Math.pow(swirl, 3)); 
        } else if (progress < 0.40) {
          opacity = 1 - ((progress - 0.38) / 0.02);
          currentRadius = 0;
        } else if (progress < 0.80) {
          opacity = 0;
          p.explosionAngle = p.angle; 
        } else if (progress < 0.95) {
          let exp = (progress - 0.80) / 0.15;
          opacity = 1 - Math.pow(exp, 2);
          currentRadius = p.maxRadius * (exp * 2);
          p.angle = p.explosionAngle;
        } else {
          opacity = 0;
        }

        if (progress < 0.8) {
          p.angle += p.orbitSpeed;
        }

        let wobble = Math.sin(t * 0.005 + p.wobbleOffset) * 5 * (currentRadius / p.maxRadius || 0);

        let cx = 200 + Math.cos(p.angle) * (currentRadius + wobble);
        let cy = 240 + Math.sin(p.angle) * (currentRadius + wobble); 

        let currentSize = p.baseR * opacity;

        p.el.setAttribute('cx', String(cx));
        p.el.setAttribute('cy', String(cy));
        p.el.setAttribute('r', String(Math.max(0.1, currentSize)));
        p.el.setAttribute('opacity', String(opacity));
      });

      animationRef.current = requestAnimationFrame(renderPhysics);
    };

    animationRef.current = requestAnimationFrame(renderPhysics);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationState]);

  // Restart loop time if changing to loop state
  useEffect(() => {
     if (animationState === 'loop') {
         startTimeRef.current = Date.now();
     }
  }, [animationState]);

  return (
    <div className={`padlock-container state-${animationState}`}>
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#dce1e8"/>
          </linearGradient>

          <linearGradient id="shackle-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#e0e5eb"/>
            <stop offset="100%" stop-color="#8a9099"/>
          </linearGradient>

          <filter id="padlock-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#000" floodOpacity="0.6"/>
          </filter>

          <filter id="gold-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <circle className="shockwave-anim" cx="200" cy="240" r="25" fill="none" stroke="#FFC107" />

        <g id="padlock">
          <path className="shackle-anim" d="M 155 190 V 130 A 45 45 0 0 1 245 130 V 250" 
                stroke="url(#shackle-grad)" strokeWidth="18" strokeLinecap="round" fill="none" />
          
          <g filter="url(#padlock-shadow)">
            <rect x="120" y="190" width="160" height="120" rx="22" fill="url(#body-grad)" />
            <rect x="123" y="193" width="154" height="114" rx="19" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
          </g>

          <g className="keyhole-anim">
            <circle cx="200" cy="236" r="14" />
            <path d="M 189 244 L 180 274 A 5 5 0 0 0 185 280 H 215 A 5 5 0 0 0 220 274 L 211 244 Z" />
          </g>
        </g>

        <g id="particles-group" filter="url(#particle-glow)" ref={particlesGroupRef}></g>
      </svg>
    </div>
  );
};
