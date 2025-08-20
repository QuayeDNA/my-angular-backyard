// Performance monitoring utility for the presentation
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private isMonitoring = false;
  private animationFrameId?: number;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.measureFPS();
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  getCurrentFPS(): number {
    return Math.round(this.fps);
  }

  private measureFPS(): void {
    const currentTime = performance.now();
    this.frameCount++;

    // Calculate FPS every second
    if (currentTime - this.lastTime >= 1000) {
      this.fps = (this.frameCount * 1000) / (currentTime - this.lastTime);
      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    if (this.isMonitoring) {
      this.animationFrameId = requestAnimationFrame(() => this.measureFPS());
    }
  }

  // Memory usage monitoring
  getMemoryUsage(): any | null {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }

  // Animation performance helpers
  static optimizeForAnimation(element: HTMLElement): void {
    element.style.willChange = 'transform, opacity';
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
  }

  static resetOptimization(element: HTMLElement): void {
    element.style.willChange = 'auto';
  }

  // Log performance metrics
  logPerformanceMetrics(): void {
    const memory = this.getMemoryUsage();
    console.log(`🚀 Performance Metrics:
    - FPS: ${this.getCurrentFPS()}
    - Memory Used: ${memory ? Math.round(memory.usedJSHeapSize / 1048576) + 'MB' : 'N/A'}
    - Memory Limit: ${memory ? Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB' : 'N/A'}
    `);
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance();
