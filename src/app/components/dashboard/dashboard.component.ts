import { Component, OnInit, signal } from '@angular/core';
import { DataStreamService } from '../../services/data-stream.service';
import { ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  realTimeData = signal<
    {
      time: string;
      value: number;
    }[]
  >([]);

  // Chart data
  lineChartData: ChartData<'line', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Real-time data',
        borderColor: '#3e95cd',
        backgroundColor: '#3e95cd',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
      },
    },
  }

  constructor(private dataStreamService: DataStreamService) {}

  ngOnInit() {
    this.dataStreamService.getRealTimeData().subscribe((data) => {
      // Update the real-time data signal
      this.realTimeData.set([...this.realTimeData(), data]);

      // Update the chart data
      this.lineChartData.labels!.push(data.time);
      this.lineChartData.datasets[0].data!.push(data.value);

      // Remove the first element if the array is too long
      if (this.lineChartData.labels!.length > 20) {
        this.lineChartData.labels!.shift();
        this.lineChartData.datasets[0].data!.shift();
      }
    });
  }
}
