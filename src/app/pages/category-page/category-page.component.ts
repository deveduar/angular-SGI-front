import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
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
import { ListboxModule } from 'primeng/listbox';
// import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';



@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule, TagModule, ButtonModule, RatingModule, FormsModule, RouterModule, DataViewModule, ListboxModule, MenubarModule, DropdownModule ],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent {
  category: string | undefined;
  products: Product[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  errorMessage: string | undefined;

  categories: string[] = [];
  itemsBar: MenuItem[] | undefined;

  constructor(private route: ActivatedRoute,private router: Router, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.loadProductsByCategory();
      this.setupBreadcrumb();

      });

    this.home = { icon: 'pi pi-home', routerLink: '/inventory' };
    // this.setupItemsBar();

  }

  loadProductsByCategory(): void {
    if (this.category) {
      this.inventoryService.getProducts().subscribe({
        next: (data) => {
          this.products = data.filter(product => product.category === this.category);
        this.categories = [...new Set(data.map(product => product.category))]; 
        this.setupItemsBar();
        },
        error: (err) => {
          this.errorMessage = `ERROR: ${err.message}`;
        }
        
      });
    }
  }

  setupItemsBar(): void {
    this.itemsBar = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: `/inventory`
      },
      {
        label: 'Categories',
        icon: 'pi pi-search',
        items: this.categories.map(category => ({
          label: category,
          icon: 'pi pi-tag',
          command: () => this.onCategoryChange(category)
        }))
      }
    ];
  }

  setupBreadcrumb(): void {
    this.items = [
      { label: this.category || 'Category' }
    ];
  }
  onCategoryChange(selectedCategory: string): void {
    this.router.navigate(['/category', selectedCategory]); 
  }


}
  

