import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, DashboardComponent, NgChartsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'real-time-dashboard';
}
