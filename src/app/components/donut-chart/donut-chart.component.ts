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
          <svg width="200" height="200" viewBox="0 0 200 200" class="transform -rotate-90">
            <!-- Background circle -->
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#f3f4f6"
              stroke-width="40"
            />

            <!-- Chart segments -->
            @for (segment of chartSegments(); track segment.label) {
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                [attr.stroke]="segment.color"
                stroke-width="40"
                stroke-linecap="round"
                [attr.stroke-dasharray]="segment.dashArray"
                [attr.stroke-dashoffset]="segment.dashOffset"
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
      transition: stroke-width 0.3s ease;
    }

    circle:hover {
      stroke-width: 45;
    }
  `]
})
export class DonutChartComponent {
  // Chart data using signals
  chartData = signal<ChartData[]>([
    {
      label: '10+ Orders(Loyal Buyers)',
      value: 52.1,
      percentage: 52.1,
      color: '#fb923c' // orange-400
    },
    {
      label: '2 - 3 Orders(Occasional Buyers)',
      value: 22.8,
      percentage: 22.8,
      color: '#9ca3af' // gray-400
    },
    {
      label: '4 - 9(Returning Buyers)',
      value: 13.9,
      percentage: 13.9,
      color: '#374151' // gray-700
    },
    {
      label: 'First Time Buyers',
      value: 5.09,
      percentage: 5.09,
      color: '#3b82f6' // blue-500
    }
  ]);

  // Computed property for chart segments
  chartSegments = computed(() => {
    const data = this.chartData();
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    let cumulativeValue = 0;

    return data.map((item, index) => {
      const percentage = item.value / total;
      const dashLength = circumference * percentage;

      // Calculate the offset based on cumulative values
      const rotationOffset = (cumulativeValue / total) * circumference;

      // Update cumulative value for next iteration
      cumulativeValue += item.value;

      // Update the percentage for display
      item.percentage = Math.round(percentage * 100 * 10) / 10; // Keep one decimal place

      return {
        label: item.label,
        color: item.color,
        dashArray: `${dashLength} ${circumference - dashLength}`,
        dashOffset: -rotationOffset
      };
    });
  });
}