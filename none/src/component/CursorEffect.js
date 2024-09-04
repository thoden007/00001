import React, { useState, useEffect } from 'react';

const ClickWaveEffect = () => {
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    const handleClick = (event) => {
      const newWave = {
        x: event.clientX,
        y: event.clientY,
        id: Date.now(),
      };
      setWaves((prevWaves) => [...prevWaves, newWave]);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaves((prevWaves) => prevWaves.slice(1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {waves.map((wave) => (
        <div
          key={wave.id}
          style={{
            position: 'absolute',
            left: `${wave.x}px`,
            top: `${wave.y}px`,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            backgroundColor: 'rgba(0, 150, 255, 0.5)',
            borderRadius: '50%',
            animation: 'wave-animation 1s ease-out',
            pointerEvents: 'none',
            zIndex: 999,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes wave-animation {
          0% {
            transform: scale(0.5) translate(-50%, -50%);
            opacity: 1;
          }
          100% {
            transform: scale(10) translate(-50%, -50%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ClickWaveEffect;
