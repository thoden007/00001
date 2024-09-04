import React, { useRef, useEffect } from 'react';

const DynamicBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  const initParticles = (canvas, ctx) => {
    const width = canvas.width;
    const height = canvas.height;
    const numParticles = 100;
    particles.current = [];

    for (let i = 0; i < numParticles; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 2,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    }
  };

  const drawParticles = (ctx, mousePos) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i];

      // Di chuyển các hạt
      p.x += p.dx;
      p.y += p.dy;

      // Đảo ngược hướng nếu chạm vào cạnh canvas
      if (p.x < 0 || p.x > ctx.canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > ctx.canvas.height) p.dy *= -1;

      // Vẽ các hạt
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.closePath();

      // Vẽ các đường thẳng nối các hạt
      for (let j = i + 1; j < particles.current.length; j++) {
        const p2 = particles.current[j];
        const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.stroke();
          ctx.closePath();
        }
      }

      // Né con trỏ chuột
      if (mousePos) {
        const distMouse = Math.sqrt((p.x - mousePos.x) ** 2 + (p.y - mousePos.y) ** 2);
        if (distMouse < 100) {
          p.dx += (p.x - mousePos.x) / 20;
          p.dy += (p.y - mousePos.y) / 20;
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas, ctx);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationFrameId;
    const mousePos = { x: null, y: null };

    const animate = () => {
      drawParticles(ctx, mousePos);
      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    canvas.addEventListener('mouseleave', () => {
      mousePos.x = null;
      mousePos.y = null;
    });

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default DynamicBackground;
