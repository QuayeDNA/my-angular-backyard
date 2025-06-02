import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DonutChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-playground';
}
