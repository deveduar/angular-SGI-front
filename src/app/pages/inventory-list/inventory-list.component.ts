import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';

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

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

type sortField = "price" | "id";

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule, RatingModule, PaginatorModule, DropdownModule, FormsModule, RouterModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})

export class InventoryListComponent {


    products!: Product[];
    errorMessage: string | null = null;
    
    sortOptions!: SelectItem[];
    sortOrder!: number;
    // sortField!: string;
    sortField: sortField = 'price';
    // sortKey: SortKey = 'price';

    layout: string = 'list' ;

    searchTerm: string = '';
    filteredProducts: Product[] = [];

    categoryOptions: any[] = [];
    selectedCategory: string = '';
    categories: string[] = [];

    constructor(private inventoryService: InventoryService){}

    ngOnInit(): void {
      this.inventoryService.getProducts().subscribe(

        {     
          next: (data) => {
          this.products = data;
          this.errorMessage = null;
          // console.log(data)

          this.filteredProducts = [...this.products];
          this.categories = [...new Set(this.products.map(product => product.category))];
          this.categoryOptions = this.categories.map(category => ({
            label: category, 
            value: category
          }));
          
          this.categoryOptions.unshift({ label: 'All Categories', value: '' });

          this.sortField = 'id';
          this.sortOrder = 1;
        },
          error: (err) => {
            this.errorMessage = `ERROR: ${err.message}`;
        }
        }
      );

      this.sortOptions = [
        { label: 'Sort by ID', value: 'id' },
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
      this.applySort();
    }

    onSearchChange() {
      this.filteredProducts = this.products.filter(product =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
          (this.selectedCategory ? product.category === this.selectedCategory : true)
      );
      this.applySort();
    }

    onCategoryChange(event: any) {
      this.selectedCategory = event.value;
      this.searchTerm = '';

      if (!this.selectedCategory || this.selectedCategory === '') {
        this.filteredProducts = [...this.products];
      } else {
        // Filtra los productos por la categoría seleccionada
        this.filteredProducts = this.products.filter(product =>
          product.category === this.selectedCategory
        );
      }
      this.applySort();
    }

    applySort() {
      if (this.sortField) {
          this.filteredProducts.sort((a, b) => {
              const isAsc = this.sortOrder === 1;
              const comparison = a[this.sortField] < b[this.sortField] ? -1 : 1;
              return isAsc ? comparison : -comparison;
          });
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
