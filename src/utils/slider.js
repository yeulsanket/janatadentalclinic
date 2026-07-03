/**
 * ═══════════════════════════════════════════════════════════════════
 *  JANATA DENTAL CLINICAL SUITE - SLIDER JS CORE ENGINE
 *  Advanced Carousel Controller with Touch Swipe, Auto-Rotation,
 *  Responsive Snap Points, and Live Progress Tracking.
 * ═══════════════════════════════════════════════════════════════════
 */

export class SliderEngine {
  constructor(options = {}) {
    this.totalItems = options.totalItems || 0;
    this.itemsToShow = options.itemsToShow || 3;
    this.intervalTime = options.interval || 2500;
    this.gap = options.gap || 24;
    this.onUpdate = options.onUpdate || (() => {});
    this.onProgress = options.onProgress || (() => {});

    this.currentIndex = 0;
    this.progress = 0;
    this.isAutoPlay = options.autoPlay !== undefined ? options.autoPlay : true;
    this.isPaused = false;
    this.timer = null;
    this.tickInterval = 50; // ms
  }

  getMaxIndex() {
    return Math.max(0, this.totalItems - this.itemsToShow);
  }

  setItemsToShow(num) {
    this.itemsToShow = num;
    const maxIdx = this.getMaxIndex();
    if (this.currentIndex > maxIdx) {
      this.currentIndex = maxIdx;
      this.onUpdate(this.currentIndex);
    }
  }

  next() {
    const maxIdx = this.getMaxIndex();
    this.currentIndex = this.currentIndex >= maxIdx ? 0 : this.currentIndex + 1;
    this.progress = 0;
    this.onUpdate(this.currentIndex);
    this.onProgress(0);
  }

  prev() {
    const maxIdx = this.getMaxIndex();
    this.currentIndex = this.currentIndex <= 0 ? maxIdx : this.currentIndex - 1;
    this.progress = 0;
    this.onUpdate(this.currentIndex);
    this.onProgress(0);
  }

  goTo(index) {
    const maxIdx = this.getMaxIndex();
    this.currentIndex = Math.max(0, Math.min(index, maxIdx));
    this.progress = 0;
    this.onUpdate(this.currentIndex);
    this.onProgress(0);
  }

  toggleAutoPlay() {
    this.isAutoPlay = !this.isAutoPlay;
    if (this.isAutoPlay) {
      this.start();
    } else {
      this.stop();
    }
    return this.isAutoPlay;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  start() {
    this.stop();
    if (!this.isAutoPlay) return;

    const step = (this.tickInterval / this.intervalTime) * 100;

    this.timer = setInterval(() => {
      if (this.isPaused) return;

      this.progress += step;
      if (this.progress >= 100) {
        this.next();
      } else {
        this.onProgress(this.progress);
      }
    }, this.tickInterval);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  getTransform() {
    return `translateX(calc(-${this.currentIndex} * (100% + ${this.gap}px) / ${this.itemsToShow}))`;
  }
}

/**
 * Utility function to calculate items to show based on window width
 */
export function getResponsiveItemsToShow(width, breakpoints = { mobile: 640, tablet: 992 }) {
  if (width < breakpoints.mobile) return 1;
  if (width < breakpoints.tablet) return 2;
  return 3;
}

/**
 * Utility gesture recognizer for touch/mouse swipes
 */
export function handleSwipeGesture(startX, endX, minThreshold = 40) {
  if (startX === null || endX === null) return null;
  const diff = startX - endX;
  if (Math.abs(diff) > minThreshold) {
    return diff > 0 ? 'next' : 'prev';
  }
  return null;
}
