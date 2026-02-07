import { Component, input, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule, RatingModule, PaginatorModule, DropdownModule, FormsModule, RouterModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {

  // Inputs
  selectedCategoryFromUrl = input<string>('');

  // Services
  private inventoryService = inject(InventoryService);

  // State Signals
  products = signal<Product[]>([]);
  sortOption = signal<string>('id');
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('');
  errorMessage = signal<string | null>(null);

  // Computed
  categories = computed(() => [...new Set(this.products().map(product => product.category))]);

  categoryOptions = computed(() => {
    const cats = this.categories().map(category => ({ label: category, value: category }));
    return [{ label: 'All Categories', value: '' }, ...cats];
  });

  filteredProducts = computed(() => {
    let result = this.products();

    // Filter Category
    const category = this.selectedCategory();
    if (category) {
      result = result.filter(p => p.category === category);
    }

    // Filter Search
    const term = this.searchTerm().toLowerCase();
    if (term) {
      result = result.filter(p => p.title.toLowerCase().includes(term));
    }

    // Sort
    const sortVal = this.sortOption();
    let field = sortVal;
    let order = 1;

    if (sortVal.startsWith('!')) {
      order = -1;
      field = sortVal.substring(1);
    }

    if (field) {
      result = [...result].sort((a, b) => {
        const valA = (a as any)[field];
        const valB = (b as any)[field];
        let comparison = 0;
        if (valA < valB) comparison = -1;
        else if (valA > valB) comparison = 1;
        return comparison * order;
      });
    }
    return result;
  });

  // Constants
  sortOptions: SelectItem[] = [
    { label: 'Sort by ID', value: 'id' },
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];

  layout = 'list'; // kept as property or signal? DataView uses it? 
  // DataView usually manages layout internally or via [layout]="layout".
  // Original code had `layout = 'list'`.

  constructor() {
    this.inventoryService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.sortOption.set('id');
      },
      error: (err) => this.errorMessage.set(`ERROR: ${err.message}`)
    });

    effect(() => {
      const urlCat = this.selectedCategoryFromUrl();
      if (urlCat) {
        this.selectedCategory.set(urlCat);
      }
    });
  }

  // Event Handlers
  onSortChange(event: { value: string }) {
    this.sortOption.set(event.value);
  }

  onCategoryChange(event: { value: string }) {
    this.selectedCategory.set(event.value);
    this.searchTerm.set('');
  }

  // onSearchChange removed as computed handles it.
  // But we need to update the signal from template.
  updateSearchTerm(term: string) {
    this.searchTerm.set(term);
  }
}
