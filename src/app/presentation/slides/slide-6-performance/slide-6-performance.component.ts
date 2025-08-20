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
      </header>

      <!-- Main Content - Vertical Layout -->
      <main class="performance-content">
        <!-- Best Practices -->
        <section class="practices-panel" [@staggerIn]="practicesTrigger()">
          <h2>Best Practices</h2>

          <!-- Presentation Notes -->
          <div class="presentation-notes">
            <h4>📝 Presentation Notes:</h4>
            <ul>
              <li>Emphasize performance-first mindset for production apps</li>
              <li>Highlight the importance of GPU-accelerated properties</li>
              <li>Show how accessibility and performance can work together</li>
              <li>Discuss maintainable code practices for teams</li>
            </ul>
          </div>

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
                [@accessibleFade]>
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

        <!-- Angular 20 Features -->
        <section class="angular20-panel" [@staggerIn]="angular20Trigger()">
          <h2>🚀 Angular 20 Animation Features</h2>

          <!-- Presentation Notes -->
          <div class="presentation-notes">
            <h4>📝 Presentation Notes:</h4>
            <ul>
              <li>Angular 20 brings significant improvements to animation performance</li>
              <li>Signals integration makes reactive animations more intuitive</li>
              <li>Standalone components reduce bundle size and improve tree-shaking</li>
              <li>New APIs provide better TypeScript support and developer experience</li>
            </ul>
          </div>

          <div class="features-grid">
            <!-- Signals Integration -->
            <div class="feature-card">
              <div class="feature-header">
                <span class="feature-icon">📡</span>
                <h3>Signals Integration</h3>
              </div>
              <p class="feature-description">
                Native support for signals in animation parameters with automatic change detection
              </p>
            </div>

            <!-- Standalone Components -->
            <div class="feature-card">
              <div class="feature-header">
                <span class="feature-icon">🎯</span>
                <h3>Standalone Components</h3>
              </div>
              <p class="feature-description">
                Simplified imports with better tree-shaking for animation modules
              </p>
            </div>

            <!-- Enhanced Performance -->
            <div class="feature-card">
              <div class="feature-header">
                <span class="feature-icon">⚡</span>
                <h3>Enhanced Performance</h3>
              </div>
              <p class="feature-description">
                Optimized animation engine with better memory management and reduced bundle size
              </p>
            </div>

            <!-- New Animation APIs -->
            <div class="feature-card">
              <div class="feature-header">
                <span class="feature-icon">🛠️</span>
                <h3>New Animation APIs</h3>
              </div>
              <p class="feature-description">
                Improved animation builder with better TypeScript support and intellisense
              </p>
              <div class="code-example">
                <pre><code class="language-typescript" [innerHTML]="highlightedNewApisCode()"></code></pre>
              </div>
            </div>
          </div>
        </section>

        <!-- Summary & Conclusion -->
        <section class="conclusion-panel" [@staggerIn]="conclusionTrigger()">
          <h2>Key Takeaways</h2>

          <!-- Presentation Notes -->
          <div class="presentation-notes">
            <h4>📝 Presentation Notes:</h4>
            <ul>
              <li>Summarize the main performance principles covered</li>
              <li>Remind audience about mobile performance considerations</li>
              <li>Encourage testing on real devices, not just desktop</li>
              <li>Emphasize the importance of accessibility in animations</li>
              <li>Share resources for continued learning</li>
            </ul>
          </div>

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

      <!-- Footer -->
      <footer class="performance-footer">
        <!-- Keyboard shortcuts -->
        <div class="keyboard-shortcuts">
          <small>
            🎮 Shortcuts: <kbd>1-3</kbd> Categories | <kbd>4</kbd> Angular 20
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
  protected readonly angular20Trigger = signal(0);
  protected readonly conclusionTrigger = signal(0);

  // Best practices
  protected readonly activeCategory = signal<PracticeCategory>('performance');

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
      title: 'Angular 20 Signals Integration',
      category: 'performance',
      description: 'Use signals for reactive animation parameters with automatic change detection',
      code: `// Angular 20 - Signals-driven animations
@Component({
  template: \`<div [@slideAnimation]="{
    value: animationState(),
    params: { duration: duration() }
  }">Content</div>\`
})
export class SignalComponent {
  animationState = signal<'start' | 'end'>('start');
  duration = signal(300);
}`,
      impact: 'high',
      icon: '📡'
    },
    {
      title: 'Standalone Components',
      category: 'performance',
      description: 'Better tree-shaking and reduced bundle size with standalone components',
      code: `// Angular 20 - Standalone with animations
@Component({
  imports: [CommonModule],
  animations: [fadeInAnimation],
  template: \`<div [@fadeIn]>Content</div>\`
})
export class StandaloneAnimated {}

// Better tree-shaking removes unused animations`,
      impact: 'medium',
      icon: '🎯'
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
      title: 'Angular 20 Animation Builder',
      category: 'maintainability',
      description: 'Use new type-safe animation builder APIs for better maintainability',
      code: `// Angular 20 - Enhanced Animation Builder
@Injectable()
export class AnimationService {
  constructor(private builder: AnimationBuilder) {}

  createSlideAnimation(distance: number) {
    return this.builder.build([
      style({ transform: 'translateX(-{{ distance }}px)' }),
      animate('300ms ease-out', style({ transform: 'translateX(0)' }))
    ]);
  }
}`,
      impact: 'high',
      icon: '🛠️'
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
  private readonly inefficientCode = `// ❌ Inefficient Animation - Causes Layout Thrashing
const badAnimation = trigger('badSlide', [
  transition('start => end', [
    animate('800ms ease-in-out', style({
      left: '200px',           // Forces layout recalculation
      width: '300px',          // Forces layout recalculation
      height: '150px',         // Forces layout recalculation
      backgroundColor: '#f59e0b', // Forces paint
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)' // Forces paint
    }))
  ])
]);

// Every frame: Layout → Paint → Composite (EXPENSIVE!)`;

  private readonly efficientCode = `// ✅ Optimized Animation - GPU Accelerated
const goodAnimation = trigger('goodSlide', [
  transition('start => end', [
    animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
      transform: 'translateX(200px) scale(1.1)', // GPU only
      opacity: 0.9                              // GPU only
    }))
  ])
]);

// Only composite layer operations - 60fps performance!`;

  // Angular 20 specific code examples
  private readonly signalsCode = `// Angular 20: Signals Integration
@Component({
  template: \`<div [@slideAnimation]="{
    value: animationState(),
    params: { duration: animationDuration() }
  }">Content</div>\`
})
export class MyComponent {
  // Signals automatically trigger change detection
  animationState = signal<'start' | 'end'>('start');
  animationDuration = signal(300);

  // Animation reacts to signal changes automatically
  triggerAnimation() {
    this.animationState.set('end');
  }
}`;

  private readonly standaloneCode = `// Angular 20: Standalone Components with Animations
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-standalone',
  imports: [CommonModule], // Direct imports, no NgModule needed
  template: \`<div [@fadeIn]>Standalone component!</div>\`,
  animations: [fadeInAnimation]
})
export class StandaloneComponent {
  // Tree-shaking automatically removes unused animations
}

// Bootstrap with animations provider
bootstrapApplication(AppComponent, {
  providers: [provideAnimations()]
});`;

  private readonly performanceCode = `// Angular 20: Enhanced Performance Features
@Component({
  animations: [
    trigger('optimized', [
      transition('* => *', [
        // Automatic GPU layer creation
        animate('300ms ease-out', style({
          transform: 'translateX({{ x }}px)',
          opacity: '{{ opacity }}'
        }))
      ])
    ])
  ]
})
export class OptimizedComponent {
  // Signals enable more efficient change detection
  position = signal({ x: 0, opacity: 1 });

  // OnPush + Signals = Maximum Performance
  static readonly changeDetection = ChangeDetectionStrategy.OnPush;
}`;

  private readonly newApisCode = `// Angular 20: New Animation Builder APIs
import { AnimationBuilder, style, animate } from '@angular/animations';

@Injectable()
export class AnimationService {
  constructor(private builder: AnimationBuilder) {}

  // Type-safe animation building
  createSlideAnimation(distance: number, duration = 300) {
    return this.builder.build([
      style({ transform: 'translateX(-{{ distance }}px)' }),
      animate('{{ duration }}ms ease-out',
        style({ transform: 'translateX(0)' }))
    ]);
  }

  // Better TypeScript integration
  playAnimation<T extends HTMLElement>(
    element: T,
    config: AnimationConfig
  ): AnimationPlayer {
    const animation = this.createSlideAnimation(config.distance);
    return animation.create(element, {
      distance: config.distance,
      duration: config.duration
    });
  }
}`;

  // Computed highlighted code signals
  protected readonly highlightedSignalsCode = computed(() =>
    Prism.highlight(this.signalsCode, Prism.languages['typescript'], 'typescript')
  );

  protected readonly highlightedStandaloneCode = computed(() =>
    Prism.highlight(this.standaloneCode, Prism.languages['typescript'], 'typescript')
  );

  protected readonly highlightedPerformanceCode = computed(() =>
    Prism.highlight(this.performanceCode, Prism.languages['typescript'], 'typescript')
  );

  protected readonly highlightedNewApisCode = computed(() =>
    Prism.highlight(this.newApisCode, Prism.languages['typescript'], 'typescript')
  );

  // Highlighted code computed signals
  protected readonly highlightedInefficient = computed(() =>
    Prism.highlight(this.inefficientCode, Prism.languages['typescript'], 'typescript')
  );

  protected readonly highlightedEfficient = computed(() =>
    Prism.highlight(this.efficientCode, Prism.languages['typescript'], 'typescript')
  );

  ngOnInit() {
    // Staggered animation triggers for better visual flow
    setTimeout(() => this.practicesTrigger.set(1), 200);
    setTimeout(() => this.angular20Trigger.set(1), 300);
    setTimeout(() => this.conclusionTrigger.set(1), 400);
  }

  ngAfterViewInit() {
    // Highlight initial code
    this.highlightAllCode();
  }

  ngOnDestroy() {
    // Clean up any remaining timers
  }

  // Category management
  protected setActiveCategory(category: PracticeCategory): void {
    this.activeCategory.set(category);
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
      case '4': {
        // Scroll to Angular 20 features
        event.preventDefault();
        const angular20Section = this.elementRef.nativeElement.querySelector('.angular20-panel');
        if (angular20Section) {
          angular20Section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        break;
      }
    }
  }
}
