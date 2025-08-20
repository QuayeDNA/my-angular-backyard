import { Component, ChangeDetectionStrategy, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buttonPress, slideTransition } from '../../shared/animations';
import { Slide1IntroComponent } from '../slides/slide-1-intro/slide-1-intro.component';
import { Slide15OverviewComponent } from '../slides/slide-1-5-overview/slide-1-5-overview.component';
import { Slide2ConceptsComponent } from '../slides/slide-2-concepts/slide-2-concepts.component';
import { Slide3PatternsComponent } from '../slides/slide-3-patterns/slide-3-patterns.component';
import { Slide4AdvancedComponent } from '../slides/slide-4-advanced/slide-4-advanced.component';
import { Slide5PlaygroundComponent } from '../slides/slide-5-playground/slide-5-playground.component';
import { Slide6PerformanceComponent } from '../slides/slide-6-performance/slide-6-performance.component';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule, Slide1IntroComponent, Slide15OverviewComponent, Slide2ConceptsComponent, Slide3PatternsComponent, Slide4AdvancedComponent, Slide5PlaygroundComponent, Slide6PerformanceComponent],
  template: `
    <div class="presentation-container">
      <!-- Header with slide counter -->
      <header class="presentation-header">
        <h1>Angular Animations Deep Dive</h1>
        <div class="slide-counter">
          {{ currentSlideIndex() + 1 }} / {{ totalSlides }}
        </div>
      </header>

      <!-- Main slide content area -->
      <main class="slide-content" [@slideTransition]="currentSlideIndex()">
        @switch (currentSlide()) {
          @case ('intro') {
            <app-slide-1-intro />
          }
          @case ('overview') {
            <app-slide-1-5-overview />
          }
          @case ('concepts') {
            <app-slide-2-concepts />
          }
          @case ('patterns') {
            <app-slide-3-patterns />
          }
           @case ('advanced') {
            <app-slide-4-advanced />
          }
          @case ('playground') {
            <app-slide-5-playground />
          }
          @case ('performance') {
            <app-slide-6-performance />
          }
          @default {
            <div class="slide">
              <h2>Slide not found</h2>
            </div>
          }
        }
      </main>

      <!-- Navigation footer -->
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
    </div>
  `,
  styleUrl: './presentation.scss',
  animations: [slideTransition, buttonPress],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresentationComponent {
  // Slide configuration
  protected readonly slides = [
    'intro', 'overview', 'concepts', 'patterns','advanced',
    'playground', 'performance'
  ] as const;

  protected readonly totalSlides = this.slides.length;

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
    this.currentSlideIndex.update(current =>
      Math.min(current + 1, this.totalSlides - 1)
    );
  }

  protected previousSlide(): void {
    this.currentSlideIndex.update(current =>
      Math.max(current - 1, 0)
    );
  }

  protected goToSlide(index: number): void {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlideIndex.set(index);
    }
  }

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
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
    }
  }
}