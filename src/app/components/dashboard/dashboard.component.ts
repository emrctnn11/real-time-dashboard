import { Component, OnInit, signal } from '@angular/core';
import { DataStreamService } from '../../services/data-stream.service';

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

  constructor(private dataStreamService: DataStreamService) {}

  ngOnInit() {
    this.dataStreamService.getRealTimeData().subscribe((data) => {
      this.realTimeData.set([...this.realTimeData(), data]);
    });
  }
}
