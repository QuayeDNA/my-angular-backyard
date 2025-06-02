import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartData {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
      <!-- Title -->
      <h2 class="text-lg font-semibold text-gray-800 mb-6">Order Frequency</h2>

      <div class="flex items-center justify-between">
        <!-- SVG Donut Chart -->
        <div class="relative">
          <svg width="200" height="200" viewBox="0 0 300 300" class="transform -rotate-90">
            <!-- Chart segments -->
            @for (segment of chartSegments(); track segment.label) {
              <circle
                cx="200"
                cy="200"
                r="50"
                fill="none"
                [attr.stroke]="segment.color"
                stroke-width="40"
                [attr.stroke-dasharray]="segment.dashArray"
                [attr.stroke-dashoffset]="segment.dashOffset"
                stroke-linecap="round"
                class="transition-all duration-300 hover:opacity-80"
              />
            }
          </svg>
        </div>

        <!-- Legend -->
        <div class="ml-8 space-y-3">
          @for (item of chartData(); track item.label) {
            <div class="flex items-center justify-between min-w-[280px]">
              <div class="flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-3"
                  [style.background-color]="item.color">
                </div>
                <span class="text-sm text-gray-700">{{ item.label }}</span>
              </div>
              <span class="text-sm font-medium text-gray-900 ml-8">{{ item.percentage }}%</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    circle {
      transition: opacity 0.3s ease;
    }

    circle:hover {
      opacity: 0.8;
    }
  `]
})
export class DonutChartComponent {
  // Chart data using signals
  chartData = signal<ChartData[]>([
    {
      label: '10+ Orders(Loyal Buyers)',
      value: 52.1,
      percentage: 0, // Will be calculated dynamically
      color: '#fb923c' // orange-400
    },
    {
      label: '2 - 3 Orders(Occasional Buyers)',
      value: 22.8,
      percentage: 0, // Will be calculated dynamically
      color: '#9ca3af' // gray-400
    },
    {
      label: '4 - 9(Returning Buyers)',
      value: 13.9,
      percentage: 0, // Will be calculated dynamically
      color: '#374151' // gray-700
    },
    {
      label: 'First Time Buyers',
      value: 5.09,
      percentage: 0, // Will be calculated dynamically
      color: '#3b82f6' // blue-500
    }
  ]);

  // Computed property for chart segments
  chartSegments = computed(() => {
    const data = this.chartData();
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 80;
    const circumference = 2 * Math.PI * radius; // 2π × radius

    // For rounded caps, we need a small space between segments
    const roundCapAdjustment = 2; // pixels to reduce each segment by

    let cumulativePercentage = 0;

    return data.map(item => {
      const percentage = item.value / total; // Calculate accurate percentage

      // Reduce dash length slightly to create visual gaps between segments
      const dashLength = (circumference * percentage) - roundCapAdjustment;

      // Calculate starting position based on accumulated percentage
      const dashOffset = -(circumference * cumulativePercentage);

      // Move cumulative tracker for next segment
      cumulativePercentage += percentage;

      // Update the percentage for the legend display
      item.percentage = Math.round(percentage * 100);

      return {
        label: item.label,
        color: item.color,
        dashArray: `${dashLength} ${circumference}`,
        dashOffset: dashOffset
      };
    });
  });
}
