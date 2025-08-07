import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger,
  group
} from '@angular/animations';

// Core slide transition (for navigation between slides)
export const slideTransition = trigger('slideTransition', [
  transition(':increment', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':decrement', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

// Fade in animation for slide content
export const fadeInUp = trigger('fadeInUp', [
  state('void', style({
    opacity: 0,
    transform: 'translateY(30px)'
  })),
  transition(':enter', [
    animate('600ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// Button press feedback - using state-based animation
export const buttonPress = trigger('buttonPress', [
  state('default', style({ transform: 'scale(1)' })),
  state('pressed', style({ transform: 'scale(0.95)' })),
  transition('default <=> pressed', animate('150ms ease-in-out'))
]);

// Alternative: Simple hover effect (CSS-based is better for this)
export const buttonHover = trigger('buttonHover', [
  state('default', style({ transform: 'scale(1)' })),
  state('hovered', style({ transform: 'scale(1.05)' })),
  transition('default <=> hovered', animate('200ms ease-in-out'))
]);

// Stagger animation for lists
export const staggerIn = trigger('staggerIn', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);