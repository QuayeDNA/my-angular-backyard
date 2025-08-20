import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/presentation/intro',
    pathMatch: 'full'
  },
  {
    path: 'presentation',
    loadComponent: () => import('./presentation/presentation/presentation').then(m => m.PresentationComponent),
    children: [
      {
        path: 'intro',
        loadComponent: () => import('./presentation/slides/slide-1-intro/slide-1-intro.component').then(m => m.Slide1IntroComponent),
        data: { animation: 'intro' }
      },
      {
        path: 'overview',
        loadComponent: () => import('./presentation/slides/slide-1-5-overview/slide-1-5-overview.component').then(m => m.Slide15OverviewComponent),
        data: { animation: 'overview' }
      },
      {
        path: 'concepts',
        loadComponent: () => import('./presentation/slides/slide-2-concepts/slide-2-concepts.component').then(m => m.Slide2ConceptsComponent),
        data: { animation: 'concepts' }
      },
      {
        path: 'patterns',
        loadComponent: () => import('./presentation/slides/slide-3-patterns/slide-3-patterns.component').then(m => m.Slide3PatternsComponent),
        data: { animation: 'patterns' }
      },
      {
        path: 'advanced',
        loadComponent: () => import('./presentation/slides/slide-4-advanced/slide-4-advanced.component').then(m => m.Slide4AdvancedComponent),
        data: { animation: 'advanced' }
      },
      {
        path: 'playground',
        loadComponent: () => import('./presentation/slides/slide-5-playground/slide-5-playground.component').then(m => m.Slide5PlaygroundComponent),
        data: { animation: 'playground' }
      },
      {
        path: 'performance',
        loadComponent: () => import('./presentation/slides/slide-6-performance/slide-6-performance.component').then(m => m.Slide6PerformanceComponent),
        data: { animation: 'performance' }
      },
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
      }
    ]
  }
];