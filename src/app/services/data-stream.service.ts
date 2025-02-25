import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, Observable, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStreamService {
  private baseUrl = 'https://api.diadata.org/v1/assetQuotation';

  constructor(private http: HttpClient) {}

  getRealTimeData(
    crypto: string
  ): Observable<{ time: string; value: number; name: string }> {
    if (!crypto) {
      console.error('Crypto name is undefined!');
      return new Observable(); // Prevent API call if crypto is undefined
    }
    const cryptoUrl = `${this.baseUrl}/${crypto}/0x0000000000000000000000000000000000000000`;
    return interval(30000).pipe(
      startWith(0),
      switchMap(() => this.http.get<any>(cryptoUrl)),

      map((response) => ({
        time: new Date(response.Time).toLocaleTimeString(),
        value: response.Price,
        name: response.Name,
      }))
    );
  }
}
