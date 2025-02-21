import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts'; // Doğru import

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DashboardComponent,
    NgChartsModule, // Burada ekledik
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
