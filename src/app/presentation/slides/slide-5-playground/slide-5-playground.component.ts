import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  HostListener,
  AfterViewInit,
  ElementRef,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fadeInUp, buttonPress, staggerIn } from '../../../shared/animations';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEvent,
} from '@angular/animations';

// Import PrismJS for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

// Enhanced animation playground trigger with better state management
const playgroundDemo = trigger('playgroundDemo', [
  state('idle', style({
    transform: 'translateX(0px) translateY(0px) scale(1) rotate(0deg)',
    backgroundColor: '#667eea',
    borderRadius: '8px',
    opacity: 1
  })),
  state('animated', style({
    transform: '{{ transform }}',
    backgroundColor: '{{ backgroundColor }}',
    borderRadius: '{{ borderRadius }}px',
    opacity: 1
  }), {
    params: {
      transform: 'translateX(0px) translateY(0px) scale(1) rotate(0deg)',
      backgroundColor: '#667eea',
      borderRadius: '8'
    }
  }),
  transition('idle => animated', [
    animate('{{ duration }}ms {{ easing }}')
  ], {
    params: {
      duration: '500',
      easing: 'ease-out'
    }
  }),
  transition('animated => idle', [
    animate('300ms ease-in')
  ])
]);

// Enhanced tooltips animation
const tooltipFade = trigger('tooltipFade', [
  state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
  transition(':enter', [
    animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
  ]),
]);

interface AnimationPreset {
  name: string;
  icon: string;
  config: {
    transformX: number;
    transformY: number;
    scale: number;
    rotation: number;
    duration: number;
    easing: string;
    backgroundColor?: string;
    borderRadius?: number;
  };
}

