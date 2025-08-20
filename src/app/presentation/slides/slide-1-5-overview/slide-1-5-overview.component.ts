import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInUp, staggerIn } from '../../../shared/animations';

// Import PrismJS for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';

@Component({
  selector: 'app-slide-1-5-overview',
  imports: [CommonModule],
  template: `
    <div class="slide-overview" [@fadeInUp]>
      <!-- Header -->
      <header class="slide-header">
        <h1>Frontend Animations: The Bigger Picture</h1>
        <p class="slide-subtitle">
          From CSS to Angular: How we bring interfaces to life
        </p>
      </header>

      <!-- Main Content Grid -->
      <main class="overview-grid">
        <!-- Frontend Animations in General -->
        <section class="overview-card" [@staggerIn]="contentTrigger()">
          <div class="card-header">
            <span class="card-icon">🌐</span>
            <h2>Frontend Animations</h2>
          </div>
          <div class="card-content">
            <h3>Why Animate?</h3>
            <div class="feature-points">
              <div class="feature-point">Guide user attention</div>
              <div class="feature-point">Provide visual feedback</div>
              <div class="feature-point">Create smooth transitions</div>
              <div class="feature-point">Enhance perceived performance</div>
            </div>

            <h3>Common Approaches</h3>
            <div class="approach-grid">
              <div class="approach-item">
                <strong>CSS Animations</strong>
                <span>Simple, performant, static</span>
              </div>
              <div class="approach-item">
                <strong>JavaScript Libraries</strong>
                <span>GSAP, Framer Motion, Lottie</span>
              </div>
              <div class="approach-item">
                <strong>Framework Solutions</strong>
                <span>React Spring, Vue Transition, Angular Animations</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Angular Animations -->
        <section class="overview-card" [@staggerIn]="contentTrigger()">
          <div class="card-header">
            <span class="card-icon">🅰️</span>
            <h2>Angular Animations</h2>
          </div>
          <div class="card-content">
            <h3>What Makes Angular Different?</h3>
            <div class="feature-points">
              <div class="feature-point">
                <strong>Declarative:</strong> Define animations in component metadata
              </div>
              <div class="feature-point">
                <strong>State-driven:</strong> Animations respond to data changes
              </div>
              <div class="feature-point">
                <strong>Integrated:</strong> Works seamlessly with Angular's change detection
              </div>
              <div class="feature-point">
                <strong>Powerful:</strong> Complex sequences, queries, and coordination
              </div>
            </div>
          </div>
        </section>

        <!-- Legacy vs Modern Angular -->
        <section class="comparison-card" [@staggerIn]="contentTrigger()">
          <div class="card-header">
            <span class="card-icon">🔄</span>
            <h2>Angular Evolution</h2>
          </div>
          <div class="comparison-content">
            <!-- Legacy Angular -->
            <div class="comparison-side">
              <h3>📦 Legacy Angular (Pre-17)</h3>
              <div class="code-example">
                <h4>app.module.ts</h4>
                <pre><code class="language-typescript" [innerHTML]="highlightCode(legacyCode)"></code></pre>
              </div>
              <div class="code-example">
                <h4>component.ts</h4>
                <pre><code class="language-typescript" [innerHTML]="highlightCode(legacyComponentCode)"></code></pre>
              </div>
              <div class="features-list">
                <span class="feature-tag legacy">NgModules</span>
                <span class="feature-tag legacy">BrowserAnimationsModule</span>
                <span class="feature-tag legacy">imports: []</span>
              </div>
            </div>

            <!-- Modern Angular -->
            <div class="comparison-side">
              <h3>🚀 Modern Angular (17+)</h3>
              <div class="code-example">
                <h4>main.ts</h4>
                <pre><code class="language-typescript" [innerHTML]="highlightCode(modernBootstrapCode)"></code></pre>
              </div>
              <div class="code-example">
                <h4>component.ts</h4>
                <pre><code class="language-typescript" [innerHTML]="highlightCode(modernComponentCode)"></code></pre>
              </div>
              <div class="features-list">
                <span class="feature-tag modern">Standalone Components</span>
                <span class="feature-tag modern">provideAnimations()</span>
                <span class="feature-tag modern">Direct Imports</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Key Benefits -->
        <section class="benefits-card" [@staggerIn]="contentTrigger()">
          <div class="card-header">
            <span class="card-icon">✨</span>
            <h2>Why Choose Angular Animations?</h2>
          </div>
          <div class="benefits-grid">
            <div class="benefit-item">
              <div class="benefit-icon">🎯</div>
              <h4>Type Safety</h4>
              <p>Full TypeScript support with compile-time checks</p>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">🔗</div>
              <h4>State Integration</h4>
              <p>Animations automatically sync with component state</p>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">⚡</div>
              <h4>Performance</h4>
              <p>Optimized for change detection and rendering</p>
            </div>
            <div class="benefit-item">
              <div class="benefit-icon">🛠️</div>
              <h4>Developer Experience</h4>
              <p>Declarative syntax with powerful debugging tools</p>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="slide-footer">
        <div class="next-steps" [@staggerIn]="footerTrigger()">
          <h3>What's Next?</h3>
          <p>Let's dive into the <strong>core building blocks</strong> that make Angular animations work</p>
        </div>

        <!-- Keyboard shortcuts -->
        <div class="keyboard-shortcuts">
          <small>
            🎮 Shortcuts: <kbd>P</kbd> Notes | <kbd>→</kbd> Next Slide
          </small>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './slide-1-5-overview.component.scss',
  animations: [fadeInUp, staggerIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slide15OverviewComponent implements OnInit {
  // Animation triggers
  protected readonly contentTrigger = signal(0);
  protected readonly footerTrigger = signal(0);

  // Code examples
  protected readonly legacyCode = `// Legacy setup
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule  // Required for animations
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }`;

  protected readonly legacyComponentCode = `// Legacy component
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  animations: [slideAnimation]  // Animation definition
})
export class ExampleComponent {
  state = 'initial';
}`;

  protected readonly modernBootstrapCode = `// Modern setup
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations()  // Simple provider function
  ]
});`;

  protected readonly modernComponentCode = `// Modern standalone component
@Component({
  selector: 'app-example',
  imports: [CommonModule],  // Direct imports
  template: \`<div [@slideAnimation]="state">Content</div>\`,
  animations: [slideAnimation]
})
export class ExampleComponent {
  state = signal('initial');  // Using signals
}`;

  ngOnInit() {
    // Stagger the content appearance
    setTimeout(() => this.contentTrigger.set(1), 300);
    setTimeout(() => this.footerTrigger.set(1), 1200);
  }

  // Code highlighting
  protected highlightCode(code: string): string {
    try {
      return Prism.highlight(code, Prism.languages['typescript'], 'typescript');
    } catch (error) {
      console.warn('Syntax highlighting failed:', error);
      return code;
    }
  }
}
