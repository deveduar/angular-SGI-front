
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
// import { ProductPickerComponent } from '../pages/product-picker/product-picker.component';
import { InventoryService } from '../adapters/api/inventory.service';
import { ProductCarouselComponent } from '../pages/product-carousel/product-carousel.component';
import { InventoryListComponent } from '../pages/inventory-list/inventory-list.component';

@Component({
  selector: 'app-home',
  imports: [

    ProductCarouselComponent,
    InventoryListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private inventoryService = inject(InventoryService);

  // Convert Observable to Signal using toSignal
  products = toSignal(this.inventoryService.getProducts(), {
    initialValue: [] as any[]
  });

  // Error handling can be done via catchError in the service or via a separate error signal
  errorMessage: string | null = null;
}
