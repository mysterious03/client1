import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CinematicTextRevealProps {
  text: string;
  revealMode?: 'words' | 'characters' | 'lines';
  textColor?: string;
  lineHeight?: number;
  letterSpacing?: number;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;

  // Accent
  accentEnabled?: boolean;
  accentText?: string;
  accentColor?: string;
  accentGradientClass?: string;
  accentStyle?: 'normal' | 'italic' | 'underline';

  // Reveal motion
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  blur?: number;
  startOpacity?: number;
  maskEnabled?: boolean;

  // Timing
  stagger?: number;
  delay?: number;

  // Animation
  animationType?: 'tween' | 'spring';
  duration?: number;
  easing?: 'easeOut' | 'easeInOut' | 'smooth' | 'cinematic';
  stiffness?: number;
  damping?: number;

  // Viewport trigger
  animateOnce?: boolean;
  viewportAmount?: number;
}

const easingMap: Record<string, [number, number, number, number]> = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  smooth: [0.22, 1, 0.36, 1],
  cinematic: [0.76, 0, 0.24, 1],
};

export const CinematicTextReveal: React.FC<CinematicTextRevealProps> = ({
  text,
  revealMode = 'words',
  textColor,
  lineHeight = 1.05,
  letterSpacing = -0.02,
  alignment = 'left',
  className = '',
  style = {},

  accentEnabled = false,
  accentText = '',
  accentColor = '#7B2CF9',
  accentGradientClass = '',
  accentStyle = 'normal',

  direction = 'up',
  distance = 36,
  blur = 8,
  startOpacity = 0,
  maskEnabled = true,

  stagger = 0.055,
  delay = 0.1,

  animationType = 'tween',
  duration = 0.8,
  easing = 'cinematic',
  stiffness = 160,
  damping = 20,

  animateOnce = true,
  viewportAmount = 0.3,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = prefersReducedMotion;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsInView(true);
      return;
    }
    const element = rootRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (animateOnce) observer.disconnect();
        } else if (!animateOnce) {
          setIsInView(false);
        }
      },
      {
        rootMargin: '80px 0px',
        threshold: Math.min(1, Math.max(0, viewportAmount)),
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animateOnce, shouldReduceMotion, viewportAmount]);

  function getOffset() {
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  }
  const offset = getOffset();

  // Child transition configuration
  const childTransition = shouldReduceMotion
    ? { duration: 0 }
    : animationType === 'spring'
    ? { type: 'spring' as const, stiffness, damping }
    : { type: 'tween' as const, duration, ease: (easingMap[easing] ?? easingMap.smooth) as [number, number, number, number] };

  // Variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: startOpacity,
      x: offset.x,
      y: offset.y,
      filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: childTransition,
    },
  };

  const normalizedAccent = accentEnabled && accentText?.trim() ? accentText.trim().toLowerCase() : '';

  function renderStyledText(content: string) {
    if (!accentEnabled || !normalizedAccent) {
      return content;
    }
    const lower = content.toLowerCase();
    const pieces: React.ReactNode[] = [];
    let cursor = 0;

    while (cursor < content.length) {
      const index = lower.indexOf(normalizedAccent, cursor);
      if (index === -1) {
        pieces.push(content.slice(cursor));
        break;
      }
      if (index > cursor) {
        pieces.push(content.slice(cursor, index));
      }
      const matchedText = content.slice(index, index + normalizedAccent.length);

      pieces.push(
        <span
          key={`${index}-${matchedText}`}
          className={accentGradientClass || undefined}
          style={{
            color: accentGradientClass ? undefined : accentColor,
            fontStyle: accentStyle === 'italic' ? 'italic' : 'normal',
            textDecoration: accentStyle === 'underline' ? 'underline' : 'none',
            textDecorationThickness: accentStyle === 'underline' ? '0.08em' : undefined,
            textUnderlineOffset: accentStyle === 'underline' ? '0.12em' : undefined,
          }}
        >
          {matchedText}
        </span>
      );
      cursor = index + normalizedAccent.length;
    }
    return pieces;
  }

  // Tokenize text based on revealMode
  function getTokens() {
    if (revealMode === 'characters') {
      return Array.from(text).map((char, index) => ({
        value: char,
        key: `char-${index}`,
        type: 'character' as const,
      }));
    }
    if (revealMode === 'lines') {
      return text.split('\n').map((line, index) => ({
        value: line,
        key: `line-${index}`,
        type: 'line' as const,
      }));
    }
    // Words
    const words = text.split(/(\s+)/);
    return words.map((word, index) => ({
      value: word,
      key: `word-${index}`,
      type: /^\s+$/.test(word) ? ('space' as const) : ('word' as const),
    }));
  }

  const tokens = getTokens();

  function AnimatedToken({
    value,
    tokenType,
    index,
  }: {
    value: string;
    tokenType: 'word' | 'space' | 'character' | 'line';
    index: number;
  }) {
    if (tokenType === 'space') {
      return (
        <span key={`space-${index}`} style={{ whiteSpace: 'pre-wrap' }}>
          {value}
        </span>
      );
    }
    if (tokenType === 'character' && value === ' ') {
      return <span key={`char-space-${index}`} style={{ display: 'inline-block', width: '0.28em' }} />;
    }

    const animatedElement = (
      <motion.span
        variants={childVariants}
        style={{
          display: tokenType === 'line' ? 'block' : 'inline-block',
          willChange: 'transform, opacity, filter',
        }}
      >
        {renderStyledText(value)}
      </motion.span>
    );

    if (!maskEnabled) {
      return animatedElement;
    }

    const blurPadding = Math.min(blur, 8);
    return (
      <span
        style={{
          display: tokenType === 'line' ? 'block' : 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'bottom',
          padding: blur > 0 ? `${blurPadding}px` : 0,
          margin: blur > 0 ? `-${blurPadding}px` : 0,
        }}
      >
        {animatedElement}
      </span>
    );
  }

  const rootStyle: React.CSSProperties = {
    ...style,
    width: '100%',
    color: textColor,
    textAlign: alignment,
    lineHeight: `${lineHeight}`,
    letterSpacing: `${letterSpacing}em`,
  };

  return (
    <motion.div
      ref={rootRef}
      className={className}
      style={rootStyle}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {tokens.map((token, index) => (
        <AnimatedToken key={token.key} value={token.value} tokenType={token.type} index={index} />
      ))}
    </motion.div>
  );
};

export default CinematicTextReveal;
