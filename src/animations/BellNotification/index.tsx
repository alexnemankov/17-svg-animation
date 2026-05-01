import React, { useState } from 'react';
import { BellNotification } from './BellNotification';
import type { BellState } from './BellNotification';
import { BellRing, Bell, Check } from 'lucide-react';

export const BellNotificationWrapper: React.FC<{ showUI?: boolean }> = ({ showUI }) => {
  const [animationState, setAnimationState] = useState<BellState>('animating');

  return (
    <>
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BellNotification state={animationState} />
      </div>

      {showUI && (
        <div
          className="ui-element"
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(30, 30, 36, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #FF3B30',
            borderRadius: '12px',
            padding: '15px 20px',
            display: 'flex',
            gap: '15px',
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(255, 59, 48, 0.2)'
          }}
        >
          <button
            onClick={() => setAnimationState('animating')}
            style={{
              background: animationState === 'animating' ? 'rgba(255, 59, 48, 0.2)' : 'transparent',
              border: '1px solid #FF3B30',
              color: '#FF3B30',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <BellRing size={16} /> Animating
          </button>

          <button
            onClick={() => setAnimationState('static')}
            style={{
              background: animationState === 'static' ? 'rgba(255, 59, 48, 0.2)' : 'transparent',
              border: '1px solid #FF3B30',
              color: '#FF3B30',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Bell size={16} /> Unread
          </button>

          <button
            onClick={() => setAnimationState('read')}
            style={{
              background: animationState === 'read' ? 'rgba(255, 59, 48, 0.2)' : 'transparent',
              border: '1px solid #FF3B30',
              color: '#FF3B30',
              padding: '8px 16px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Check size={16} /> Read
          </button>
        </div>
      )}
    </>
  );
};
