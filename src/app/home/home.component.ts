
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
// import { ProductPickerComponent } from '../pages/product-picker/product-picker.component';
import { InventoryService } from '../adapters/api/inventory.service';
import { StoreService } from '../adapters/api/store.service';
import { ProductCarouselComponent } from '../pages/product-carousel/product-carousel.component';
import { InventoryListComponent } from '../pages/inventory-list/inventory-list.component';
import { DashboardStatsComponent } from '../pages/dashboard-stats/dashboard-stats.component';

@Component({
  selector: 'app-home',
  imports: [
    DashboardStatsComponent,
    ProductCarouselComponent,
    InventoryListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private inventoryService = inject(InventoryService);
  private storeService = inject(StoreService);

  // Convert Observable to Signal using toSignal
  products = toSignal(this.inventoryService.getProducts(), {
    initialValue: [] as any[]
  });

  // Fetch store statistics
  statistics = toSignal(this.storeService.getStatistics(), {
    initialValue: null
  });

  // Error handling can be done via catchError in the service or via a separate error signal
  errorMessage: string | null = null;
}
