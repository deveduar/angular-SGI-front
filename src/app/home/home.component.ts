import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductPickerComponent } from '../pages/product-picker/product-picker.component';
import { InventoryService } from '../adapters/api/inventory.service';
import { Product } from '../domain/models/product';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { ProductCarouselComponent } from '../pages/product-carousel/product-carousel.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductDetailComponent, 
    ProductPickerComponent,
    ProductCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products!: Product[];
  errorMessage: string | null = null;

  constructor(private inventoryService: InventoryService){}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(

      {     
        next: (data) => {
        this.products = data.slice(0, 20);
        this.errorMessage = null;
      },
        error: (err) => {
          this.errorMessage = `ERROR: ${err.message}`;
      }
      }
    );
  };
}
