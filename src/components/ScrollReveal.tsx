import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  blur?: number;
  scale?: number;
  once?: boolean;
  threshold?: number;
  stagger?: number;
  staggerChildren?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  distance = 60,
  duration = 0.9,
  delay = 0,
  blur = 0,
  scale = 1,
  once = true,
  threshold = 0.15,
  stagger = 0,
  staggerChildren = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const getTranslate = useCallback(() => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      default: return 'translateY(0)';
    }
  }, [direction, distance]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) translateX(0) scale(1)' : `${getTranslate()} scale(${scale})`,
    filter: isVisible ? 'blur(0px)' : `blur(${blur}px)`,
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: 'transform, opacity, filter',
  };

  if (staggerChildren) {
    return (
      <div ref={ref} className={className}>
        {React.Children.map(children, (child, i) => (
          <div
            style={{
              ...style,
              transitionDelay: `${delay + i * stagger}s`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};
