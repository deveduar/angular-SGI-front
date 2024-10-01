import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, TagModule, ButtonModule, RatingModule, FormsModule, RouterModule, DataViewModule ],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  category: string | undefined;
  products: Product[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  errorMessage: string | undefined;

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.loadProductsByCategory();
      this.setupBreadcrumb();
    });

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  loadProductsByCategory(): void {
    if (this.category) {
      this.inventoryService.getProducts().subscribe({
        next: (data) => {
          this.products = data.filter(product => product.category === this.category);
        },
        error: (err) => {
          this.errorMessage = `ERROR: ${err.message}`;
        }
      });
    }
  }

  setupBreadcrumb(): void {
    this.items = [
      { label: this.category || 'Category' }
    ];
  }
}
