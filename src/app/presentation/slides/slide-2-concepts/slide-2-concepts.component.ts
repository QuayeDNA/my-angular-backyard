import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  HostListener,
} from '@angular/core';
import { fadeInUp, buttonPress, staggerIn } from '../../../shared/animations';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

// Import PrismJS for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

// Demo animations for this slide
const conceptDemo = trigger('conceptDemo', [
  state(
    'initial',
    style({
      transform: 'scale(1) rotate(0deg)',
      backgroundColor: '#667eea',
      borderRadius: '8px',
    })
  ),
  state(
    'transformed',
    style({
      transform: 'scale(1.2) rotate(45deg)',
      backgroundColor: '#f093fb',
      borderRadius: '50%',
    })
  ),
  transition('initial => transformed', [
    animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
  ]),
  transition('transformed => initial', [animate('300ms ease-out')]),
]);

const timingDemo = trigger('timingDemo', [
  state('start', style({ transform: 'translateX(0)' })),
  state('end', style({ transform: 'translateX(200px)' })),
  transition('start => end', [animate('{{ duration }}ms {{ easing }}')]),
  transition('end => start', [animate('{{ duration }}ms {{ easing }}')]),
]);

// Enhanced tooltips animation
const tooltipFade = trigger('tooltipFade', [
  state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
  transition(':enter', [
    animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
  ])
]);

