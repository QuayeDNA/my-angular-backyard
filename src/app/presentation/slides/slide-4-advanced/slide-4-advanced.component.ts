import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInUp, buttonPress, staggerIn } from '../../../shared/animations';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  animateChild,
  keyframes,
} from '@angular/animations';

// Import PrismJS for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

// Advanced keyframes animation
const keyframeDemo = trigger('keyframeDemo', [
  transition('* => bounce', [
    animate(
      '1000ms ease-in-out',
      keyframes([
        style({ transform: 'translateY(0) scale(1)', offset: 0 }),
        style({ transform: 'translateY(-30px) scale(1.1)', offset: 0.3 }),
        style({ transform: 'translateY(0) scale(1)', offset: 0.6 }),
        style({ transform: 'translateY(-15px) scale(1.05)', offset: 0.8 }),
        style({ transform: 'translateY(0) scale(1)', offset: 1 }),
      ])
    ),
  ]),
  transition('* => pulse', [
    animate(
      '800ms ease-in-out',
      keyframes([
        style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
        style({ transform: 'scale(1.2)', opacity: 0.8, offset: 0.5 }),
        style({ transform: 'scale(1)', opacity: 1, offset: 1 }),
      ])
    ),
  ]),
  transition('* => rotate', [
    animate(
      '1200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      keyframes([
        style({ transform: 'rotate(0deg) scale(1)', offset: 0 }),
        style({ transform: 'rotate(180deg) scale(1.2)', offset: 0.5 }),
        style({ transform: 'rotate(360deg) scale(1)', offset: 1 }),
      ])
    ),
  ]),
]);

// Parent-child animation coordination
const parentAnimation = trigger('parentAnimation', [
  transition('* => active', [
    query('@childAnimation', animateChild(), { optional: true }),
    animate(
      '500ms ease-out',
      style({ backgroundColor: 'rgba(102, 126, 234, 0.2)' })
    ),
  ]),
]);

const childAnimation = trigger('childAnimation', [
  transition('* => active', [
    animate('300ms ease-out', style({ transform: 'scale(1.1)', opacity: 0.9 })),
  ]),
]);

// Performance optimized animation
const performanceDemo = trigger('performanceDemo', [
  state('start', style({ transform: 'translateX(0)' })),
  state('end', style({ transform: 'translateX(300px)' })),
  transition('start => end', [animate('{{ duration }}ms {{ easing }}')], {
    params: { duration: 500, easing: 'ease-out' },
  }),
  transition('end => start', [animate('{{ duration }}ms {{ easing }}')], {
    params: { duration: 300, easing: 'ease-in' },
  }),
]);

