import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. 'emerald', 'cyan', 'violet', 'amber'
  depth?: number;
  onClick?: () => void;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  glowColor = 'emerald',
  depth = 20,
  onClick,
  id
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const getGlowBorderClass = () => {
    switch (glowColor) {
      case 'cyan': return 'hover:border-white/40 hover:shadow-white/5';
      case 'violet': return 'hover:border-white/40 hover:shadow-white/5';
      case 'amber': return 'hover:border-white/40 hover:shadow-white/5';
      default: return 'hover:border-white/40 hover:shadow-white/5';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation (-12deg to +12deg)
    const rY = ((mouseX / width) - 0.5) * 16;
    const rX = ((mouseY / height) - 0.5) * -16;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 250,
        mass: 0.5
      }}
      className={`relative rounded-xl border border-white/10 bg-[#111111] p-6 shadow-2xl transition-all duration-300 group cursor-pointer overflow-hidden ${getGlowBorderClass()} ${className}`}
    >
      {/* Glare spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)`,
          opacity: glarePos.opacity
        }}
      />

      {/* Subtle border accent glow on hover */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Card Content shifted with 3D Depth */}
      <div
        style={{
          transform: `translateZ(${depth}px)`
        }}
        className="relative z-20"
      >
        {children}
      </div>
    </motion.div>
  );
};
