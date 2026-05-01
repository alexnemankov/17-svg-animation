import React, { useState } from 'react';
import { IsometricServers } from './IsometricServers';
import { IsometricControls } from './Controls';

interface WrapperProps {
  showUI: boolean;
}

export const IsometricServersWrapper: React.FC<WrapperProps> = ({ showUI }) => {
  const [systemStatus, setSystemStatus] = useState<'ONLINE' | 'OFFLINE' | 'WARNING'>('ONLINE');
  const [coreNodeOnline, setCoreNodeOnline] = useState(true);
  const [syncNodeOnline, setSyncNodeOnline] = useState(true);
  const [dataNodeOnline, setDataNodeOnline] = useState(true);

  return (
    <>
      <IsometricServers 
        systemStatus={systemStatus}
        coreNodeOnline={coreNodeOnline}
        syncNodeOnline={syncNodeOnline}
        dataNodeOnline={dataNodeOnline}
      />
      {showUI && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(6, 10, 20, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #00F0FF',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '250px',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#00F0FF', fontFamily: 'monospace' }}>Settings</h3>
          <IsometricControls 
            systemStatus={systemStatus}
            setSystemStatus={setSystemStatus}
            coreNodeOnline={coreNodeOnline}
            setCoreNodeOnline={setCoreNodeOnline}
            syncNodeOnline={syncNodeOnline}
            setSyncNodeOnline={setSyncNodeOnline}
            dataNodeOnline={dataNodeOnline}
            setDataNodeOnline={setDataNodeOnline}
          />
        </div>
      )}
    </>
  );
};
