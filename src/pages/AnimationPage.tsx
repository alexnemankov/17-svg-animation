import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { animations } from '../animations';
import { AnimationViewer } from '../components/AnimationViewer';

export const AnimationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !animations[id]) {
    return <Navigate to="/" replace />;
  }

  const AnimationComponent = animations[id].component;

  return (
    <div style={{ backgroundColor: '#060A14', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AnimationViewer>
        <AnimationComponent />
      </AnimationViewer>
    </div>
  );
};