@Component({
  selector: 'app-slide-2-concepts',
  template: `
    <div class="slide-concepts" [@fadeInUp]>
      <!-- Header -->
      <header class="slide-header">
        <h1>Core Animation Building Blocks</h1>
        <p class="slide-subtitle">
          Understanding triggers, states, transitions, and timing
        </p>

        <!-- Presentation Progress -->
        <div class="presentation-progress">
          <div class="progress-steps">
            <div class="step" [class.completed]="conceptsExplored().triggers">
              <span class="step-icon">🎯</span>
              <span>Triggers</span>
            </div>
            <div class="step" [class.completed]="conceptsExplored().states">
              <span class="step-icon">🔄</span>
              <span>States</span>
            </div>
            <div class="step" [class.completed]="conceptsExplored().transitions">
              <span class="step-icon">⚡</span>
              <span>Transitions</span>
            </div>
            <div class="step" [class.completed]="conceptsExplored().timing">
              <span class="step-icon">⏱️</span>
              <span>Timing</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Grid -->
      <main class="concepts-grid">
        <!-- Triggers Section -->
        <section class="concept-card" [@staggerIn]="conceptsTrigger()">
          <div class="concept-header">
            <span class="concept-icon">🎯</span>
            <h2>Triggers</h2>
          </div>
          <div class="concept-content">
            <p><strong>Animation entry points</strong> that define when animations should run</p>
            <p>Think of triggers as <em>"event listeners"</em> that respond to state changes.</p>
            <div class="code-example">
              <pre><code class="language-typescript" [innerHTML]="highlightCode(codeExamples.trigger)"></code></pre>
            </div>
            <div class="concept-demo">
              <div class="trigger-demo">
                <button
                  class="demo-trigger-btn"
                  [@buttonPress]
                  (click)="triggerDemoAnimation()"
                  [class.active]="triggerActive()"
                >
                  Click to Trigger
                </button>
                <div
                  class="demo-element"
                  [@conceptDemo]="demoState()"
                  [class.triggered]="triggerActive()"
                ></div>
              </div>

              <!-- Presenter Notes -->
              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Concept Explanation:</h4>
                  <ul>
                    <li><strong>What:</strong> Triggers are named animation containers that Angular listens to</li>
                    <li><strong>Why:</strong> They provide a declarative way to connect animations to your component logic</li>
                    <li><strong>How:</strong> Use <code>[@triggerName]="stateValue"</code> in templates</li>
                    <li><strong>Key Point:</strong> One trigger can manage multiple states and transitions</li>
                  </ul>
                  <div class="presenter-tip">
                    <strong>🎯 Demo Tip:</strong> Click the button (or press '1') to show how state changes trigger animations
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- States Section -->
        <section class="concept-card" [@staggerIn]="conceptsTrigger()">
          <div class="concept-header">
            <span class="concept-icon">🔄</span>
            <h2>States</h2>
          </div>
          <div class="concept-content">
            <p><strong>Named visual conditions</strong> that define how elements should look</p>
            <p>States are like <em>"snapshots"</em> of CSS properties at specific moments.</p>
            <div class="code-example">
              <pre><code class="language-typescript" [innerHTML]="highlightCode(codeExamples.states)"></code></pre>
            </div>
            <div class="concept-demo">
              <div class="states-demo">
                <button
                  class="state-btn"
                  [@buttonPress]
                  (click)="toggleState('inactive')"
                  [class.active]="currentState() === 'inactive'"
                >
                  Inactive State
                </button>
                <button
                  class="state-btn"
                  [@buttonPress]
                  (click)="toggleState('active')"
                  [class.active]="currentState() === 'active'"
                >
                  Active State
                </button>
                <div class="state-element" [attr.data-state]="currentState()">
                  {{ currentState() }}
                </div>
              </div>

              <!-- Presenter Notes -->
              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Concept Explanation:</h4>
                  <ul>
                    <li><strong>What:</strong> States define the CSS properties for specific animation moments</li>
                    <li><strong>Why:</strong> They provide clear, reusable style definitions for animations</li>
                    <li><strong>How:</strong> Use <code>state('name', style(&#123;properties&#125;))</code></li>
                    <li><strong>Key Point:</strong> States are static - transitions make them dynamic</li>
                  </ul>
                  <div class="presenter-tip">
                    <strong>🔄 Demo Tip:</strong> Toggle between states (or press '2') to see instant style changes
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Transitions Section -->
        <section class="concept-card" [@staggerIn]="conceptsTrigger()">
          <div class="concept-header">
            <span class="concept-icon">⚡</span>
            <h2>Transitions</h2>
          </div>
          <div class="concept-content">
            <p><strong>Animation pathways</strong> that define how to move between states</p>
            <p>Transitions are the <em>"motion recipes"</em> that bring states to life.</p>
            <div class="code-example">
              <pre><code class="language-typescript" [innerHTML]="highlightCode(codeExamples.transitions)"></code></pre>
            </div>
            <div class="concept-demo">
              <div class="transition-demo">
                <div class="transition-controls">
                  <span>Direction:</span>
                  <button
                    class="direction-btn"
                    [@buttonPress]
                    (click)="setTransitionDirection('forward')"
                    [class.active]="transitionDirection() === 'forward'"
                  >
                    A → B
                  </button>
                  <button
                    class="direction-btn"
                    [@buttonPress]
                    (click)="setTransitionDirection('reverse')"
                    [class.active]="transitionDirection() === 'reverse'"
                  >
                    B → A
                  </button>
                </div>
                <div class="transition-path">
                  <div
                    class="state-dot start"
                    [class.active]="transitionDirection() === 'reverse'"
                  >
                    A
                  </div>
                  <div
                    class="transition-arrow"
                    [class.reverse]="transitionDirection() === 'reverse'"
                  >
                    <span class="arrow-line"></span>
                    <span class="arrow-head"></span>
                  </div>
                  <div
                    class="state-dot end"
                    [class.active]="transitionDirection() === 'forward'"
                  >
                    B
                  </div>
                </div>
              </div>

              <!-- Presenter Notes -->
              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Concept Explanation:</h4>
                  <ul>
                    <li><strong>What:</strong> Transitions define the animation between two states</li>
                    <li><strong>Why:</strong> They control timing, easing, and intermediate steps</li>
                    <li><strong>How:</strong> Use <code>transition('stateA => stateB', [animate()])</code></li>
                    <li><strong>Key Point:</strong> Different directions can have different animations</li>
                  </ul>
                  <div class="presenter-tip">
                    <strong>⚡ Demo Tip:</strong> Toggle directions (or press '3') to show bidirectional transitions
                  </div>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Timing Functions Section -->
        <section
          class="concept-card timing-card"
          [@staggerIn]="conceptsTrigger()"
        >
          <div class="concept-header">
            <span class="concept-icon">⏱️</span>
            <h2>Timing Functions</h2>
          </div>
          <div class="concept-content">
            <p><strong>Animation control</strong> that determines duration and easing curves</p>
            <p>Timing makes animations feel <em>"natural and responsive"</em> to users.</p>
            <div class="code-example">
              <pre><code class="language-typescript" [innerHTML]="highlightCode(codeExamples.timing)"></code></pre>
            </div>

            <!-- Interactive Timing Demo -->
            <div class="timing-demo">
              <div class="timing-controls">
                <div class="control-group">
                  <label>Duration:</label>
                  <div class="duration-buttons">
                    <button
                      class="timing-btn"
                      [@buttonPress]
                      (click)="setDuration(300)"
                      [class.active]="selectedDuration() === 300"
                    >
                      300ms
                    </button>
                    <button
                      class="timing-btn"
                      [@buttonPress]
                      (click)="setDuration(600)"
                      [class.active]="selectedDuration() === 600"
                    >
                      600ms
                    </button>
                    <button
                      class="timing-btn"
                      [@buttonPress]
                      (click)="setDuration(1000)"
                      [class.active]="selectedDuration() === 1000"
                    >
                      1s
                    </button>
                  </div>
                </div>

                <div class="control-group">
                  <label>Easing:</label>
                  <div class="easing-buttons">
                    <button
                      class="timing-btn"
                      [@buttonPress]
                      (click)="setEasing('ease-out')"
                      [class.active]="selectedEasing() === 'ease-out'"
                    >
                      ease-out
                    </button>
                    <button
                      class="timing-btn"
                      [@buttonPress]
                      (click)="setEasing('ease-in-out')"
                      [class.active]="selectedEasing() === 'ease-in-out'"
                    >
                      ease-in-out
                    </button>
                    <button
                      class="timing-btn"
                      [@buttonPress]
                      (click)="
                        setEasing('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
                      "
                      [class.active]="selectedEasing().includes('cubic-bezier')"
                    >
                      bounce
                    </button>
                  </div>
                </div>
              </div>

              <div class="timing-track">
                <button
                  class="start-timing-btn"
                  [@buttonPress]
                  (click)="startTimingDemo()"
                >
                  Start Animation
                </button>
                <div class="track">
                  <div
                    class="timing-element"
                    [@timingDemo]="getTimingParams()"
                  ></div>
                </div>
              </div>

              <!-- Presenter Notes -->
              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Concept Explanation:</h4>
                  <ul>
                    <li><strong>What:</strong> Timing controls how long and how smoothly animations run</li>
                    <li><strong>Why:</strong> Good timing makes animations feel natural and responsive</li>
                    <li><strong>How:</strong> Use <code>animate('duration easing-function')</code></li>
                    <li><strong>Key Point:</strong> Shorter durations feel snappy, longer ones feel elegant</li>
                  </ul>
                  <div class="presenter-tip">
                    <strong>⏱️ Demo Tip:</strong> Try different combinations (or press '4') to feel the difference
                  </div>
                </div>
              }
            </div>
          </div>
        </section>
      </main>

      <!-- Footer with Flow Diagram -->
      <footer class="concepts-footer">
        <div class="flow-diagram" [@staggerIn]="flowTrigger()">
          <h3>Animation Flow</h3>
          <div class="flow-steps">
            <div class="flow-step">
              <div class="step-icon">🎯</div>
              <span>Trigger</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">🔄</div>
              <span>State Change</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">⚡</div>
              <span>Transition</span>
            </div>
            <div class="flow-arrow">→</div>
            <div class="flow-step">
              <div class="step-icon">⏱️</div>
              <span>Timing</span>
            </div>
          </div>
        </div>

        <!-- Keyboard shortcuts for presenter -->
        <div class="keyboard-shortcuts" [@tooltipFade]>
          <small>
            🎮 Shortcuts: <kbd>1</kbd> Trigger | <kbd>2</kbd> States | <kbd>3</kbd> Transitions | <kbd>4</kbd> Timing | <kbd>R</kbd> Reset | <kbd>P</kbd> Notes
          </small>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './slide-2-concepts.component.scss',
  animations: [fadeInUp, buttonPress, staggerIn, conceptDemo, timingDemo, tooltipFade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Slide2ConceptsComponent implements OnInit {
  // Stagger animation triggers
  protected readonly conceptsTrigger = signal(0);
  protected readonly flowTrigger = signal(0);

  // Demo states
  protected readonly triggerActive = signal(false);
  protected readonly demoState = signal<'initial' | 'transformed'>('initial');
  protected readonly currentState = signal<'inactive' | 'active'>('inactive');
  protected readonly transitionDirection = signal<'forward' | 'reverse'>(
    'forward'
  );

  // Timing demo
  protected readonly selectedDuration = signal(600);
  protected readonly selectedEasing = signal('ease-out');
  protected readonly timingDemoState = signal<'start' | 'end'>('start');

  // Track which concepts have been interacted with
  protected readonly conceptsExplored = signal({
    triggers: false,
    states: false,
    transitions: false,
    timing: false
  });

  // Presenter features
  protected readonly showPresenterNotes = signal(false);

  // Code examples for better presentation
  protected readonly codeExamples = {
    trigger: `trigger('myAnimation', [
  state('inactive', style({ opacity: 0.5 })),
  state('active', style({ opacity: 1 })),
  transition('inactive => active', [
    animate('300ms ease-in')
  ])
])`,
    states: `state('inactive', style({
  backgroundColor: '#667eea',
  transform: 'scale(1)'
}))
state('active', style({
  backgroundColor: '#f093fb',
  transform: 'scale(1.1)'
}))`,
    transitions: `// Different speeds for different directions
transition('inactive => active', [
  animate('300ms ease-in')
])
transition('active => inactive', [
  animate('200ms ease-out')
])`,
    timing: `// Various timing options
animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
animate('300ms ease-out')
animate('1s ease-in-out')`
  };

  ngOnInit() {
    // Trigger stagger animations
    setTimeout(() => this.conceptsTrigger.set(1), 500);
    setTimeout(() => this.flowTrigger.set(1), 2000);
  }

  // Code highlighting method
  protected highlightCode(code: string): string {
    try {
      return Prism.highlight(code, Prism.languages['typescript'], 'typescript');
    } catch (error) {
      console.warn('Syntax highlighting failed:', error);
      return code; // Fallback to plain text
    }
  }

  // Keyboard shortcuts for smooth presenting
  @HostListener('window:keydown', ['$event'])
  handlePresenterShortcuts(event: KeyboardEvent): void {
    switch (event.key.toLowerCase()) {
      case '1':
        event.preventDefault();
        this.triggerDemoAnimation();
        break;
      case '2':
        event.preventDefault();
        this.toggleState(this.currentState() === 'active' ? 'inactive' : 'active');
        break;
      case '3':
        event.preventDefault();
        this.setTransitionDirection(
          this.transitionDirection() === 'forward' ? 'reverse' : 'forward'
        );
        break;
      case '4':
        event.preventDefault();
        this.startTimingDemo();
        break;
      case 'r': // Reset all demos
        event.preventDefault();
        this.resetAllDemos();
        break;
      case 'p': // Toggle presenter notes
        event.preventDefault();
        this.showPresenterNotes.update(show => !show);
        break;
    }
  }

  protected triggerDemoAnimation(): void {
    this.triggerActive.update((active) => !active);
    this.demoState.update((state) =>
      state === 'initial' ? 'transformed' : 'initial'
    );
    // Track concept exploration
    this.conceptsExplored.update(concepts => ({ ...concepts, triggers: true }));
  }

  protected toggleState(state: 'inactive' | 'active'): void {
    this.currentState.set(state);
    // Track concept exploration
    this.conceptsExplored.update(concepts => ({ ...concepts, states: true }));
  }

  protected setTransitionDirection(direction: 'forward' | 'reverse'): void {
    this.transitionDirection.set(direction);
    // Track concept exploration
    this.conceptsExplored.update(concepts => ({ ...concepts, transitions: true }));
  }

  protected setDuration(duration: number): void {
    this.selectedDuration.set(duration);
    // Track concept exploration
    this.conceptsExplored.update(concepts => ({ ...concepts, timing: true }));
  }

  protected setEasing(easing: string): void {
    this.selectedEasing.set(easing);
    // Track concept exploration
    this.conceptsExplored.update(concepts => ({ ...concepts, timing: true }));
  }

  protected startTimingDemo(): void {
    this.timingDemoState.update((state) =>
      state === 'start' ? 'end' : 'start'
    );
    // Track concept exploration
    this.conceptsExplored.update(concepts => ({ ...concepts, timing: true }));
  }

  protected resetAllDemos(): void {
    this.triggerActive.set(false);
    this.demoState.set('initial');
    this.currentState.set('inactive');
    this.transitionDirection.set('forward');
    this.timingDemoState.set('start');
    this.conceptsExplored.set({
      triggers: false,
      states: false,
      transitions: false,
      timing: false
    });
  }

  protected getTimingParams() {
    return {
      value: this.timingDemoState(),
      params: {
        duration: this.selectedDuration(),
        easing: this.selectedEasing(),
      },
    };
  }
}
