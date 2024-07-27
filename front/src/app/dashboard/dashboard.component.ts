import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardService } from './data-access/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export default class DashboardComponent {
  dashboardService = inject(DashboardService);

  users = toSignal(this.dashboardService.getUsers());
}
