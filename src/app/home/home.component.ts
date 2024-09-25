import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InventoryTableComponent } from '../pages/inventory-table/inventory-table.component';
import { OrderListModule } from 'primeng/orderlist';
import { InventoryService } from '../adapters/api/inventory.service';
import { Product } from '../domain/models/product';
import { ListboxModule } from 'primeng/listbox';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InventoryTableComponent,
    OrderListModule,
    ListboxModule,
    ProductDetailComponent, FormsModule
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products!: Product[];
  errorMessage: string | null = null;
  selectedProduct!: Product;

  constructor(private inventoryService: InventoryService){}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(

      {     
        next: (data) => {
        this.products = data.slice(0, 20);
        this.errorMessage = null;
        // console.log(data)
        if (this.products.length > 0) {
          this.selectedProduct = this.products[0];  
          this.onProductSelect({ value: this.selectedProduct }); 
        }
      },
        error: (err) => {
          this.errorMessage = `ERROR: ${err.message}`;
      }
      }
    );
  };

  onProductSelect(event: any) {
    this.selectedProduct = event.value;
  }
}
