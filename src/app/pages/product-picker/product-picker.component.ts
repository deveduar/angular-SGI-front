import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Component, OnInit  } from '@angular/core';
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
export class ProductPickerComponent implements OnInit {
  products!: Product[];
  errorMessage: string | null = null;
  // selectedProduct!: Product;
  // selectedProduct: Product | null = this.products?.[0];
  selectedProduct: Product | null = null;

  loading = true;

  lastSelectedProduct: Product | null = this.selectedProduct;
  
  constructor(private inventoryService: InventoryService){}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(
      {     
        next: (data) => {
        this.products = data;
        this.errorMessage = null;
        this.loading = false;
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
            this.loading = false; 
          }, 3000);

      }
      }
    );
  };

  onProductSelect(event: { value: Product | null }) {
    if (event.value) {
      this.selectedProduct = event.value;
    } else {
      this.selectedProduct = this.lastSelectedProduct;
    }
    this.lastSelectedProduct = this.selectedProduct;
  }
}