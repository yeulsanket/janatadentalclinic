import { useState, useEffect, useRef } from 'react';
import { SliderEngine, getResponsiveItemsToShow, handleSwipeGesture } from '../utils/slider';

/**
 * Custom React Hook for powering luxury carousels & sliders using the core SliderEngine.
 */
export function useSlider({ totalItems = 0, interval = 2500, autoPlay = true, gap = 24 } = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [responsiveGap, setResponsiveGap] = useState(gap);
  const [progress, setProgress] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const touchEndX = useRef(null);
  const touchEndY = useRef(null);

  // Responsive Breakpoints & Gap Alignment
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsToShow(getResponsiveItemsToShow(width));
      setResponsiveGap(width <= 768 ? 16 : gap);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gap]);

  const maxIndex = Math.max(0, totalItems - itemsToShow);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsToShow, maxIndex, currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setProgress(0);
  };

  const goToSlide = (idx) => {
    setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)));
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay((prev) => !prev);
  };

  // Automatic Rotation Interval & Progress
  useEffect(() => {
    if (!isAutoPlay || isHovered || totalItems <= itemsToShow) return;

    const tick = 50;
    const step = (tick / interval) * 100;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress + step >= 100) {
          nextSlide();
          return 0;
        }
        return prevProgress + step;
      });
    }, tick);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, totalItems, itemsToShow, interval, currentIndex, maxIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    setIsHovered(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diffX = touchStartX.current - touchEndX.current;
      const diffY = touchStartY.current !== null && touchEndY.current !== null 
        ? Math.abs(touchStartY.current - touchEndY.current) 
        : 0;

      // Only swipe horizontally if X movement exceeds 35px AND is greater than Y scroll movement
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > diffY) {
        if (diffX > 0) nextSlide();
        else prevSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
    setIsHovered(false);
  };

  return {
    currentIndex,
    itemsToShow,
    maxIndex,
    progress,
    isAutoPlay,
    isHovered,
    setIsHovered,
    prevSlide,
    nextSlide,
    goToSlide,
    toggleAutoPlay,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    trackTransform: `translateX(calc(-${currentIndex} * (100% + ${responsiveGap}px) / ${itemsToShow}))`
  };
}
