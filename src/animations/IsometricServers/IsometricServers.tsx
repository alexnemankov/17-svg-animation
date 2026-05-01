import React from 'react';

interface IsometricServersProps {
  systemStatus?: 'ONLINE' | 'OFFLINE' | 'WARNING';
  coreNodeOnline?: boolean;
  syncNodeOnline?: boolean;
  dataNodeOnline?: boolean;
}

export const IsometricServers: React.FC<IsometricServersProps> = ({
  systemStatus = 'ONLINE',
  coreNodeOnline = true,
  syncNodeOnline = true,
  dataNodeOnline = true,
}) => {
  const getStatusColor = (isOnline: boolean) => (isOnline ? '#00F0FF' : '#FF003C');
  const getSystemText = () => {
    switch (systemStatus) {
      case 'ONLINE': return 'SYS.OP: ONLINE // SECURE';
      case 'WARNING': return 'SYS.OP: WARNING // DEGRADED';
      case 'OFFLINE': return 'SYS.OP: OFFLINE // CRITICAL';
    }
  };

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 30px rgba(0, 240, 255, 0.05))' }}>
      <defs>
        {/* Glowing Filters */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Background Tech Grid */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#101A30" strokeWidth="1" />
          <circle cx="0" cy="0" r="1" fill="#1A2B4C" />
        </pattern>

        {/* Gradients */}
        <linearGradient id="beamGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="serverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16264A" />
          <stop offset="100%" stopColor="#0B1325" />
        </linearGradient>

        {/* Path Definitions for Data Streams */}
        <path id="stream1" d="M 400 520 C 300 520, 200 420, 200 300" />
        <path id="stream2" d="M 200 300 C 200 120, 600 120, 600 300" />
        <path id="stream3" d="M 600 300 C 600 420, 500 520, 400 520" />

        {/* Hexagon Data Packet */}
        <g id="hex">
          <polygon points="0,-7 6,-3.5 6,3.5 0,7 -6,3.5 -6,-3.5" fill="#00F0FF" filter="url(#glow)"/>
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        </g>

        {/* Isometric Base Pad with Light Beam */}
        <g id="basePad">
          <ellipse cx="60" cy="30" rx="80" ry="40" fill="none" stroke="#00F0FF" strokeWidth="0.5" opacity="0.15" />
          <ellipse cx="60" cy="30" rx="60" ry="30" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from="0 60 30" to="360 60 30" dur="20s" repeatCount="indefinite" />
          </ellipse>
          <polygon points="20,20 60,0 100,20 100,-60 60,-80 20,-60" fill="url(#beamGrad)" />
          <polygon points="0,30 60,0 120,30 60,60" fill="none" stroke="#00F0FF" strokeWidth="2" opacity="0.8" filter="url(#glow)" />
          <polygon points="10,30 60,5 110,30 60,55" fill="#00F0FF" opacity="0.1" />
        </g>

        {/* Isometric Server Block */}
        <g id="server">
          <polygon points="0,30 60,0 120,30 60,60" fill="#16264A" stroke="#2A437E" strokeWidth="1" strokeLinejoin="round" />
          <polygon points="0,30 60,60 60,150 0,120" fill="#0D162B" stroke="#1A2B4C" strokeWidth="1" strokeLinejoin="round" />
          <polygon points="60,60 120,30 120,120 60,150" fill="#101B35" stroke="#1A2B4C" strokeWidth="1" strokeLinejoin="round" />

          <polygon points="8,46 48,66 48,70 8,50" fill="#00F0FF" opacity="0.9" filter="url(#glow)" />
          <polygon points="8,66 48,86 48,90 8,70" fill="#00F0FF" opacity="0.6" />
          <polygon points="8,86 48,106 48,110 8,90" fill="#00F0FF" opacity="0.3" />
          <polygon points="8,106 48,126 48,130 8,110" fill="#00F0FF" opacity="0.8">
            <animate attributeName="opacity" values="0.8; 0.2; 0.8" dur="3s" repeatCount="indefinite" />
          </polygon>

          <polygon points="80,70 85,67.5 90,70 85,72.5" fill="#00F0FF" filter="url(#glow)">
            <animate attributeName="opacity" values="1; 0; 1" dur="1s" repeatCount="indefinite" />
          </polygon>
          <polygon points="80,90 85,87.5 90,90 85,92.5" fill="#00F0FF" filter="url(#glow)">
            <animate attributeName="opacity" values="0; 1; 0" dur="1.5s" repeatCount="indefinite" />
          </polygon>
          <polygon points="80,110 85,107.5 90,110 85,112.5" fill="#00F0FF" filter="url(#glow)">
            <animate attributeName="opacity" values="1; 0.2; 1" dur="0.8s" repeatCount="indefinite" />
          </polygon>

          <polygon points="10,30 60,5 110,30 60,55" fill="none" stroke="#2A437E" strokeWidth="1" />
          <circle cx="60" cy="30" r="10" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.5" />
          <circle cx="60" cy="30" r="3" fill="#00F0FF" filter="url(#glow)" />
        </g>
      </defs>

      {/* Background Layer */}
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Deep Ambient Glow behind the network */}
      <circle cx="400" cy="300" r="250" fill={systemStatus === 'OFFLINE' ? '#FF003C' : '#00F0FF'} opacity="0.03" filter="url(#softGlow)" />

      {/* BASE PADS */}
      <use href="#basePad" x="340" y="490" />
      <use href="#basePad" x="140" y="270" />
      <use href="#basePad" x="540" y="270" />

      {/* DATA STREAMS (Connections) */}
      <g id="connections">
        {coreNodeOnline && syncNodeOnline && (
          <>
            <use href="#stream1" fill="none" stroke="#00F0FF" strokeWidth="6" opacity="0.15" filter="url(#glow)" />
            <use href="#stream1" fill="none" stroke="#00F0FF" strokeWidth="1.5" opacity="0.8" strokeDasharray="4 8">
              <animate attributeName="stroke-dashoffset" from="120" to="0" dur="3s" repeatCount="indefinite" />
            </use>
          </>
        )}
        
        {syncNodeOnline && dataNodeOnline && (
          <>
            <use href="#stream2" fill="none" stroke="#00F0FF" strokeWidth="6" opacity="0.15" filter="url(#glow)" />
            <use href="#stream2" fill="none" stroke="#00F0FF" strokeWidth="1.5" opacity="0.8" strokeDasharray="4 8">
              <animate attributeName="stroke-dashoffset" from="120" to="0" dur="3s" repeatCount="indefinite" />
            </use>
          </>
        )}

        {dataNodeOnline && coreNodeOnline && (
          <>
            <use href="#stream3" fill="none" stroke="#00F0FF" strokeWidth="6" opacity="0.15" filter="url(#glow)" />
            <use href="#stream3" fill="none" stroke="#00F0FF" strokeWidth="1.5" opacity="0.8" strokeDasharray="4 8">
              <animate attributeName="stroke-dashoffset" from="120" to="0" dur="3s" repeatCount="indefinite" />
            </use>
          </>
        )}
      </g>

      {/* HEXAGON PACKETS */}
      {coreNodeOnline && syncNodeOnline && (
        <>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="0s" rotate="auto"><mpath href="#stream1"/></animateMotion><use href="#hex"/></g>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="2s" rotate="auto"><mpath href="#stream1"/></animateMotion><use href="#hex"/></g>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="4s" rotate="auto"><mpath href="#stream1"/></animateMotion><use href="#hex"/></g>
        </>
      )}

      {syncNodeOnline && dataNodeOnline && (
        <>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="1s" rotate="auto"><mpath href="#stream2"/></animateMotion><use href="#hex"/></g>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="3s" rotate="auto"><mpath href="#stream2"/></animateMotion><use href="#hex"/></g>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="5s" rotate="auto"><mpath href="#stream2"/></animateMotion><use href="#hex"/></g>
        </>
      )}

      {dataNodeOnline && coreNodeOnline && (
        <>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="0.5s" rotate="auto"><mpath href="#stream3"/></animateMotion><use href="#hex"/></g>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="2.5s" rotate="auto"><mpath href="#stream3"/></animateMotion><use href="#hex"/></g>
          <g><animateMotion dur="6s" repeatCount="indefinite" begin="4.5s" rotate="auto"><mpath href="#stream3"/></animateMotion><use href="#hex"/></g>
        </>
      )}

      {/* FLOATING ISOMETRIC SERVERS */}
      <g opacity={coreNodeOnline ? 1 : 0.4}>
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-12; 0,0" dur="5s" begin="0s" repeatCount="indefinite" />
        <use href="#server" x="340" y="380" />
      </g>
      <g opacity={syncNodeOnline ? 1 : 0.4}>
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="4.5s" begin="-1.5s" repeatCount="indefinite" />
        <use href="#server" x="140" y="160" />
      </g>
      <g opacity={dataNodeOnline ? 1 : 0.4}>
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-14; 0,0" dur="6s" begin="-3s" repeatCount="indefinite" />
        <use href="#server" x="540" y="160" />
      </g>

      {/* UI TEXT & OVERLAYS */}
      <g fill="#00F0FF" fontSize="12" letterSpacing="2" style={{ textShadow: '0 0 8px rgba(0, 240, 255, 0.6)' }}>
        <text x="470" y="470" fill={getStatusColor(coreNodeOnline)}>NODE_01 :: CORE</text>
        <path d="M 460 466 L 430 466 L 420 480" fill="none" stroke={getStatusColor(coreNodeOnline)} strokeWidth="1" opacity="0.5" />
        
        <text x="50" y="220" fill={getStatusColor(syncNodeOnline)}>NODE_02 :: SYNC</text>
        <path d="M 175 216 L 205 216 L 215 230" fill="none" stroke={getStatusColor(syncNodeOnline)} strokeWidth="1" opacity="0.5" />
        
        <text x="670" y="220" fill={getStatusColor(dataNodeOnline)}>NODE_03 :: DATA</text>
        <path d="M 660 216 L 630 216 L 620 230" fill="none" stroke={getStatusColor(dataNodeOnline)} strokeWidth="1" opacity="0.5" />
        
        {/* Decorative UI Elements */}
        <text x="40" y="40" fontSize="10" opacity="0.6" fill={systemStatus === 'OFFLINE' ? '#FF003C' : '#00F0FF'}>{getSystemText()}</text>
        <path d="M 40 50 L 200 50" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.3" />
        <path d="M 760 550 L 600 550" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.3" />
        <text x="600" y="540" fontSize="10" opacity="0.6">STATUS: OPTIMAL ROUTING</text>
      </g>
    </svg>
  );
};
