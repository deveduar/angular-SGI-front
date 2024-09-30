import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';
import { ListboxModule } from 'primeng/listbox';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { FormsModule } from '@angular/forms'
import { SkeletonModule } from 'primeng/skeleton';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-picker',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    OrderListModule,
    ListboxModule,
    ProductDetailComponent, 
    FormsModule,
    SkeletonModule,
    ProductCarouselComponent
  
  ],
  templateUrl: './product-picker.component.html',
  styleUrl: './product-picker.component.scss'
})
export class ProductPickerComponent {
  products!: Product[];
  errorMessage: string | null = null;
  selectedProduct!: Product;

  loading = true;

  constructor(private inventoryService: InventoryService){}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(

      {     
        next: (data) => {
        this.products = data.slice(0, 20);
        this.errorMessage = null;
        this.loading = false;
        // console.log(data)
        if (this.products.length > 0) {
          this.selectedProduct = this.products[0];  
          this.onProductSelect({ value: this.selectedProduct }); 
        }
      },
        error: (err) => {
          // this.errorMessage = `ERROR: ${err.message}`;
          // this.loading = false;
          setTimeout(() => {
            this.errorMessage = `ERROR: ${err.message}`;
            this.loading = false;  // Stop loading after showing the error
          }, 3000);

      }
      }
    );
  };

  onProductSelect(event: any) {
    this.selectedProduct = event.value;
  }
}