@Component({
  selector: 'app-slide-5-playground',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="slide-playground" [@fadeInUp]>
      <!-- Header -->
      <header class="slide-header">
        <h1>Interactive Animation Playground</h1>
        <p class="slide-subtitle">
          Experiment with animations in real-time and see the generated code
        </p>

        <!-- Animation Status -->
        <div class="animation-status">
          <div class="status-indicator" [class.active]="isAnimating()">
            <span class="status-dot"></span>
            <span>{{ isAnimating() ? 'Animating' : 'Ready' }}</span>
          </div>
        </div>
      </header>

      <!-- Main Content Grid -->
      <main class="playground-grid">
        <!-- Control Panel -->
        <section class="control-panel" [@staggerIn]="controlsTrigger()">
          <h2>Animation Controls</h2>

          <!-- Transform Controls -->
          <div class="control-group">
            <h3>Transform</h3>
            <div class="control-row">
              <label>X Position:</label>
              <input
                type="range"
                min="-200"
                max="200"
                [ngModel]="transformX()"
                (ngModelChange)="updateTransformX($event)" />
              <span>{{ transformX() }}px</span>
            </div>
            <div class="control-row">
              <label>Y Position:</label>
              <input
                type="range"
                min="-200"
                max="200"
                [ngModel]="transformY()"
                (ngModelChange)="updateTransformY($event)" />
              <span>{{ transformY() }}px</span>
            </div>
            <div class="control-row">
              <label>Scale:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                [ngModel]="scale()"
                (ngModelChange)="updateScale($event)" />
              <span>{{ scale() }}x</span>
            </div>
            <div class="control-row">
              <label>Rotation:</label>
              <input
                type="range"
                min="0"
                max="360"
                [ngModel]="rotation()"
                (ngModelChange)="updateRotation($event)" />
              <span>{{ rotation() }}°</span>
            </div>
          </div>

          <!-- Timing Controls -->
          <div class="control-group">
            <h3>Timing</h3>
            <div class="control-row">
              <label>Duration:</label>
              <select [ngModel]="duration()" (ngModelChange)="updateDuration($event)">
                <option value="200">200ms</option>
                <option value="500">500ms</option>
                <option value="1000">1000ms</option>
                <option value="2000">2000ms</option>
              </select>
            </div>
            <div class="control-row">
              <label>Easing:</label>
              <select [ngModel]="easing()" (ngModelChange)="updateEasing($event)">
                <option value="ease">ease</option>
                <option value="ease-in">ease-in</option>
                <option value="ease-out">ease-out</option>
                <option value="ease-in-out">ease-in-out</option>
                <option value="linear">linear</option>
                <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce</option>
              </select>
            </div>
          </div>

          <!-- Style Controls -->
          <div class="control-group">
            <h3>Appearance</h3>
            <div class="control-row">
              <label>Background:</label>
              <input
                type="color"
                [ngModel]="backgroundColor()"
                (ngModelChange)="updateBackgroundColor($event)" />
            </div>
            <div class="control-row">
              <label>Border Radius:</label>
              <input
                type="range"
                min="0"
                max="50"
                [ngModel]="borderRadius()"
                (ngModelChange)="updateBorderRadius($event)" />
              <span>{{ borderRadius() }}px</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button
              class="play-btn"
              [@buttonPress]
              (click)="playAnimation()"
              [disabled]="isAnimating()">
              {{ isAnimating() ? 'Playing...' : 'Play Animation' }}
            </button>
            <button
              class="reset-btn"
              [@buttonPress]
              (click)="resetAnimation()">
              Reset
            </button>
            <button
              class="random-btn"
              [@buttonPress]
              (click)="randomizeValues()">
              Randomize
            </button>
          </div>
        </section>

        <!-- Animation Preview -->
        <section class="preview-panel" [@staggerIn]="previewTrigger()">
          <h2>Live Preview</h2>
          <div class="preview-stage">
            <div
              class="animation-target"
              [@playgroundDemo]="{
                value: animationState(),
                params: animationParams()
              }"
              (@playgroundDemo.start)="onAnimationStart($event)"
              (@playgroundDemo.done)="onAnimationDone($event)">
              🎯
            </div>
          </div>

          <!-- Animation Timeline -->
          <div class="timeline">
            <div class="timeline-track">
              <div
                class="timeline-progress"
                [style.width.%]="animationProgress()">
              </div>
            </div>
            <div class="timeline-labels">
              <span>0ms</span>
              <span>{{ duration() }}ms</span>
            </div>
          </div>
        </section>

        <!-- Generated Code -->
        <section class="code-panel" [@staggerIn]="codeTrigger()">
          <h2>Generated Code</h2>

          <div class="code-tabs">
            <button
              class="tab-btn"
              [class.active]="activeTab() === 'typescript'"
              [@buttonPress]
              (click)="setActiveTab('typescript')">
              TypeScript
            </button>
            <button
              class="tab-btn"
              [class.active]="activeTab() === 'css'"
              [@buttonPress]
              (click)="setActiveTab('css')">
              CSS
            </button>
          </div>

          <div class="code-content">
            @if (activeTab() === 'typescript') {
              <div class="code-example">
                <pre><code class="language-typescript" [innerHTML]="highlightedTypeScript()"></code></pre>
              </div>
            } @else {
              <div class="code-example">
                <pre><code class="language-css" [innerHTML]="highlightedCSS()"></code></pre>
              </div>
            }
          </div>

          <button
            class="copy-btn"
            [@buttonPress]
            (click)="copyCode()">
            {{ showCopyTooltip() ? 'Copied!' : 'Copy Code' }}
          </button>

          @if (showCopyTooltip()) {
            <div class="copy-tooltip" [@tooltipFade]>
              Code copied to clipboard!
            </div>
          }
        </section>

        <!-- Presets -->
        <section class="presets-panel" [@staggerIn]="presetsTrigger()">
          <h2>Animation Presets</h2>
          <div class="presets-grid">
            @for (preset of presets; track preset.name) {
              <button
                class="preset-btn"
                [@buttonPress]
                (click)="applyPreset(preset.name)">
                <div class="preset-icon">{{ preset.icon }}</div>
                <span>{{ preset.name }}</span>
              </button>
            }
          </div>
        </section>
      </main>

      <!-- Footer with Tips -->
      <footer class="playground-footer">
        @if (showPresenterNotes()) {
          <div class="presenter-notes" [@tooltipFade]>
            <h4>💡 Presentation Tips:</h4>
            <ul>
              <li>Demonstrate real-time code generation</li>
              <li>Show how different easing functions affect feel</li>
              <li>Explain performance considerations for transforms</li>
              <li>Use presets to showcase common patterns</li>
            </ul>
          </div>
        }

        <!-- Keyboard shortcuts for presenter -->
        <div class="keyboard-shortcuts" [@tooltipFade]>
          <small>
            🎮 Shortcuts: <kbd>Space</kbd> Play | <kbd>R</kbd> Reset | <kbd>P</kbd> Notes | <kbd>1-6</kbd> Presets
          </small>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './slide-5-playground.component.scss',
  animations: [fadeInUp, buttonPress, staggerIn, playgroundDemo, tooltipFade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slide5PlaygroundComponent implements OnInit, AfterViewInit {
  constructor(private readonly elementRef: ElementRef) {
    // Setup automatic code highlighting when values change
    effect(() => {
      // Watch for any changes in animation parameters
      this.transformX();
      this.transformY();
      this.scale();
      this.rotation();
      this.duration();
      this.easing();
      this.backgroundColor();
      this.borderRadius();

      // Trigger code update after a brief delay to batch changes
      setTimeout(() => this.highlightCode(), 50);
    });
  }

  // Stagger animation triggers
  protected readonly controlsTrigger = signal(0);
  protected readonly previewTrigger = signal(0);
  protected readonly codeTrigger = signal(0);
  protected readonly presetsTrigger = signal(0);

  // Presenter features
  protected readonly showPresenterNotes = signal(false);

  // Animation state management
  protected readonly isAnimating = signal(false);
  protected readonly animationState = signal<'idle' | 'animated'>('idle');
  protected readonly animationProgress = signal(0);

  // Transform controls
  protected readonly transformX = signal(0);
  protected readonly transformY = signal(0);
  protected readonly scale = signal(1);
  protected readonly rotation = signal(0);

  // Timing controls
  protected readonly duration = signal(500);
  protected readonly easing = signal('ease-out');

  // Style controls
  protected readonly backgroundColor = signal('#667eea');
  protected readonly borderRadius = signal(8);

  // Code generation
  protected readonly activeTab = signal<'typescript' | 'css'>('typescript');
  protected readonly showCopyTooltip = signal(false);

  // Animation parameters computed signal
  protected readonly animationParams = computed(() => ({
    transform: this.getTransformString(),
    backgroundColor: this.backgroundColor(),
    borderRadius: this.borderRadius().toString(),
    duration: this.duration().toString(),
    easing: this.easing()
  }));

  // Generated code computed signals
  protected readonly generatedTypeScript = computed(() => {
    return `// Angular Animation
const slideAnimation = trigger('slideAnimation', [
  state('idle', style({
    transform: 'translateX(0px) translateY(0px) scale(1) rotate(0deg)',
    backgroundColor: '#667eea',
    borderRadius: '8px'
  })),
  state('animated', style({
    transform: 'translateX(${this.transformX()}px) translateY(${this.transformY()}px) scale(${this.scale()}) rotate(${this.rotation()}deg)',
    backgroundColor: '${this.backgroundColor()}',
    borderRadius: '${this.borderRadius()}px'
  })),
  transition('idle => animated', [
    animate('${this.duration()}ms ${this.easing()}')
  ]),
  transition('animated => idle', [
    animate('300ms ease-in')
  ])
]);

// Usage in component
@Component({
  template: \`
    <div [@slideAnimation]="animationState">
      Content to animate
    </div>
  \`,
  animations: [slideAnimation]
})
export class MyComponent {
  animationState = 'idle';

  playAnimation() {
    this.animationState = this.animationState === 'idle' ? 'animated' : 'idle';
  }
}`;
  });

  protected readonly generatedCSS = computed(() => {
    return `/* CSS Animation */
.animated-element {
  /* Initial state */
  transform: translateX(0px) translateY(0px) scale(1) rotate(0deg);
  background-color: #667eea;
  border-radius: 8px;
  transition: all ${this.duration()}ms ${this.easing()};
}

.animated-element.active {
  /* Animated state */
  transform: translateX(${this.transformX()}px)
             translateY(${this.transformY()}px)
             scale(${this.scale()})
             rotate(${this.rotation()}deg);
  background-color: ${this.backgroundColor()};
  border-radius: ${this.borderRadius()}px;
}

/* Alternative with keyframes */
@keyframes slideAnimation {
  from {
    transform: translateX(0px) translateY(0px) scale(1) rotate(0deg);
    background-color: #667eea;
    border-radius: 8px;
  }
  to {
    transform: translateX(${this.transformX()}px)
               translateY(${this.transformY()}px)
               scale(${this.scale()})
               rotate(${this.rotation()}deg);
    background-color: ${this.backgroundColor()};
    border-radius: ${this.borderRadius()}px;
  }
}

.keyframe-animation {
  animation: slideAnimation ${this.duration()}ms ${this.easing()} forwards;
}`;
  });

  // Highlighted code for syntax highlighting
  protected readonly highlightedTypeScript = computed(() => {
    return Prism.highlight(this.generatedTypeScript(), Prism.languages['typescript'], 'typescript');
  });

  protected readonly highlightedCSS = computed(() => {
    return Prism.highlight(this.generatedCSS(), Prism.languages['css'], 'css');
  });

  // Animation presets
  protected readonly presets: AnimationPreset[] = [
    {
      name: 'Bounce',
      icon: '🎾',
      config: {
        transformX: 0,
        transformY: -50,
        scale: 1.2,
        rotation: 0,
        duration: 800,
        easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        backgroundColor: '#10b981',
        borderRadius: 12
      }
    },
    {
      name: 'Slide',
      icon: '➡️',
      config: {
        transformX: 150,
        transformY: 0,
        scale: 1,
        rotation: 0,
        duration: 500,
        easing: 'ease-out',
        backgroundColor: '#3b82f6',
        borderRadius: 8
      }
    },
    {
      name: 'Zoom',
      icon: '🔍',
      config: {
        transformX: 0,
        transformY: 0,
        scale: 1.8,
        rotation: 0,
        duration: 400,
        easing: 'ease-in-out',
        backgroundColor: '#f59e0b',
        borderRadius: 20
      }
    },
    {
      name: 'Rotate',
      icon: '🔄',
      config: {
        transformX: 0,
        transformY: 0,
        scale: 1,
        rotation: 180,
        duration: 600,
        easing: 'ease-out',
        backgroundColor: '#8b5cf6',
        borderRadius: 50
      }
    },
    {
      name: 'Pulse',
      icon: '💓',
      config: {
        transformX: 0,
        transformY: 0,
        scale: 1.3,
        rotation: 0,
        duration: 300,
        easing: 'ease-in-out',
        backgroundColor: '#ef4444',
        borderRadius: 50
      }
    },
    {
      name: 'Shake',
      icon: '📳',
      config: {
        transformX: 20,
        transformY: 0,
        scale: 1,
        rotation: 5,
        duration: 200,
        easing: 'linear',
        backgroundColor: '#f97316',
        borderRadius: 4
      }
    }
  ];

  private animationTimeoutId: any;
  private progressIntervalId: any;

  getTransformString(): string {
    const translateX = this.transformX();
    const translateY = this.transformY();
    const scale = this.scale();
    const rotation = this.rotation();

    return `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`;
  }

  ngOnInit() {
    // Trigger stagger animations
    setTimeout(() => this.controlsTrigger.set(1), 300);
    setTimeout(() => this.previewTrigger.set(1), 600);
    setTimeout(() => this.codeTrigger.set(1), 900);
    setTimeout(() => this.presetsTrigger.set(1), 1200);
  }

  ngAfterViewInit() {
    // Initial code highlighting
    this.highlightCode();
  }

  // Individual update methods for better control
  protected updateTransformX(value: string): void {
    this.transformX.set(Number(value));
  }

  protected updateTransformY(value: string): void {
    this.transformY.set(Number(value));
  }

  protected updateScale(value: string): void {
    this.scale.set(Number(value));
  }

  protected updateRotation(value: string): void {
    this.rotation.set(Number(value));
  }

  protected updateDuration(value: string): void {
    this.duration.set(Number(value));
  }

  protected updateEasing(value: string): void {
    this.easing.set(value);
  }

  protected updateBackgroundColor(value: string): void {
    this.backgroundColor.set(value);
  }

  protected updateBorderRadius(value: string): void {
    this.borderRadius.set(Number(value));
  }

  // Animation event handlers
  protected onAnimationStart(event: AnimationEvent): void {
    if (event.fromState === 'idle' && event.toState === 'animated') {
      this.startProgressTracking();
    }
  }

  protected onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'animated') {
      this.isAnimating.set(false);
      this.animationProgress.set(0);
      this.clearProgressTracking();
    }
  }

  // Animation control methods
  protected playAnimation(): void {
    if (this.isAnimating()) return;

    this.clearProgressTracking();
    this.isAnimating.set(true);
    this.animationProgress.set(0);

    // Reset to idle first
    this.animationState.set('idle');

    // Trigger animation after a brief delay
    this.animationTimeoutId = setTimeout(() => {
      this.animationState.set('animated');
    }, 50);
  }

  private startProgressTracking(): void {
    const duration = this.duration();
    const steps = 60; // 60fps simulation
    const stepTime = duration / steps;
    let currentStep = 0;

    this.progressIntervalId = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      this.animationProgress.set(progress);

      if (currentStep >= steps) {
        this.clearProgressTracking();
      }
    }, stepTime);
  }

  private clearProgressTracking(): void {
    if (this.progressIntervalId) {
      clearInterval(this.progressIntervalId);
      this.progressIntervalId = null;
    }
    if (this.animationTimeoutId) {
      clearTimeout(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }

  protected resetAnimation(): void {
    this.clearProgressTracking();

    this.transformX.set(0);
    this.transformY.set(0);
    this.scale.set(1);
    this.rotation.set(0);
    this.duration.set(500);
    this.easing.set('ease-out');
    this.backgroundColor.set('#667eea');
    this.borderRadius.set(8);
    this.isAnimating.set(false);
    this.animationProgress.set(0);
    this.animationState.set('idle');
  }

  protected randomizeValues(): void {
    this.transformX.set(Math.floor(Math.random() * 400) - 200);
    this.transformY.set(Math.floor(Math.random() * 400) - 200);
    this.scale.set(Math.round((Math.random() * 1.5 + 0.5) * 10) / 10);
    this.rotation.set(Math.floor(Math.random() * 360));

    const durations = [200, 500, 1000, 2000];
    this.duration.set(durations[Math.floor(Math.random() * durations.length)]);

    const easings = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];
    this.easing.set(easings[Math.floor(Math.random() * easings.length)]);

    this.backgroundColor.set(`hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`);
    this.borderRadius.set(Math.floor(Math.random() * 50));
  }

  // Preset methods
  protected applyPreset(presetName: string): void {
    const preset = this.presets.find(p => p.name === presetName);
    if (!preset) return;

    const config = preset.config;
    this.transformX.set(config.transformX);
    this.transformY.set(config.transformY);
    this.scale.set(config.scale);
    this.rotation.set(config.rotation);
    this.duration.set(config.duration);
    this.easing.set(config.easing);

    if (config.backgroundColor) {
      this.backgroundColor.set(config.backgroundColor);
    }
    if (config.borderRadius !== undefined) {
      this.borderRadius.set(config.borderRadius);
    }
  }

  // Code tab and copy methods
  protected setActiveTab(tab: 'typescript' | 'css'): void {
    this.activeTab.set(tab);
  }

  protected copyCode(): void {
    const code = this.activeTab() === 'typescript'
      ? this.generatedTypeScript()
      : this.generatedCSS();

    navigator.clipboard.writeText(code).then(() => {
      this.showCopyTooltip.set(true);
      setTimeout(() => this.showCopyTooltip.set(false), 2000);
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }

  private highlightCode(): void {
    // Code highlighting is now handled by computed signals
    // This method is kept for compatibility and future enhancements
  }

  // Keyboard shortcuts for smooth presenting
  @HostListener('window:keydown', ['$event'])
  handlePresenterShortcuts(event: KeyboardEvent): void {
    // Prevent shortcuts when user is typing in inputs
    if (event.target && (event.target as HTMLElement).tagName.toLowerCase() === 'input') {
      return;
    }

    switch (event.key.toLowerCase()) {
      case ' ': // Spacebar
        event.preventDefault();
        this.playAnimation();
        break;
      case 'r': // Reset
        event.preventDefault();
        this.resetAnimation();
        break;
      case 'p': // Toggle presenter notes
        event.preventDefault();
        this.showPresenterNotes.update((show) => !show);
        break;
      case '1':
        event.preventDefault();
        this.applyPreset('Bounce');
        break;
      case '2':
        event.preventDefault();
        this.applyPreset('Slide');
        break;
      case '3':
        event.preventDefault();
        this.applyPreset('Zoom');
        break;
      case '4':
        event.preventDefault();
        this.applyPreset('Rotate');
        break;
      case '5':
        event.preventDefault();
        this.applyPreset('Pulse');
        break;
      case '6':
        event.preventDefault();
        this.applyPreset('Shake');
        break;
    }
  }

  ngOnDestroy(): void {
    this.clearProgressTracking();
  }
}