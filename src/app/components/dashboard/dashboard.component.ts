import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { DataStreamService } from '../../services/data-stream.service';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  realTimeData = signal<
    {
      time: string;
      value: number;
    }[]
  >([]);

  // Chart data
  lineChartData = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        label: 'Real-Time Data',
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        borderWidth: 3,
      },
    ],
  };

  // Chart options

  lineChartOptions = {
    responsive: true,
    animation: {
      duration: 500,
    },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 3 },
    },
  };

  constructor(private dataStreamService: DataStreamService) {}

  ngOnInit() {
    this.dataStreamService.getRealTimeData().subscribe((data) => {
      console.log('New Data Received:', data);

      // Update Signal state
      this.realTimeData.set([...this.realTimeData(), data]);

      // Ensure data accumulates instead of replacing
      this.lineChartData.labels!.push(data.time);
      this.lineChartData.datasets[0].data.push(Number(data.value));

      // Limit to max 20 points
      if (this.lineChartData.labels!.length > 20) {
        this.lineChartData.labels!.shift();
        this.lineChartData.datasets[0].data.shift();
      }

      this.chart?.update();
    });
  }
}
