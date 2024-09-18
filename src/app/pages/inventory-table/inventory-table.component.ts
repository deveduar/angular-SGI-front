import { Component, viewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InventoryService, Product } from '../../adapters/api/inventory.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss'
})

export class InventoryTableComponent {

  products!: Product[];
  errorMessage: string | null = null;
  // rateKey: string = '';
  loading: boolean = true;

  @ViewChild('dt2') dt2!: Table;

  constructor(private inventoryService: InventoryService){}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(

      {     
        next: (data) => {
        this.products = data;
        this.errorMessage = null;
        this.loading = false;
      },
        error: (err) => {
          this.errorMessage = `ERROR: ${err.message}`;
      }
      }
    );
  };

  onFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains')
    }
  }

}
