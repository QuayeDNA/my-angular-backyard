import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { fadeInUp, staggerIn } from '../../../shared/animations';

@Component({
  selector: 'app-slide-1-intro',
  template: `
    <div class="slide-intro" [@fadeInUp]>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            Angular Animations
            <span class="highlight">Deep Dive</span>
          </h1>
          <p class="hero-subtitle">
            Transform your applications with smooth, performant animations that delight users and enhance experiences
          </p>
          <div class="hero-badges" [@staggerIn]="badgesTrigger()">
            <span class="badge">🚀 Performance Focused</span>
            <span class="badge">🎯 User-Centric</span>
            <span class="badge">⚡ Modern Angular</span>
          </div>
        </div>

        <!-- Floating Background Elements -->
        <div class="floating-elements">
          <div class="floating-shape shape-1"></div>
          <div class="floating-shape shape-2"></div>
          <div class="floating-shape shape-3"></div>
          <div class="floating-shape shape-4"></div>
        </div>
      </section>

      <!-- What You'll Learn -->
      <section class="learning-section">
        <h2 class="section-title">What You'll Learn</h2>
        <div class="learning-grid" [@staggerIn]="learningTrigger()">
          <div class="learning-card">
            <div class="learning-icon">🎨</div>
            <h3>Animation Fundamentals</h3>
            <p>From basic transitions to complex sequences with Angular's animation API</p>
          </div>
          <div class="learning-card">
            <div class="learning-icon">⚡</div>
            <h3>Performance Optimization</h3>
            <p>GPU acceleration, frame rates, and production-ready techniques</p>
          </div>
          <div class="learning-card">
            <div class="learning-icon">🔧</div>
            <h3>Real-World Applications</h3>
            <p>Practical examples and patterns you can use immediately</p>
          </div>
          <div class="learning-card">
            <div class="learning-icon">♿</div>
            <h3>Accessibility & UX</h3>
            <p>Creating inclusive animations that enhance user experience</p>
          </div>
        </div>
      </section>

      <!-- Journey Preview -->
      <section class="journey-section">
        <div class="journey-container" [@staggerIn]="journeyTrigger()">
          <h3 class="journey-title">Our Animation Journey</h3>
          <div class="journey-steps">
            <div class="journey-step">
              <div class="step-number">1</div>
              <span>Fundamentals & Triggers</span>
            </div>
            <div class="journey-arrow">→</div>
            <div class="journey-step">
              <div class="step-number">2</div>
              <span>States & Transitions</span>
            </div>
            <div class="journey-arrow">→</div>
            <div class="journey-step">
              <div class="step-number">3</div>
              <span>Advanced Techniques</span>
            </div>
            <div class="journey-arrow">→</div>
            <div class="journey-step">
              <div class="step-number">4</div>
              <span>Real-World Examples</span>
            </div>
            <div class="journey-arrow">→</div>
            <div class="journey-step">
              <div class="step-number">5</div>
              <span>Performance & Best Practices</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta-section">
        <div class="cta-content">
          <p class="cta-text">Ready to bring your Angular apps to life?</p>
          <div class="cta-highlight">Let's animate! 🎬</div>
        </div>
      </section>
    </div>
  `,
  styleUrl: './slide-1-intro.component.scss',
  animations: [fadeInUp, staggerIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slide1IntroComponent implements OnInit {
  // Animation triggers for stagger effects
  protected readonly badgesTrigger = signal(0);
  protected readonly learningTrigger = signal(0);
  protected readonly journeyTrigger = signal(0);

  ngOnInit() {
    // Trigger stagger animations with smooth timing
    setTimeout(() => this.badgesTrigger.set(1), 600);
    setTimeout(() => this.learningTrigger.set(1), 1200);
    setTimeout(() => this.journeyTrigger.set(1), 1800);
  }
}
