import React from 'react';

interface IsometricControlsProps {
  systemStatus: 'ONLINE' | 'OFFLINE' | 'WARNING';
  setSystemStatus: (status: 'ONLINE' | 'OFFLINE' | 'WARNING') => void;
  coreNodeOnline: boolean;
  setCoreNodeOnline: (val: boolean) => void;
  syncNodeOnline: boolean;
  setSyncNodeOnline: (val: boolean) => void;
  dataNodeOnline: boolean;
  setDataNodeOnline: (val: boolean) => void;
}

export const IsometricControls: React.FC<IsometricControlsProps> = ({
  systemStatus,
  setSystemStatus,
  coreNodeOnline,
  setCoreNodeOnline,
  syncNodeOnline,
  setSyncNodeOnline,
  dataNodeOnline,
  setDataNodeOnline,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#00F0FF', fontFamily: 'monospace' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>System Status</label>
        <select 
          value={systemStatus} 
          onChange={(e) => setSystemStatus(e.target.value as any)}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#060A14', color: '#00F0FF', border: '1px solid #00F0FF', borderRadius: '4px' }}
        >
          <option value="ONLINE">ONLINE</option>
          <option value="WARNING">WARNING</option>
          <option value="OFFLINE">OFFLINE</option>
        </select>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nodes</label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={coreNodeOnline} onChange={(e) => setCoreNodeOnline(e.target.checked)} />
          Core Node
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={syncNodeOnline} onChange={(e) => setSyncNodeOnline(e.target.checked)} />
          Sync Node
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={dataNodeOnline} onChange={(e) => setDataNodeOnline(e.target.checked)} />
          Data Node
        </label>
      </div>
    </div>
  );
};
