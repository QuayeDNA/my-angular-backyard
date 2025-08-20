import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  group,
  animateChild,
} from '@angular/animations';

// Core slide transition (for navigation between slides) - Optimized for performance
export const slideTransition = trigger('slideTransition', [
  transition(':increment', [
    style({
      transform: 'translate3d(100%, 0, 0)',
      opacity: 0,
      willChange: 'transform, opacity'
    }),
    animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({
        transform: 'translate3d(0, 0, 0)',
        opacity: 1,
        willChange: 'auto'
      }))
  ]),
  transition(':decrement', [
    style({
      transform: 'translate3d(-100%, 0, 0)',
      opacity: 0,
      willChange: 'transform, opacity'
    }),
    animate('350ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({
        transform: 'translate3d(0, 0, 0)',
        opacity: 1,
        willChange: 'auto'
      }))
  ])
]);

// Router-based slide transitions for lazy-loaded routes
export const routerSlideTransition = trigger('routerSlideTransition', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({
        transform: 'translate3d(100%, 0, 0)',
        opacity: 0
      })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            transform: 'translate3d(-100%, 0, 0)',
            opacity: 0
          }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({
            transform: 'translate3d(0, 0, 0)',
            opacity: 1
          }))
      ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true }),
  ])
]);// Fade in animation for slide content - Optimized
export const fadeInUp = trigger('fadeInUp', [
  state('void', style({
    opacity: 0,
    transform: 'translate3d(0, 30px, 0)'
  })),
  transition(':enter', [
    animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
  ])
]);

// Button press feedback - Optimized for performance
export const buttonPress = trigger('buttonPress', [
  state('default', style({ transform: 'scale3d(1, 1, 1)' })),
  state('pressed', style({ transform: 'scale3d(0.95, 0.95, 1)' })),
  transition('default <=> pressed', animate('100ms ease-in-out'))
]);

// Alternative: Simple hover effect (CSS-based is better for this)
export const buttonHover = trigger('buttonHover', [
  state('default', style({ transform: 'scale(1)' })),
  state('hovered', style({ transform: 'scale(1.05)' })),
  transition('default <=> hovered', animate('200ms ease-in-out'))
]);

// Stagger animation for lists - Optimized
export const staggerIn = trigger('staggerIn', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translate3d(0, 20px, 0)' }),
      stagger(80, [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 1, transform: 'translate3d(0, 0, 0)' }))
      ])
    ], { optional: true })
  ])
]);