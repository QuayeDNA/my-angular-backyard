import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  HostListener,
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
  stagger,
} from '@angular/animations';

// Enter/Leave animations
const enterLeaveDemo = trigger('enterLeaveDemo', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
  ])
]);

// List stagger animation
const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateX(-50px)' }),
      stagger(100, [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ], { optional: true }),
    query(':leave', [
      stagger(50, [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(50px)' }))
      ])
    ], { optional: true })
  ])
]);

// Route transition simulation
const routeTransition = trigger('routeTransition', [
  transition('page1 => page2', [
    style({ transform: 'translateX(100%)' }),
    animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'translateX(0)' }))
  ]),
  transition('page2 => page1', [
    style({ transform: 'translateX(-100%)' }),
    animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ transform: 'translateX(0)' }))
  ])
]);

// Form validation animation
const formValidation = trigger('formValidation', [
  state('valid', style({ borderColor: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.1)' })),
  state('invalid', style({ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' })),
  state('focused', style({ borderColor: '#667eea', backgroundColor: 'rgba(102, 126, 234, 0.1)' })),
  transition('* => invalid', [
    animate('200ms ease-out', style({ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' })),
    animate('100ms ease-out', style({ transform: 'translateX(-5px)' })),
    animate('100ms ease-out', style({ transform: 'translateX(5px)' })),
    animate('100ms ease-out', style({ transform: 'translateX(0)' }))
  ]),
  transition('* => valid', [
    animate('300ms ease-out')
  ]),
  transition('* => focused', [
    animate('200ms ease-out')
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
  ])
]);

@Component({
  selector: 'app-slide-3-patterns',
  imports: [CommonModule],
  template: `
    <div class="slide-patterns" [@fadeInUp]>
      <!-- Header -->
      <header class="slide-header">
        <h1>Practical Animation Patterns</h1>
        <p class="slide-subtitle">
          Real-world animations that enhance user experience
        </p>

        <!-- Presentation Progress -->
        <div class="presentation-progress">
          <div class="progress-steps">
            <div class="step" [class.completed]="patternsExplored().enterLeave">
              <span class="step-icon">✨</span>
              <span>Enter/Leave</span>
            </div>
            <div class="step" [class.completed]="patternsExplored().lists">
              <span class="step-icon">📋</span>
              <span>Lists</span>
            </div>
            <div class="step" [class.completed]="patternsExplored().routes">
              <span class="step-icon">🔄</span>
              <span>Routes</span>
            </div>
            <div class="step" [class.completed]="patternsExplored().forms">
              <span class="step-icon">📝</span>
              <span>Forms</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Grid -->
      <main class="patterns-grid">

        <!-- Enter/Leave Animations -->
        <section class="pattern-card" [@staggerIn]="patternsTrigger()">
          <div class="pattern-header">
            <span class="pattern-icon">✨</span>
            <h2>Enter/Leave Animations</h2>
          </div>
          <div class="pattern-content">
            <p>Smooth transitions when elements appear or disappear</p>
            <div class="code-example">
              <pre><code>transition(':enter', [
  style({{ '{' }} opacity: 0, transform: 'translateY(-20px)' {{ '}' }}),
  animate('300ms ease-out',
    style({{ '{' }} opacity: 1, transform: 'translateY(0)' {{ '}' }}))
])
transition(':leave', [
  animate('200ms ease-in',
    style({{ '{' }} opacity: 0, transform: 'translateY(-20px)' {{ '}' }}))
])</code></pre>
            </div>
            <div class="pattern-demo">
              <div class="enter-leave-demo">
                <button
                  class="demo-btn"
                  [@buttonPress]
                  (click)="toggleNotification()">
                  {{ showNotification() ? 'Hide' : 'Show' }} Notification
                </button>
                @if (showNotification()) {
                  <div class="notification" [@enterLeaveDemo]>
                    <span class="notification-icon">✅</span>
                    <span>Animation completed successfully!</span>
                  </div>
                }
              </div>

              <!-- Presenter Notes -->
              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Presentation Tips:</h4>
                  <ul>
                    <li>Toggle notification to show enter/leave (Key: 1)</li>
                    <li>Emphasize smooth visual feedback</li>
                    <li>Point out different timing for enter vs leave</li>
                    <li>Great for alerts, modals, and tooltips</li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- List Animations -->
        <section class="pattern-card" [@staggerIn]="patternsTrigger()">
          <div class="pattern-header">
            <span class="pattern-icon">📋</span>
            <h2>List Animations</h2>
          </div>
          <div class="pattern-content">
            <p>Staggered animations for dynamic lists and collections</p>
            <div class="code-example">
              <pre><code>transition('* => *', [
  query(':enter', [
    style({{ '{' }} opacity: 0, transform: 'translateX(-50px)' {{ '}' }}),
    stagger(100, [
      animate('400ms ease-out',
        style({{ '{' }} opacity: 1, transform: 'translateX(0)' {{ '}' }}))
    ])
  ], {{ '{ optional: true }' }})
])</code></pre>
            </div>
            <div class="pattern-demo">
              <div class="list-demo">
                <div class="list-controls">
                  <button
                    class="demo-btn"
                    [@buttonPress]
                    (click)="addListItem()">
                    Add Item
                  </button>
                  <button
                    class="demo-btn secondary"
                    [@buttonPress]
                    (click)="removeLastItem()"
                    [disabled]="listItems().length === 0">
                    Remove Last
                  </button>
                  <button
                    class="demo-btn secondary"
                    [@buttonPress]
                    (click)="shuffleList()">
                    Shuffle
                  </button>
                </div>
                <div class="list-container" [@listStagger]="listTrigger()">
                  @for (item of listItems(); track item.id) {
                    <div class="list-item" (click)="removeItem(item.id)">
                      <span class="item-icon">{{ item.icon }}</span>
                      <span>{{ item.name }}</span>
                      <small class="item-id">#{{ item.id }}</small>
                    </div>
                  }
                </div>
              </div>

              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Presentation Tips:</h4>
                  <ul>
                    <li>Add/remove items to show stagger effect (Key: 2)</li>
                    <li>Notice how items animate in sequence</li>
                    <li>Perfect for search results, to-do lists</li>
                    <li>Click items to remove them individually</li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Route Transitions -->
        <section class="pattern-card" [@staggerIn]="patternsTrigger()">
          <div class="pattern-header">
            <span class="pattern-icon">🔄</span>
            <h2>Route Transitions</h2>
          </div>
          <div class="pattern-content">
            <p>Smooth navigation between different views and pages</p>
            <div class="code-example">
              <pre><code>transition('page1 => page2', [
  style({{ '{' }} transform: 'translateX(100%)' {{ '}' }}),
  animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    style({{ '{' }} transform: 'translateX(0)' {{ '}' }}))
])
transition('page2 => page1', [
  style({{ '{' }} transform: 'translateX(-100%)' {{ '}' }}),
  animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    style({{ '{' }} transform: 'translateX(0)' {{ '}' }}))
])</code></pre>
            </div>
            <div class="pattern-demo">
              <div class="route-demo">
                <div class="route-nav">
                  <button
                    class="nav-btn"
                    [@buttonPress]
                    (click)="setCurrentPage('page1')"
                    [class.active]="currentPage() === 'page1'">
                    Dashboard
                  </button>
                  <button
                    class="nav-btn"
                    [@buttonPress]
                    (click)="setCurrentPage('page2')"
                    [class.active]="currentPage() === 'page2'">
                    Profile
                  </button>
                </div>
                <div class="route-content">
                  <div class="page-container" [@routeTransition]="currentPage()">
                    @switch (currentPage()) {
                      @case ('page1') {
                        <div class="page">
                          <h3>📊 Dashboard</h3>
                          <p>Welcome to your dashboard! Here you can view analytics and manage your data.</p>
                          <div class="dashboard-cards">
                            <div class="stat-card">
                              <div class="stat-value">1,234</div>
                              <div class="stat-label">Users</div>
                            </div>
                            <div class="stat-card">
                              <div class="stat-value">5,678</div>
                              <div class="stat-label">Sessions</div>
                            </div>
                          </div>
                        </div>
                      }
                      @case ('page2') {
                        <div class="page">
                          <h3>👤 Profile</h3>
                          <p>Manage your profile settings and preferences here.</p>
                          <div class="profile-info">
                            <div class="profile-field">
                              <label>Name:</label>
                              <span>Angular Developer</span>
                            </div>
                            <div class="profile-field">
                              <label>Email:</label>
                              <span>developer@angular.dev</span>
                            </div>
                          </div>
                        </div>
                      }
                    }
                  </div>
                </div>
              </div>

              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Presentation Tips:</h4>
                  <ul>
                    <li>Switch between pages to show transitions (Key: 3)</li>
                    <li>Notice different slide directions</li>
                    <li>Essential for SPAs and mobile apps</li>
                    <li>Provides spatial context for users</li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </section>

        <!-- Form Field Animations -->
        <section class="pattern-card" [@staggerIn]="patternsTrigger()">
          <div class="pattern-header">
            <span class="pattern-icon">📝</span>
            <h2>Form Field Animations</h2>
          </div>
          <div class="pattern-content">
            <p>Visual feedback for form validation and user interaction</p>
            <div class="code-example">
              <pre><code>transition('* => invalid', [
  group([
    animate('200ms ease-out',
      style({{ '{' }} borderColor: '#ef4444' {{ '}' }})),
    animate('100ms ease-out',
      style({{ '{' }} transform: 'translateX(-5px)' {{ '}' }})),
    animate('100ms ease-out',
      style({{ '{' }} transform: 'translateX(5px)' {{ '}' }})),
    animate('100ms ease-out',
      style({{ '{' }} transform: 'translateX(0)' {{ '}' }}))
  ])
])</code></pre>
            </div>
            <div class="pattern-demo">
              <div class="form-demo">
                <div class="form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    class="form-input"
                    [@formValidation]="emailState()"
                    (input)="validateEmail($event)"
                    (focus)="setEmailState('focused')"
                    (blur)="validateEmailOnBlur()"
                    placeholder="Enter your email"
                    #emailInput>
                  <div class="validation-message">
                    @switch (emailState()) {
                      @case ('valid') {
                        <span class="success">✅ Valid email address</span>
                      }
                      @case ('invalid') {
                        <span class="error">❌ Please enter a valid email</span>
                      }
                      @default {
                        <span class="hint">💡 We'll never share your email</span>
                      }
                    }
                  </div>
                </div>
                <div class="form-actions">
                  <button
                    class="demo-btn"
                    [@buttonPress]
                    (click)="triggerValidationExample()">
                    Test Validation
                  </button>
                  <button
                    class="demo-btn secondary"
                    [@buttonPress]
                    (click)="resetForm()">
                    Reset Form
                  </button>
                </div>
              </div>

              @if (showPresenterNotes()) {
                <div class="presenter-notes" [@tooltipFade]>
                  <h4>💡 Presentation Tips:</h4>
                  <ul>
                    <li>Type in the email field to see validation (Key: 4)</li>
                    <li>Notice shake animation for errors</li>
                    <li>Different colors for different states</li>
                    <li>Improves form completion rates</li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </section>

      </main>

      <!-- Footer with Pattern Summary -->
      <footer class="patterns-footer">
        <div class="pattern-summary" [@staggerIn]="summaryTrigger()">
          <h3>Animation Pattern Benefits</h3>
          <div class="benefit-grid">
            <div class="benefit-item">
              <div class="benefit-icon">🎯</div>
              <span>User Guidance</span>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">⚡</div>
              <span>Instant Feedback</span>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">🎨</div>
              <span>Polish & Delight</span>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">📱</div>
              <span>Mobile UX</span>
            </div>
          </div>
        </div>

        <!-- Keyboard shortcuts for presenter -->
        <div class="keyboard-shortcuts" [@tooltipFade]>
          <small>
            🎮 Shortcuts: <kbd>1</kbd> Enter/Leave | <kbd>2</kbd> Lists | <kbd>3</kbd> Routes | <kbd>4</kbd> Forms | <kbd>R</kbd> Reset | <kbd>P</kbd> Notes
          </small>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './slide-3-patterns.component.scss',
  animations: [fadeInUp, buttonPress, staggerIn, enterLeaveDemo, listStagger, routeTransition, formValidation, tooltipFade],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slide3PatternsComponent implements OnInit {
  // Stagger animation triggers
  protected readonly patternsTrigger = signal(0);
  protected readonly summaryTrigger = signal(0);

  // Track which patterns have been explored
  protected readonly patternsExplored = signal({
    enterLeave: false,
    lists: false,
    routes: false,
    forms: false
  });

  // Presenter features
  protected readonly showPresenterNotes = signal(false);

  // Enter/Leave demo
  protected readonly showNotification = signal(false);

  // List demo
  protected readonly listItems = signal([
    { id: 1, name: 'Dashboard', icon: '📊' },
    { id: 2, name: 'Users', icon: '👥' },
    { id: 3, name: 'Analytics', icon: '📈' }
  ]);
  protected readonly listTrigger = signal(0);
  private nextItemId = 4;

  // Route demo
  protected readonly currentPage = signal<'page1' | 'page2'>('page1');

  // Form demo
  protected readonly emailState = signal<'focused' | 'valid' | 'invalid' | 'default'>('default');

  // Available list items for demo
  private readonly availableItems = [
    { name: 'Settings', icon: '⚙️' },
    { name: 'Profile', icon: '👤' },
    { name: 'Messages', icon: '💬' },
    { name: 'Notifications', icon: '🔔' },
    { name: 'Security', icon: '🔒' },
    { name: 'Billing', icon: '💳' },
    { name: 'Reports', icon: '📋' },
    { name: 'Help', icon: '❓' }
  ];

  ngOnInit() {
    // Trigger stagger animations
    setTimeout(() => this.patternsTrigger.set(1), 500);
    setTimeout(() => this.summaryTrigger.set(1), 2500);
  }

  // Keyboard shortcuts for smooth presenting
  @HostListener('window:keydown', ['$event'])
  handlePresenterShortcuts(event: KeyboardEvent): void {
    switch (event.key.toLowerCase()) {
      case '1':
        event.preventDefault();
        this.toggleNotification();
        break;
      case '2':
        event.preventDefault();
        this.addListItem();
        break;
      case '3':
        event.preventDefault();
        this.setCurrentPage(this.currentPage() === 'page1' ? 'page2' : 'page1');
        break;
      case '4':
        event.preventDefault();
        this.triggerValidationExample();
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

  // Enter/Leave demo methods
  protected toggleNotification(): void {
    this.showNotification.update(show => !show);
    this.patternsExplored.update(patterns => ({ ...patterns, enterLeave: true }));
  }

  // List demo methods
  protected addListItem(): void {
    const randomItem = this.availableItems[Math.floor(Math.random() * this.availableItems.length)];
    const newItem = {
      id: this.nextItemId++,
      name: randomItem.name,
      icon: randomItem.icon
    };
    this.listItems.update(items => [...items, newItem]);
    this.listTrigger.update(trigger => trigger + 1);
    this.patternsExplored.update(patterns => ({ ...patterns, lists: true }));
  }

  protected removeLastItem(): void {
    this.listItems.update(items => items.slice(0, -1));
    this.listTrigger.update(trigger => trigger + 1);
    this.patternsExplored.update(patterns => ({ ...patterns, lists: true }));
  }

  protected removeItem(id: number): void {
    this.listItems.update(items => items.filter(item => item.id !== id));
    this.listTrigger.update(trigger => trigger + 1);
    this.patternsExplored.update(patterns => ({ ...patterns, lists: true }));
  }

  protected shuffleList(): void {
    this.listItems.update(items => [...items].sort(() => Math.random() - 0.5));
    this.listTrigger.update(trigger => trigger + 1);
    this.patternsExplored.update(patterns => ({ ...patterns, lists: true }));
  }

  // Route demo methods
  protected setCurrentPage(page: 'page1' | 'page2'): void {
    this.currentPage.set(page);
    this.patternsExplored.update(patterns => ({ ...patterns, routes: true }));
  }

  // Form demo methods
  protected validateEmail(event: Event): void {
    const input = event.target as HTMLInputElement;
    const email = input.value;

    if (email.length === 0) {
      this.emailState.set('default');
    } else if (this.isValidEmail(email)) {
      this.emailState.set('valid');
    } else {
      this.emailState.set('invalid');
    }
    this.patternsExplored.update(patterns => ({ ...patterns, forms: true }));
  }

  protected setEmailState(state: 'focused' | 'valid' | 'invalid' | 'default'): void {
    this.emailState.set(state);
  }

  protected validateEmailOnBlur(): void {
    if (this.emailState() === 'focused') {
      this.emailState.set('default');
    }
  }

  protected triggerValidationExample(): void {
    // Simulate invalid then valid
    this.emailState.set('invalid');
    setTimeout(() => this.emailState.set('valid'), 1000);
    this.patternsExplored.update(patterns => ({ ...patterns, forms: true }));
  }

  protected resetForm(): void {
    this.emailState.set('default');
    // Clear form input if accessible
    const emailInput = document.querySelector('.form-input') as HTMLInputElement;
    if (emailInput) {
      emailInput.value = '';
    }
  }

  protected resetAllDemos(): void {
    this.showNotification.set(false);
    this.listItems.set([
      { id: 1, name: 'Dashboard', icon: '📊' },
      { id: 2, name: 'Users', icon: '👥' },
      { id: 3, name: 'Analytics', icon: '📈' }
    ]);
    this.nextItemId = 4;
    this.listTrigger.set(0);
    this.currentPage.set('page1');
    this.emailState.set('default');
    this.resetForm();
    this.patternsExplored.set({
      enterLeave: false,
      lists: false,
      routes: false,
      forms: false
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
