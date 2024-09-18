import { Component, OnInit } from '@angular/core';
import { InventoryService, Product } from '../../adapters/api/inventory.service';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule, RatingModule, PaginatorModule, DropdownModule, FormsModule, RouterModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})

export class InventoryListComponent {
    products!: Product[];
    errorMessage: string | null = null;
    
    sortOptions!: SelectItem[];
    sortOrder!: number;
    sortField!: string;
    sortKey: string = '';

    layout: string = 'list' ;

    constructor(private inventoryService: InventoryService){}

    ngOnInit(): void {
      this.inventoryService.getProducts().subscribe(

        {     
          next: (data) => {
          this.products = data;
          this.errorMessage = null;
          // console.log(data)
        },
          error: (err) => {
            this.errorMessage = `ERROR: ${err.message}`;
        }
        }
      );

      this.sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
      ];
    };

    onSortChange(event: any) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }


  //   getSeverity (product: Product) {
  //     switch (product.inventoryStatus) {
  //         case 'INSTOCK':
  //             return 'success';

  //         case 'LOWSTOCK':
  //             return 'warning';

  //         case 'OUTOFSTOCK':
  //             return 'danger';

  //         default:
  //             return null;
  //     }
  // };
}
