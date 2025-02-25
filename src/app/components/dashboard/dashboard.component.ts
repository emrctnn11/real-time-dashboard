import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { DataStreamService } from '../../services/data-stream.service';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgChartsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  realTimeData = signal<{ time: string; value: number; name: string }[]>([]);

  availableCryptos = ['Bitcoin', 'Ethereum', 'Dogechain'];
  selectedCrypto = 'Bitcoin';

  subscription?: Subscription;

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Bitcoin',
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        borderWidth: 3,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(private dataService: DataStreamService) {}

  ngOnInit() {
    this.fetchData();
  }

  onCryptoChange(newCrypto: string) {
    this.selectedCrypto = newCrypto;

    this.realTimeData.set([]);
    this.lineChartData.labels = [];
    this.lineChartData.datasets[0].data = [];
    this.lineChartData.datasets[0].label = newCrypto;

    this.fetchData();
  }

  fetchData() {
    // Önceki subscription'ı iptal et
    this.subscription?.unsubscribe();

    // Yeni subscription oluştur
    this.subscription = this.dataService
      .getRealTimeData(this.selectedCrypto)
      .subscribe((data) => {
        this.realTimeData.set([...this.realTimeData(), data]);

        this.lineChartData.labels!.push(data.time);
        this.lineChartData.datasets[0].data.push(Number(data.value));
        this.lineChartData.datasets[0].label = data.name;

        if (this.lineChartData.labels!.length > 20) {
          this.lineChartData.labels!.shift();
          this.lineChartData.datasets[0].data.shift();
        }

        this.chart?.update();
      });
  }

  ngOnDestroy() {
    // Component kapandığında abonelik iptal edilir
    this.subscription?.unsubscribe();
  }
}
