import React from 'react';
import { animations } from '../animations';
import { AnimationCard } from '../components/AnimationCard';
import { LayoutDashboard } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const animationList = Object.values(animations);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#060A14',
      padding: '40px 20px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <header style={{ marginBottom: '40px', borderBottom: '1px solid #1A2B4C', paddingBottom: '20px' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#00F0FF', margin: 0, fontSize: '2.5rem' }}>
            <LayoutDashboard size={40} />
            Animation Dashboard
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '10px', fontSize: '1.1rem' }}>
            A collection of interactive SVG scenes and animations.
          </p>
        </header>

        <main>
          {animationList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'rgba(255,255,255,0.4)', border: '1px dashed #1A2B4C', borderRadius: '12px' }}>
              No animations registered yet.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {animationList.map(anim => (
                <AnimationCard key={anim.id} animation={anim} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
