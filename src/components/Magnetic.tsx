import React, { useRef, useState } from 'react';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: React.ElementType;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.3,
  as: Component = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: 'transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {children}
    </Component>
  );
};
