import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
  computed,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fadeInUp, buttonPress, staggerIn } from '../../../shared/animations';
import {
  trigger,
  style,
  transition,
  animate,
} from '@angular/animations';

// Import PrismJS for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

// Accessibility-aware animations
const accessibleFade = trigger('accessibleFade', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('{{duration}}ms {{easing}}', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ], {
    params: {
      duration: 300,
      easing: 'ease-out'
    }
  })
]);

type PracticeCategory = 'performance' | 'accessibility' | 'maintainability';
type ImpactLevel = 'high' | 'medium' | 'low';

interface BestPractice {
  title: string;
  category: PracticeCategory;
  description: string;
  code: string;
  impact: ImpactLevel;
  icon: string;
}

@Component({
  selector: 'app-slide-6-performance',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="slide-performance" [@fadeInUp]>
      <!-- Header -->
      <header class="slide-header">
        <h1>Performance & Best Practices</h1>
        <p class="slide-subtitle">
          Production-ready animations with accessibility and optimization in mind
        </p>

        <!-- Accessibility Toggle -->
        <div class="accessibility-controls">
          <label class="toggle-switch">
            <input
              type="checkbox"
              [(ngModel)]="respectsReducedMotion"
              (change)="toggleReducedMotion()">
            <span class="toggle-slider"></span>
            <span class="toggle-label">Respect prefers-reduced-motion</span>
          </label>
        </div>
      </header>

      <!-- Main Content Grid -->
      <main class="performance-grid">
        <!-- Best Practices -->
        <section class="practices-panel" [@staggerIn]="practicesTrigger()">
          <h2>Best Practices</h2>

          <!-- Category Tabs -->
          <div class="category-tabs">
            <button
              class="tab-btn"
              [class.active]="activeCategory() === 'performance'"
              [@buttonPress]
              (click)="setActiveCategory('performance')">
              ⚡ Performance
            </button>
            <button
              class="tab-btn"
              [class.active]="activeCategory() === 'accessibility'"
              [@buttonPress]
              (click)="setActiveCategory('accessibility')">
              ♿ Accessibility
            </button>
            <button
              class="tab-btn"
              [class.active]="activeCategory() === 'maintainability'"
              [@buttonPress]
              (click)="setActiveCategory('maintainability')">
              🔧 Maintainability
            </button>
          </div>

          <!-- Best Practices List -->
          <div class="practices-list">
            @for (practice of filteredPractices(); track practice.title) {
              <div
                class="practice-card"
                [@accessibleFade]="{
                  value: '',
                  params: animationParams()
                }">
                <div class="practice-header">
                  <div class="practice-icon">{{ practice.icon }}</div>
                  <div class="practice-info">
                    <h3>{{ practice.title }}</h3>
                    <div class="practice-meta">
                      <span class="impact impact-{{ practice.impact }}">
                        {{ practice.impact }} impact
                      </span>
                    </div>
                  </div>
                </div>
                <p class="practice-description">{{ practice.description }}</p>
                <div class="practice-code">
                  <pre><code [innerHTML]="highlightCode(practice.code)"></code></pre>
                </div>
              </div>
            }
          </div>
        </section>

        <!-- Optimization Examples -->
        <section class="optimization-panel" [@staggerIn]="optimizationTrigger()">
          <h2>Before & After Optimization</h2>

          <div class="comparison-container">
            <!-- Before -->
            <div class="comparison-side">
              <h3>❌ Before (Inefficient)</h3>
              <div class="demo-area before-demo">
                <div
                  class="animation-element inefficient"
                  [class.animating]="isShowingInefficient()"
                  (click)="toggleInefficientDemo()">
                  Inefficient Animation
                </div>
              </div>
              <div class="code-example">
                <pre><code class="language-typescript" [innerHTML]="highlightedInefficient()"></code></pre>
              </div>
              <div class="performance-impact negative">
                <span>🐌 Performance Impact:</span>
                <ul>
                  <li>Forces layout recalculation</li>
                  <li>Blocks main thread</li>
                  <li>Poor mobile performance</li>
                </ul>
              </div>
            </div>

            <!-- After -->
            <div class="comparison-side">
              <h3>✅ After (Optimized)</h3>
              <div class="demo-area after-demo">
                <div
                  class="animation-element efficient"
                  [class.animating]="isShowingEfficient()"
                  (click)="toggleEfficientDemo()">
                  Optimized Animation
                </div>
              </div>
              <div class="code-example">
                <pre><code class="language-typescript" [innerHTML]="highlightedEfficient()"></code></pre>
              </div>
              <div class="performance-impact positive">
                <span>🚀 Performance Benefits:</span>
                <ul>
                  <li>GPU-accelerated transforms</li>
                  <li>60fps smooth animations</li>
                  <li>Excellent mobile performance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Summary & Conclusion -->
        <section class="conclusion-panel" [@staggerIn]="conclusionTrigger()">
          <h2>Key Takeaways</h2>

          <div class="takeaways-grid">
            <div class="takeaway-card">
              <div class="takeaway-icon">🎯</div>
              <h3>Performance First</h3>
              <p>Use transform and opacity for animations. Avoid animating layout properties.</p>
            </div>

            <div class="takeaway-card">
              <div class="takeaway-icon">♿</div>
              <h3>Accessibility Matters</h3>
              <p>Respect user preferences and provide meaningful motion alternatives.</p>
            </div>

            <div class="takeaway-card">
              <div class="takeaway-icon">🔧</div>
              <h3>Maintainable Code</h3>
              <p>Create reusable animation utilities and document performance considerations.</p>
            </div>

            <div class="takeaway-card">
              <div class="takeaway-icon">📱</div>
              <h3>Mobile Ready</h3>
              <p>Test on real devices and optimize for battery life and performance.</p>
            </div>
          </div>

          <!-- Final Resources -->
          <div class="resources-section">
            <h3>📚 Additional Resources</h3>
            <div class="resources-list">
              <a href="https://angular.dev/guide/animations" target="_blank" class="resource-link">
                Angular Animations Guide
              </a>
              <a href="https://web.dev/animations/" target="_blank" class="resource-link">
                Web.dev Animation Best Practices
              </a>
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations" target="_blank" class="resource-link">
                MDN CSS Animations
              </a>
            </div>
          </div>

          <!-- Thank You -->
          <div class="thank-you">
            <h2>🎉 Thank You!</h2>
            <p>Questions & Discussion</p>
            <div class="contact-info">
              <span>Slides available at: github.com/your-repo</span>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer with Performance Tips -->
      <footer class="performance-footer">
        @if (showPerformanceTips()) {
          <div class="performance-tips" [@accessibleFade]="{value: '', params: animationParams()}">
            <h4>💡 Pro Tips:</h4>
            <ul>
              <li>Use <code>will-change</code> sparingly and remove after animation</li>
              <li>Prefer <code>transform3d()</code> over <code>transform()</code> for GPU acceleration</li>
              <li>Monitor performance with Chrome DevTools Animation tab</li>
              <li>Consider using Web Animations API for complex sequences</li>
            </ul>
          </div>
        }

        <!-- Keyboard shortcuts -->
        <div class="keyboard-shortcuts">
          <small>
            🎮 Shortcuts: <kbd>T</kbd> Tips | <kbd>A</kbd> Accessibility | <kbd>1-3</kbd> Categories
          </small>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './slide-6-performance.component.scss',
  animations: [
    fadeInUp,
    buttonPress,
    staggerIn,
    accessibleFade
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slide6PerformanceComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private readonly elementRef: ElementRef) {
    // Remove the problematic effect that causes infinite loops
  }

  // Stagger animation triggers
  protected readonly practicesTrigger = signal(0);
  protected readonly optimizationTrigger = signal(0);
  protected readonly conclusionTrigger = signal(0);

  // Accessibility controls
  protected readonly respectsReducedMotion = signal(false);
  protected readonly showPerformanceTips = signal(false);

  // Best practices
  protected readonly activeCategory = signal<PracticeCategory>('performance');

  // Demo states
  protected readonly isShowingInefficient = signal(false);
  protected readonly isShowingEfficient = signal(false);

  // Animation parameters based on accessibility preference
  protected readonly animationParams = computed(() => ({
    duration: this.respectsReducedMotion() ? 0 : 300,
    easing: this.respectsReducedMotion() ? 'linear' : 'ease-out'
  }));

  // Best practices data
  private readonly allPractices: BestPractice[] = [
    // Performance practices
    {
      title: 'Use Transform & Opacity',
      category: 'performance',
      description: 'Animate only GPU-accelerated properties for 60fps performance',
      code: `// ✅ Good - GPU accelerated
animate('300ms ease-out', style({
  transform: 'translateX(100px) scale(1.1)',
  opacity: 0.8
}))

// ❌ Avoid - Forces layout
animate('300ms ease-out', style({
  left: '100px',
  width: '200px',
  height: '150px'
}))`,
      impact: 'high',
      icon: '⚡'
    },
    {
      title: 'Minimize Repaints',
      category: 'performance',
      description: 'Avoid animating properties that trigger paint or layout',
      code: `// ✅ Composite layer only
.element {
  will-change: transform;
  transform: translateZ(0); /* Create layer */
}

// Animation only affects composite
@keyframes slide {
  to { transform: translateX(100px); }
}`,
      impact: 'high',
      icon: '🎨'
    },
    {
      title: 'Use will-change Sparingly',
      category: 'performance',
      description: 'Apply will-change before animation, remove after',
      code: `// ✅ Proper will-change usage
animationStart() {
  this.element.style.willChange = 'transform';
}

animationEnd() {
  this.element.style.willChange = 'auto';
}`,
      impact: 'medium',
      icon: '🔧'
    },

    // Accessibility practices
    {
      title: 'Respect Reduced Motion',
      category: 'accessibility',
      description: 'Provide alternatives for users who prefer reduced motion',
      code: `@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}

// In Angular
const duration = this.prefersReducedMotion ? 0 : 300;`,
      impact: 'high',
      icon: '♿'
    },
    {
      title: 'Meaningful Motion',
      category: 'accessibility',
      description: 'Ensure animations serve a purpose and aid understanding',
      code: `// ✅ Meaningful - shows relationship
const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('300ms ease-out', style({ transform: 'translateX(0)' }))
  ])
]);`,
      impact: 'medium',
      icon: '🎯'
    },
    {
      title: 'Focus Management',
      category: 'accessibility',
      description: 'Manage focus during animations for screen readers',
      code: `// Handle focus after animation
(@slideComplete)="onSlideComplete()"

onSlideComplete() {
  this.focusTarget.nativeElement.focus();
}`,
      impact: 'medium',
      icon: '🔍'
    },

    // Maintainability practices
    {
      title: 'Reusable Animation Utils',
      category: 'maintainability',
      description: 'Create centralized animation utilities',
      code: `// animations.ts
export const slideIn = (direction: 'left' | 'right' | 'up' | 'down') =>
  trigger('slideIn', [
    transition(':enter', [
      style({ transform: getTransform(direction) }),
      animate('300ms ease-out', style({ transform: 'none' }))
    ])
  ]);`,
      impact: 'high',
      icon: '🔄'
    },
    {
      title: 'Animation States as Enums',
      category: 'maintainability',
      description: 'Use enums for animation states to avoid magic strings',
      code: `enum AnimationState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Usage
this.animationState.set(AnimationState.LOADING);`,
      impact: 'medium',
      icon: '📝'
    },
    {
      title: 'Performance Documentation',
      category: 'maintainability',
      description: 'Document performance considerations in complex animations',
      code: `/**
 * Slide animation with performance optimizations
 * - Uses transform only (GPU accelerated)
 * - Duration kept under 300ms for responsiveness
 * - Respects prefers-reduced-motion
 * @performance Critical - used in navigation
 */
export const slideAnimation = trigger('slide', [
  // ... animation definition
]);`,
      impact: 'low',
      icon: '📚'
    }
  ];

  // Computed filtered practices
  protected readonly filteredPractices = computed(() =>
    this.allPractices.filter(practice => practice.category === this.activeCategory())
  );

  // Code examples for optimization comparison
  private readonly inefficientCode = `// ❌ Inefficient Animation
const badAnimation = trigger('badSlide', [
  transition('* => *', [
    animate('500ms', style({
      left: '{{ position }}px',      // Forces layout
      width: '{{ width }}px',        // Forces layout
      backgroundColor: '{{ color }}', // Forces paint
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)' // Forces paint
    }))
  ])
]);

// This triggers layout recalculation on every frame!`;

  private readonly efficientCode = `// ✅ Optimized Animation
const goodAnimation = trigger('goodSlide', [
  transition('* => *', [
    animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
      transform: 'translateX({{ position }}px) scale({{ scale }})', // GPU only
      opacity: '{{ opacity }}'  // GPU only
    }))
  ])
]);

// Composite layer only - 60fps performance!`;

  // Highlighted code computed signals
  protected readonly highlightedInefficient = computed(() =>
    Prism.highlight(this.inefficientCode, Prism.languages['typescript'], 'typescript')
  );

  protected readonly highlightedEfficient = computed(() =>
    Prism.highlight(this.efficientCode, Prism.languages['typescript'], 'typescript')
  );

  ngOnInit() {
    // Reduced stagger timing to improve responsiveness
    setTimeout(() => this.practicesTrigger.set(1), 200);
    setTimeout(() => this.optimizationTrigger.set(1), 300);
    setTimeout(() => this.conclusionTrigger.set(1), 400);

    // Check for user's motion preferences
    this.checkMotionPreferences();
  }

  ngAfterViewInit() {
    // Highlight initial code
    this.highlightAllCode();
  }

  ngOnDestroy() {
    // Clean up any remaining timers
  }

  // Accessibility methods
  protected toggleReducedMotion(): void {
    // This would typically be handled by CSS media queries
    // but we're demonstrating the concept
    if (this.respectsReducedMotion()) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }

  private checkMotionPreferences(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.respectsReducedMotion.set(prefersReducedMotion.matches);

      prefersReducedMotion.addEventListener('change', (e) => {
        this.respectsReducedMotion.set(e.matches);
      });
    }
  }

  // Category management
  protected setActiveCategory(category: PracticeCategory): void {
    this.activeCategory.set(category);
  }

  // Demo toggles
  protected toggleInefficientDemo(): void {
    this.isShowingInefficient.update(showing => !showing);
  }

  protected toggleEfficientDemo(): void {
    this.isShowingEfficient.update(showing => !showing);
  }

  // Code highlighting - optimized to run only once
  protected highlightCode(code: string): string {
    try {
      return Prism.highlight(code, Prism.languages['typescript'], 'typescript');
    } catch (error) {
      console.warn('Syntax highlighting failed:', error);
      return code; // Fallback to plain text
    }
  }

  private highlightAllCode(): void {
    // Only highlight once after view init, not on every change
    setTimeout(() => {
      try {
        Prism.highlightAllUnder(this.elementRef.nativeElement);
      } catch (error) {
        console.warn('Code highlighting failed:', error);
      }
    }, 100);
  }

  // Keyboard shortcuts for presenting
  @HostListener('window:keydown', ['$event'])
  handlePresenterShortcuts(event: KeyboardEvent): void {
    // Prevent shortcuts when user is typing in inputs
    if (event.target && (event.target as HTMLElement).tagName.toLowerCase() === 'input') {
      return;
    }

    switch (event.key.toLowerCase()) {
      case 't': // Toggle tips
        event.preventDefault();
        this.showPerformanceTips.update(show => !show);
        break;
      case 'a': // Toggle accessibility
        event.preventDefault();
        this.respectsReducedMotion.update(reduced => !reduced);
        this.toggleReducedMotion();
        break;
      case '1': // Performance category
        event.preventDefault();
        this.setActiveCategory('performance');
        break;
      case '2': // Accessibility category
        event.preventDefault();
        this.setActiveCategory('accessibility');
        break;
      case '3': // Maintainability category
        event.preventDefault();
        this.setActiveCategory('maintainability');
        break;
    }
  }
}
