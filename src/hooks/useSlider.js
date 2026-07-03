import { useState, useEffect, useRef } from 'react';
import { SliderEngine, getResponsiveItemsToShow, handleSwipeGesture } from '../utils/slider';

/**
 * Custom React Hook for powering luxury carousels & sliders using the core SliderEngine.
 */
export function useSlider({ totalItems = 0, interval = 2500, autoPlay = true, gap = 24 } = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [progress, setProgress] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Responsive Breakpoints
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getResponsiveItemsToShow(window.innerWidth));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      setProgress((prevProg) => {
        if (prevProg + step >= 100) {
          setCurrentIndex((prevIdx) => (prevIdx >= maxIndex ? 0 : prevIdx + 1));
          return 0;
        }
        return prevProg + step;
      });
    }, tick);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, maxIndex, interval, totalItems, itemsToShow]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const direction = handleSwipeGesture(touchStartX.current, touchEndX.current);
    if (direction === 'next') nextSlide();
    if (direction === 'prev') prevSlide();

    touchStartX.current = null;
    touchEndX.current = null;
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
    trackTransform: `translateX(calc(-${currentIndex} * (100% + ${gap}px) / ${itemsToShow}))`
  };
}
