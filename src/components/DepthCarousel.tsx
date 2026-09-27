import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import './DepthCarousel.css';

export interface DepthCarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  link: string;
  specBadge?: string;
  capacity?: string;
}

export interface DepthCarouselProps {
  items: DepthCarouselItem[];
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  perspective?: number;
  blur?: number;
  falloff?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export const DepthCarousel: React.FC<DepthCarouselProps> = ({
  items,
  depth = 160,
  spread = 60,
  tilt = 12,
  perspective = 1600,
  blur = 3,
  falloff = 0.15,
  autoplay = false,
  autoplaySpeed = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const navigate = useNavigate();

  const totalItems = items.length;

  const updateCardPositions = useCallback(
    (instant = false) => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Calculate cyclic offset relative to activeIndex
        let offset = index - activeIndex;
        if (offset > totalItems / 2) offset -= totalItems;
        if (offset < -totalItems / 2) offset += totalItems;

        const absOffset = Math.abs(offset);
        const isActive = offset === 0;

        // 3D positioning
        const xPos = offset * (spread * 3.8);
        const zPos = -absOffset * depth;
        const rotY = -offset * tilt;
        const cardOpacity = Math.max(0, 1 - absOffset * falloff * 2.2);
        const cardBlur = absOffset * blur;
        const cardScale = Math.max(0.8, 1 - absOffset * 0.08);

        const targetProps = {
          x: xPos,
          z: zPos,
          rotationY: rotY,
          scale: cardScale,
          opacity: cardOpacity,
          filter: `blur(${cardBlur}px)`,
          zIndex: 50 - Math.round(absOffset * 10),
          duration: instant ? 0 : 0.65,
          ease: 'power3.out',
        };

        gsap.to(card, targetProps);

        if (isActive) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });
    },
    [activeIndex, totalItems, depth, spread, tilt, blur, falloff]
  );

  useEffect(() => {
    updateCardPositions();
  }, [updateCardPositions]);

  // Autoplay handler
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, totalItems]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  // Drag / swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartXRef.current = e.clientX;
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    if (Math.abs(diff) > 10) {
      isDraggingRef.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartXRef.current !== null && isDraggingRef.current) {
      const diff = e.clientX - dragStartXRef.current;
      if (diff > 45) {
        goToPrev();
      } else if (diff < -45) {
        goToNext();
      }
    }
    dragStartXRef.current = null;
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const handleCardClick = (index: number, link: string) => {
    if (isDraggingRef.current) return;
    if (index === activeIndex) {
      navigate(link);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div
      className="depth-carousel-wrapper py-4"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={containerRef}
    >
      <div
        className="depth-carousel-stage"
        style={{ perspective: `${perspective}px` }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="depth-carousel-card"
            onClick={() => handleCardClick(index, item.link)}
          >
            <div className="depth-carousel-card-inner">
              <div className="depth-carousel-image-box">
                <img
                  src={item.image}
                  alt={item.title}
                  className="depth-carousel-image"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#1B1C1F]/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
                  {item.category}
                </div>
                {item.capacity && (
                  <div className="absolute bottom-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-sm text-[#1B1C1F] text-xs font-semibold px-2.5 py-1 rounded border border-[#DEDBD3]">
                    {item.capacity}
                  </div>
                )}
              </div>

              <div className="depth-carousel-content">
                <div>
                  <h3 className="font-display font-semibold text-lg text-[#1B1C1F] leading-snug">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs text-[#5B5F66] mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[#DEDBD3] flex items-center justify-between text-xs">
                  <span className="text-[#5B5F66] font-mono">
                    {item.specBadge || 'Standard Spec'}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#8A6A38] hover:text-[#6F5429]">
                    Engineering Specs <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="depth-carousel-controls">
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous product"
          className="depth-carousel-nav-btn"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`depth-carousel-dot ${
                i === activeIndex ? 'is-active' : ''
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next product"
          className="depth-carousel-nav-btn"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
