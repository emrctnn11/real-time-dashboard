import { Injectable } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStreamService {
  constructor() {}

  getRealTimeData(): Observable<{ time: string; value: number }> {
    return interval(1000).pipe(
      // Emit a value every second
      map(() => ({
        time: new Date().toLocaleTimeString(),
        value: Math.random() * 100, // Random value between 0 and 100
      }))
    );
  }
}
