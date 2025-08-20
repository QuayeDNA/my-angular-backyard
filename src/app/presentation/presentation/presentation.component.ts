import { Component, ChangeDetectionStrategy, signal, computed, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { buttonPress } from '../../shared/animations';
import { performanceMonitor } from '../../shared/performance-monitor';
import { Slide5PlaygroundComponent } from '../slides/slide-5-playground/slide-5-playground.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Slide5PlaygroundComponent],
  template: `
    <div class="presentation-container">
      <!-- Header with slide counter -->
      <header class="presentation-header">
        <h1>Angular Animations Deep Dive</h1>
        <div class="header-controls">
          <button
            [@buttonPress]
            (click)="togglePlayground()"
            class="playground-btn">
            🎮 Playground
          </button>
          @if (showDebugInfo()) {
            <div class="performance-indicator">
              FPS: {{ currentFPS() }}
            </div>
          }
          <div class="slide-counter">
            {{ currentSlideIndex() + 1 }} / {{ totalSlides }}
          </div>
        </div>
      </header>

      <!-- Main slide content area -->
      <main class="slide-content router-outlet-container">
        @if (showPlayground()) {
          <app-slide-5-playground />
        } @else {
          <router-outlet />
        }
      </main>

      <!-- Navigation footer -->
      @if (!showPlayground()) {
        <footer class="presentation-footer">
          <button
            [@buttonPress]
            (click)="previousSlide()"
            [disabled]="currentSlideIndex() === 0"
            class="nav-btn">
            ← Previous
          </button>

          <div class="slide-indicators">
            @for (slide of slides; track $index) {
              <button
                class="indicator"
                [class.active]="$index === currentSlideIndex()"
                (click)="goToSlide($index)">
                {{ $index + 1 }}
              </button>
            }
          </div>

          <button
            [@buttonPress]
            (click)="nextSlide()"
            [disabled]="currentSlideIndex() === totalSlides - 1"
            class="nav-btn">
            Next →
          </button>
        </footer>

        <!-- Progress bar -->
        <div class="progress-bar">
          <div
            class="progress-fill"
            [style.width.%]="progressPercentage()">
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: './presentation.scss',
  animations: [buttonPress],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent implements OnInit, OnDestroy {
  constructor(private readonly router: Router) {
    // Listen to route changes to update slide index
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const urlSegments = event.url.split('/');
      const slideName = urlSegments[urlSegments.length - 1];
      const slideIndex = this.slides.findIndex(slide => slide === slideName);
      if (slideIndex !== -1) {
        this.currentSlideIndex.set(slideIndex);
      }
    });
  }

  // Slide configuration
  protected readonly slides = [
    'intro', 'overview', 'concepts', 'patterns', 'advanced', 'performance'
  ] as const;

  protected readonly totalSlides = this.slides.length;

  // Playground state
  protected readonly showPlayground = signal(false);

  // Debug state
  protected readonly showDebugInfo = signal(false);
  protected readonly currentFPS = signal(60);

  // Current slide state
  protected readonly currentSlideIndex = signal(0);

  // Computed values
  protected readonly currentSlide = computed(() =>
    this.slides[this.currentSlideIndex()]
  );

  protected readonly progressPercentage = computed(() =>
    ((this.currentSlideIndex() + 1) / this.totalSlides) * 100
  );

  // Navigation methods
  protected nextSlide(): void {
    const nextIndex = Math.min(this.currentSlideIndex() + 1, this.totalSlides - 1);
    this.navigateToSlide(nextIndex);
  }

  protected previousSlide(): void {
    const prevIndex = Math.max(this.currentSlideIndex() - 1, 0);
    this.navigateToSlide(prevIndex);
  }

  protected goToSlide(index: number): void {
    if (index >= 0 && index < this.totalSlides) {
      this.navigateToSlide(index);
    }
  }

  private navigateToSlide(index: number): void {
    const slideName = this.slides[index];
    this.router.navigate(['/presentation', slideName]);
  }

  // Playground methods
  protected togglePlayground(): void {
    this.showPlayground.update(show => !show);
  }

  // Lifecycle hooks
  ngOnInit(): void {
    // Start performance monitoring
    performanceMonitor.startMonitoring();

    // Update FPS counter every second
    setInterval(() => {
      this.currentFPS.set(performanceMonitor.getCurrentFPS());
    }, 1000);

    // Set initial slide index based on current route
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');
    const slideName = urlSegments[urlSegments.length - 1];
    const slideIndex = this.slides.findIndex(slide => slide === slideName);
    if (slideIndex !== -1) {
      this.currentSlideIndex.set(slideIndex);
    }
  }

  ngOnDestroy(): void {
    // Stop performance monitoring
    performanceMonitor.stopMonitoring();
  }

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    // Don't handle keyboard shortcuts when playground is open
    if (this.showPlayground()) {
      // Allow Escape to close playground
      if (event.key === 'Escape') {
        event.preventDefault();
        this.showPlayground.set(false);
      }
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case ' ': // Spacebar
        event.preventDefault();
        this.nextSlide();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.totalSlides - 1);
        break;
      case 'd':
      case 'D':
        event.preventDefault();
        this.showDebugInfo.update(show => !show);
        break;
    }
  }
}
