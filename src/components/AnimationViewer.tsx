import React, { useState, useRef, useEffect } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { Settings, Move, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnimationViewerProps {
  children: React.ReactNode | ((props: { showUI: boolean }) => React.ReactNode);
}

export const AnimationViewer: React.FC<AnimationViewerProps> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showUI, setShowUI] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);



  const handleMouseDown = (e: ReactMouseEvent) => {
    // Only drag if left click and not clicking on UI elements
    if (e.button !== 0 || (e.target as HTMLElement).closest('.ui-element')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleNativeWheel = (e: WheelEvent) => {
        e.preventDefault(); // Prevent page scroll
        const scaleAmount = -e.deltaY * 0.001;
        setScale((prevScale) => Math.min(Math.max(0.2, prevScale + scaleAmount), 5));
      };
      container.addEventListener('wheel', handleNativeWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleNativeWheel);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden', 
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {typeof children === 'function' ? children({ showUI }) : React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<any>, { showUI }) : children}
      </div>

      {/* Global UI Controls */}
      <button 
        className="ui-element"
        onClick={() => setShowUI(!showUI)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100,
          backgroundColor: showUI ? 'rgba(0, 240, 255, 0.2)' : 'rgba(26, 26, 26, 0.8)',
          border: '1px solid #00F0FF',
          color: '#00F0FF',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}
        title="Toggle UI"
      >
        <Settings size={20} />
      </button>

      {showUI && (
        <div 
          className="ui-element"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 100
          }}
        >
          <Link to="/">
            <button 
              style={{
                backgroundColor: 'rgba(26, 26, 26, 0.8)',
                border: '1px solid #00F0FF',
                color: '#00F0FF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 15px'
              }}
            >
              <Home size={18} />
              Back to Board
            </button>
          </Link>
          
          <div style={{
            backgroundColor: 'rgba(6, 10, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #00F0FF',
            borderRadius: '8px',
            padding: '15px',
            color: '#00F0FF',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '200px'
          }}>
            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Move size={16} /> View Controls
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '12px' }}>Zoom: {(scale * 100).toFixed(0)}%</label>
              <input 
                type="range" 
                min="0.2" max="5" step="0.1" 
                value={scale} 
                onChange={(e) => setScale(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            
            <button 
              onClick={resetView}
              style={{
                backgroundColor: 'transparent',
                border: '1px dashed #00F0FF',
                color: '#00F0FF',
                padding: '5px',
                fontSize: '12px',
                marginTop: '5px'
              }}
            >
              Reset View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
