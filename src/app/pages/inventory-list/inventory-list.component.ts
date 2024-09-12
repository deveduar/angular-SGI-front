import { Component, OnInit } from '@angular/core';
import { InventoryService, Product } from '../../adapters/api/inventory.service';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';



@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule, RatingModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})

export class InventoryListComponent {
    products: Product[] = [];
    errorMessage: string | null = null;

    constructor(private inventoryService: InventoryService){}

    ngOnInit(): void {
      this.inventoryService.getProducts().subscribe(
        // (data) => {
        //   this.products = data;
        // }

        {     
          next: (data) => {
          this.products = data;
          this.errorMessage = null;
          console.log(data)
        },
          error: (err) => {
            this.errorMessage = `ERROR: ${err.message}`;
        }
        }
      );
    };

    getSeverity (product: Product) {
      switch (product.inventoryStatus) {
          case 'INSTOCK':
              return 'success';

          case 'LOWSTOCK':
              return 'warning';

          case 'OUTOFSTOCK':
              return 'danger';

          default:
              return null;
      }
  };
}
