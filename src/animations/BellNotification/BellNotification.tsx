import React from 'react';
import './BellNotification.css';

export type BellState = 'animating' | 'static' | 'read';

interface BellNotificationProps {
  state: BellState;
}

export const BellNotification: React.FC<BellNotificationProps> = ({ state }) => {
  return (
    <>
      {/* Background for panning/zooming */}
      <div className="bell-background" />

      {/* Main Container */}
      <div className={`bell-container is-${state}`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Back Layer: Expanding Ripples */}
          <g className="ripples">
            <circle className="ripple ripple-1" cx="50" cy="48" r="18" />
            <circle className="ripple ripple-2" cx="50" cy="48" r="18" />
            <circle className="ripple ripple-3" cx="50" cy="48" r="18" />
          </g>

          {/* Mid Layer: Swinging Bell System */}
          <g className="bell-group">
            {/* Top Hook */}
            <path className="hook" d="M 47 22 V 16 C 47 13.5 53 13.5 53 16 V 22" />
            {/* Clapper (Rendered prior to the bell body so it accurately sits inside/behind it) */}
            <circle className="clapper" cx="50" cy="64" r="4.5" />
            {/* Main Bell Body */}
            <path className="bell-path" d="M 50 22 C 41 22 36 29 36 38 L 36 48 C 36 54 28 58 28 60 C 28 61 29 62 30 62 L 70 62 C 71 62 72 61 72 60 C 72 58 64 54 64 48 L 64 38 C 64 29 59 22 50 22 Z" />
          </g>

          {/* Front Layer: Notification Badge */}
          <circle className="badge" cx="67" cy="27" r="6.5" />
        </svg>
      </div>
    </>
  );
};