// Dynamic animation with multiple states
const dynamicStates = trigger('dynamicStates', [
  state(
    'idle',
    style({
      transform: 'scale(1) rotate(0deg)',
      backgroundColor: '#667eea',
      borderRadius: '8px',
    })
  ),
  state(
    'hover',
    style({
      transform: 'scale(1.1) rotate(5deg)',
      backgroundColor: '#f093fb',
      borderRadius: '50%',
    })
  ),
  state(
    'active',
    style({
      transform: 'scale(1.3) rotate(15deg)',
      backgroundColor: '#fbbf24',
      borderRadius: '20px',
    })
  ),
  state(
    'loading',
    style({
      transform: 'scale(0.9) rotate(360deg)',
      backgroundColor: '#10b981',
      borderRadius: '4px',
    })
  ),
  transition('* => *', [animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')]),
]);

// Enhanced tooltips animation
const tooltipFade = trigger('tooltipFade', [
  state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
  transition(':enter', [
    animate(
      '200ms ease-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '150ms ease-in',
      style({ opacity: 0, transform: 'translateY(10px)' })
    ),
  ]),
]);

@Component({
  selector: 'app-slide-4-advanced',
  imports: [CommonModule],
  template: `
      <div class="slide-advanced" [@fadeInUp]>
        <!-- Header -->
        <header class="slide-header">
          <h1>Advanced Animation Features</h1>
          <p class="slide-subtitle">
            Professional techniques for complex animations and performance
            optimization
          </p>

          <!-- Presentation Progress -->
          <div class="presentation-progress">
            <div class="progress-steps">
              <div class="step" [class.completed]="featuresExplored().keyframes">
                <span class="step-icon">🎭</span>
                <span>Keyframes</span>
              </div>
              <div
                class="step"
                [class.completed]="featuresExplored().coordination"
              >
                <span class="step-icon">🔗</span>
                <span>Coordination</span>
              </div>
              <div
                class="step"
                [class.completed]="featuresExplored().performance"
              >
                <span class="step-icon">⚡</span>
                <span>Performance</span>
              </div>
              <div class="step" [class.completed]="featuresExplored().dynamic">
                <span class="step-icon">🎛️</span>
                <span>Dynamic</span>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Grid -->
        <main class="features-grid">
          <!-- Keyframes Animations -->
          <section class="feature-card" [@staggerIn]="featuresTrigger()">
            <div class="feature-header">
              <span class="feature-icon">🎭</span>
              <h2>Keyframe Animations</h2>
            </div>
            <div class="feature-content">
              <p>
                Create complex multi-step animations with precise control over
                timing
              </p>
              <div class="code-example">
                <pre><code>animate('1000ms ease-in-out', keyframes([
    style({{ '{' }} transform: 'translateY(0) scale(1)', offset: 0 {{ '}' }}),
    style({{ '{' }} transform: 'translateY(-30px) scale(1.1)', offset: 0.3 {{ '}' }}),
    style({{ '{' }} transform: 'translateY(0) scale(1)', offset: 0.6 {{ '}' }}),
    style({{ '{' }} transform: 'translateY(-15px) scale(1.05)', offset: 0.8 {{ '}' }}),
    style({{ '{' }} transform: 'translateY(0) scale(1)', offset: 1 {{ '}' }})
  ]))</code></pre>
              </div>
              <div class="feature-demo">
                <div class="keyframes-demo">
                  <div class="animation-controls">
                    <button
                      class="demo-btn"
                      [@buttonPress]
                      (click)="triggerKeyframeAnimation('bounce')"
                    >
                      Bounce
                    </button>
                    <button
                      class="demo-btn"
                      [@buttonPress]
                      (click)="triggerKeyframeAnimation('pulse')"
                    >
                      Pulse
                    </button>
                    <button
                      class="demo-btn"
                      [@buttonPress]
                      (click)="triggerKeyframeAnimation('rotate')"
                    >
                      Rotate
                    </button>
                  </div>
                  <div class="animation-target">
                    <div
                      class="keyframe-element"
                      [@keyframeDemo]="keyframeState()"
                    >
                      🎯
                    </div>
                  </div>
                </div>

                @if (showPresenterNotes()) {
                  <div class="presenter-notes" [@tooltipFade]>
                    <h4>💡 Presentation Tips:</h4>
                    <ul>
                      <li>Demonstrate different keyframe patterns (Key: 1)</li>
                      <li>Explain offset values (0-1 timeline)</li>
                      <li>Show how to create complex organic movements</li>
                      <li>Perfect for attention-grabbing animations</li>
                    </ul>
                  </div>
                }
              </div>
            </div>
          </section>

          <!-- Animation Coordination -->
          <section class="feature-card" [@staggerIn]="featuresTrigger()">
            <div class="feature-header">
              <span class="feature-icon">🔗</span>
              <h2>Animation Coordination</h2>
            </div>
            <div class="feature-content">
              <p>
                Orchestrate parent and child animations for cohesive experiences
              </p>
              <div class="code-example">
                <pre><code>const parentAnimation = trigger('parentAnimation', [
    transition('* => active', [
      query('@childAnimation', animateChild(), {{ '{' }} optional: true {{ '}' }}),
      animate('500ms ease-out',
        style({{ '{' }} backgroundColor: 'rgba(102, 126, 234, 0.2)' {{ '}' }}))
    ])
  ]);</code></pre>
              </div>
              <div class="feature-demo">
                <div class="coordination-demo">
                  <button
                    class="demo-btn"
                    [@buttonPress]
                    (click)="triggerCoordinatedAnimation()"
                  >
                    Trigger Coordination
                  </button>
                  <div
                    class="parent-container"
                    [@parentAnimation]="coordinationState()"
                  >
                    <h3>Parent Component</h3>
                    <div class="children-grid">
                      @for (child of childElements(); track child.id) {
                        <div
                          class="child-element"
                          [@childAnimation]="coordinationState()"
                        >
                          {{ child.icon }}
                        </div>
                      }
                    </div>
                  </div>
                </div>

                @if (showPresenterNotes()) {
                  <div class="presenter-notes" [@tooltipFade]>
                    <h4>💡 Presentation Tips:</h4>
                    <ul>
                      <li>Show parent-child animation sync (Key: 2)</li>
                      <li>Explain animateChild() usage</li>
                      <li>Demonstrate query() for targeting children</li>
                      <li>Great for complex UI state changes</li>
                    </ul>
                  </div>
                }
              </div>
            </div>
          </section>

          <!-- Performance Optimization -->
          <section class="feature-card" [@staggerIn]="featuresTrigger()">
            <div class="feature-header">
              <span class="feature-icon">⚡</span>
              <h2>Performance Optimization</h2>
            </div>
            <div class="feature-content">
              <p>
                Techniques for smooth, efficient animations that don't block the UI
              </p>
              <div class="code-example">
                <pre><code class="language-typescript">
  // Use transform and opacity for GPU acceleration
  transition('start => end', [
    animate('500ms ease-out')
  ], {{ '{' }} params: {{ '{' }} duration: 500, easing: 'ease-out' {{ '}' }} {{ '}' }})

  // Prefer will-change CSS property
  .animated-element &#123;
    will-change: transform, opacity;
  &#125;
                </code></pre>
              </div>
              <div class="feature-demo">
                <div class="performance-demo">
                  <div class="performance-controls">
                    <div class="control-group">
                      <label>Duration:</label>
                      <div class="duration-buttons">
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setDuration(200)"
                          [class.active]="selectedDuration() === 200"
                        >
                          200ms
                        </button>
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setDuration(500)"
                          [class.active]="selectedDuration() === 500"
                        >
                          500ms
                        </button>
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setDuration(1000)"
                          [class.active]="selectedDuration() === 1000"
                        >
                          1000ms
                        </button>
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setDuration(2000)"
                          [class.active]="selectedDuration() === 2000"
                        >
                          2000ms
                        </button>
                      </div>
                    </div>
                    <div class="control-group">
                      <label>Easing:</label>
                      <div class="easing-buttons">
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setEasing('ease')"
                          [class.active]="selectedEasing() === 'ease'"
                        >
                          Ease
                        </button>
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setEasing('ease-out')"
                          [class.active]="selectedEasing() === 'ease-out'"
                        >
                          Ease-out
                        </button>
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setEasing('ease-in')"
                          [class.active]="selectedEasing() === 'ease-in'"
                        >
                          Ease-in
                        </button>
                        <button
                          class="timing-btn"
                          [@buttonPress]
                          (click)="setEasing('cubic-bezier(0.68, -0.55, 0.265, 1.55)')"
                          [class.active]="selectedEasing() === 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'"
                        >
                          Bounce
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="performance-track">
                    <button
                      class="demo-btn"
                      [@buttonPress]
                      (click)="togglePerformanceAnimation()"
                    >
                      @if (performanceState() === 'start') {
                        Move
                      } @else {
                        Reset
                      }
                    </button>
                    <div class="track">
                      <div
                        class="performance-element"
                        [@performanceDemo]="{
                          value: performanceState(),
                          params: {
                            duration: selectedDuration(),
                            easing: selectedEasing()
                          }
                        }"
                      >
                        🚀
                      </div>
                    </div>
                    <div class="performance-info">
                      <small>
                        Duration: {{ selectedDuration() }}ms | Easing: {{ selectedEasing() }}
                      </small>
                    </div>
                  </div>
                </div>

                @if (showPresenterNotes()) {
                  <div class="presenter-notes" [@tooltipFade]>
                    <h4>💡 Presentation Tips:</h4>
                    <ul>
                      <li>Adjust timing parameters dynamically (Key: 3)</li>
                      <li>Explain GPU vs CPU animation differences</li>
                      <li>Show impact of different easing functions</li>
                      <li>Discuss 60fps targets and performance budgets</li>
                    </ul>
                  </div>
                }
              </div>
            </div>
          </section>

          <!-- Dynamic States -->
          <section class="feature-card" [@staggerIn]="featuresTrigger()">
            <div class="feature-header">
              <span class="feature-icon">🎛️</span>
              <h2>Dynamic State Management</h2>
            </div>
            <div class="feature-content">
              <p>
                Manage complex animation states based on user interaction and data
              </p>
              <div class="code-example">
                <pre><code>state('hover', style({{ '{' }}
    transform: 'scale(1.1) rotate(5deg)',
    backgroundColor: '#f093fb',
    borderRadius: '50%'
  {{ '}' }})),
  transition('* => *', [
    animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ])</code></pre>
              </div>
              <div class="feature-demo">
                <div class="dynamic-demo">
                  <div class="state-controls">
                    @for (state of availableStates; track state.name) {
                      <button
                        class="state-btn"
                        [@buttonPress]
                        (click)="setDynamicState(state.value)"
                        [class.active]="dynamicState() === state.value"
                      >
                        {{ state.name }}
                      </button>
                    }
                  </div>
                  <div class="dynamic-showcase">
                    <div
                      class="dynamic-element"
                      [@dynamicStates]="dynamicState()"
                      (mouseenter)="setDynamicState('hover')"
                      (mouseleave)="setDynamicState('idle')"
                      (click)="setDynamicState('active')"
                    >
                      🎨
                    </div>
                    <div class="state-info">
                      <p>
                        Current State:
                        <strong>{{ getDynamicStateName() }}</strong>
                      </p>
                      <p>Try hovering, clicking, or using the buttons above!</p>
                    </div>
                  </div>
                </div>

                @if (showPresenterNotes()) {
                  <div class="presenter-notes" [@tooltipFade]>
                    <h4>💡 Presentation Tips:</h4>
                    <ul>
                      <li>Interact with element to show states (Key: 4)</li>
                      <li>Explain state-driven design patterns</li>
                      <li>Show how to handle multiple interaction types</li>
                      <li>Discuss accessibility considerations</li>
                    </ul>
                  </div>
                }
              </div>
            </div>
          </section>
        </main>

        <!-- Footer with Best Practices -->
        <footer class="features-footer">
          <div class="best-practices" [@staggerIn]="summaryTrigger()">
            <h3>Animation Best Practices</h3>
            <div class="practices-grid">
              <div class="practice-item">
                <div class="practice-icon">🎯</div>
                <span>Use transform & opacity</span>
              </div>
              <div class="practice-item">
                <div class="practice-icon">⏱️</div>
                <span>Keep durations under 300ms</span>
              </div>
              <div class="practice-item">
                <div class="practice-icon">🔄</div>
                <span>Respect reduced motion</span>
              </div>
              <div class="practice-item">
                <div class="practice-icon">📱</div>
                <span>Test on mobile devices</span>
              </div>
            </div>
          </div>

          <!-- Keyboard shortcuts for presenter -->
          <div class="keyboard-shortcuts" [@tooltipFade]>
            <small>
              🎮 Shortcuts: <kbd>1</kbd> Keyframes | <kbd>2</kbd> Coordination |
              <kbd>3</kbd> Performance | <kbd>4</kbd> States | <kbd>R</kbd> Reset
              | <kbd>P</kbd> Notes
            </small>
          </div>
        </footer>
      </div>
    `,
  styleUrl: './slide-4-advanced.component.scss',
  animations: [
    fadeInUp,
    buttonPress,
    staggerIn,
    keyframeDemo,
    parentAnimation,
    childAnimation,
    performanceDemo,
    dynamicStates,
    tooltipFade,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Slide4AdvancedComponent implements OnInit, AfterViewInit {
  constructor(private readonly elementRef: ElementRef) {}

  // Stagger animation triggers
  protected readonly featuresTrigger = signal(0);
  protected readonly summaryTrigger = signal(0);

  // Track which features have been explored
  protected readonly featuresExplored = signal({
    keyframes: false,
    coordination: false,
    performance: false,
    dynamic: false,
  });

  // Presenter features
  protected readonly showPresenterNotes = signal(false);

  // Keyframes demo
  protected readonly keyframeState = signal('idle');

  // Coordination demo
  protected readonly coordinationState = signal('idle');
  protected readonly childElements = signal([
    { id: 1, icon: '⭐' },
    { id: 2, icon: '🌟' },
    { id: 3, icon: '✨' },
    { id: 4, icon: '💫' },
  ]);

  // Performance demo
  protected readonly performanceState = signal<'start' | 'end'>('start');
  protected readonly selectedDuration = signal(500);
  protected readonly selectedEasing = signal('ease-out');

  protected readonly durations = [200, 500, 1000, 2000];
  protected readonly easings = [
    { name: 'Ease', value: 'ease' },
    { name: 'Ease-out', value: 'ease-out' },
    { name: 'Ease-in', value: 'ease-in' },
    { name: 'Bounce', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  ];

  // Dynamic states demo
  protected readonly dynamicState = signal<
    'idle' | 'hover' | 'active' | 'loading'
  >('idle');
  protected readonly availableStates = [
    { name: 'Idle', value: 'idle' as const },
    { name: 'Hover', value: 'hover' as const },
    { name: 'Active', value: 'active' as const },
    { name: 'Loading', value: 'loading' as const },
  ];

  ngOnInit() {
    // Trigger stagger animations
    setTimeout(() => this.featuresTrigger.set(1), 500);
    setTimeout(() => this.summaryTrigger.set(1), 2500);
  }

  ngAfterViewInit() {
    // Apply syntax highlighting to all code blocks
    const codeBlocks = this.elementRef.nativeElement.querySelectorAll('pre code');
    codeBlocks.forEach((block: HTMLElement) => {
      Prism.highlightElement(block);
    });
  }

  // Keyboard shortcuts for smooth presenting
  @HostListener('window:keydown', ['$event'])
  handlePresenterShortcuts(event: KeyboardEvent): void {
    switch (event.key.toLowerCase()) {
      case '1':
        event.preventDefault();
        this.triggerKeyframeAnimation('bounce');
        break;
      case '2':
        event.preventDefault();
        this.triggerCoordinatedAnimation();
        break;
      case '3':
        event.preventDefault();
        this.togglePerformanceAnimation();
        break;
      case '4':
        event.preventDefault();
        this.cycleDynamicState();
        break;
      case 'r': // Reset all demos
        event.preventDefault();
        this.resetAllDemos();
        break;
      case 'p': // Toggle presenter notes
        event.preventDefault();
        this.showPresenterNotes.update((show) => !show);
        break;
    }
  }

  // Keyframes demo methods
  protected triggerKeyframeAnimation(
    type: 'bounce' | 'pulse' | 'rotate'
  ): void {
    this.keyframeState.set(type);
    setTimeout(() => this.keyframeState.set('idle'), 1200);
    this.featuresExplored.update((features) => ({
      ...features,
      keyframes: true,
    }));
  }

  // Coordination demo methods
  protected triggerCoordinatedAnimation(): void {
    this.coordinationState.set('active');
    setTimeout(() => this.coordinationState.set('idle'), 800);
    this.featuresExplored.update((features) => ({
      ...features,
      coordination: true,
    }));
  }

  // Performance demo methods
  protected togglePerformanceAnimation(): void {
    this.performanceState.update((state) =>
      state === 'start' ? 'end' : 'start'
    );
    this.featuresExplored.update((features) => ({
      ...features,
      performance: true,
    }));
  }

  protected setDuration(duration: number): void {
    this.selectedDuration.set(duration);
  }

  protected setEasing(easing: string): void {
    this.selectedEasing.set(easing);
  }

  // Dynamic states demo methods
  protected setDynamicState(
    state: 'idle' | 'hover' | 'active' | 'loading'
  ): void {
    this.dynamicState.set(state);
    this.featuresExplored.update((features) => ({
      ...features,
      dynamic: true,
    }));
  }

  protected cycleDynamicState(): void {
    const currentIndex = this.availableStates.findIndex(
      (s) => s.value === this.dynamicState()
    );
    const nextIndex = (currentIndex + 1) % this.availableStates.length;
    this.setDynamicState(this.availableStates[nextIndex].value);
  }

  protected getDynamicStateName(): string {
    return (
      this.availableStates.find((s) => s.value === this.dynamicState())?.name ||
      'Unknown'
    );
  }

  protected resetAllDemos(): void {
    this.keyframeState.set('idle');
    this.coordinationState.set('idle');
    this.performanceState.set('start');
    this.dynamicState.set('idle');
    this.selectedDuration.set(500);
    this.selectedEasing.set('ease-out');
    this.featuresExplored.set({
      keyframes: false,
      coordination: false,
      performance: false,
      dynamic: false,
    });
  }
}
