import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import type { AnimationDefinition } from '../animations';

interface AnimationCardProps {
  animation: AnimationDefinition;
}

export const AnimationCard: React.FC<AnimationCardProps> = ({ animation }) => {
  return (
    <Link to={`/animation/${animation.id}`} className="card-hover" style={{ display: 'block' }}>
      <div style={{
        backgroundColor: '#101A30',
        border: '1px solid #1A2B4C',
        borderRadius: '12px',
        padding: '24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract background shape for the card */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%'
        }} />
        
        <div>
          <h3 style={{ margin: '0 0 10px 0', color: '#00F0FF', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={18} />
            {animation.title}
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', margin: 0 }}>
            {animation.description}
          </p>
        </div>
        
        <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#00F0FF', opacity: 0.8, fontFamily: 'monospace' }}>
          ID: {animation.id}
        </div>
      </div>
    </Link>
  );
};
