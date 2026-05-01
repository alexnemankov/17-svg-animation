import React, { useState } from 'react';
import { PadlockComponent } from './Component';
import { Play, Lock, Unlock } from 'lucide-react';

export const PadlockWrapper: React.FC<{ showUI?: boolean }> = ({ showUI }) => {
  const [animationState, setAnimationState] = useState<'loop' | 'locked' | 'unlocked'>('loop');

  return (
    <>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PadlockComponent animationState={animationState} />
      </div>
      
      {showUI && (
        <div 
          className="ui-element"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(10, 15, 25, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #FFD700',
            borderRadius: '12px',
            padding: '15px 20px',
            display: 'flex',
            gap: '15px',
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.2)'
          }}
        >
          <button 
            onClick={() => setAnimationState('loop')}
            style={{
              background: animationState === 'loop' ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
              border: '1px solid #FFD700',
              color: '#FFD700',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Play size={16} /> Auto Loop
          </button>
          
          <button 
            onClick={() => setAnimationState('locked')}
            style={{
              background: animationState === 'locked' ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
              border: '1px solid #FFD700',
              color: '#FFD700',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Lock size={16} /> Locked
          </button>
          
          <button 
            onClick={() => setAnimationState('unlocked')}
            style={{
              background: animationState === 'unlocked' ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
              border: '1px solid #FFD700',
              color: '#FFD700',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Unlock size={16} /> Unlocked
          </button>
        </div>
      )}
    </>
  );
};
