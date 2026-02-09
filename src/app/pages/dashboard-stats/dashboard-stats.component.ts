import { Component, input } from '@angular/core';
import { StoreStatistics } from '../../domain/models/store-statistics';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-stats',
  imports: [CommonModule],
  templateUrl: './dashboard-stats.component.html',
  styleUrl: './dashboard-stats.component.scss'
})
export class DashboardStatsComponent {
  statistics = input<StoreStatistics | null>();
}
