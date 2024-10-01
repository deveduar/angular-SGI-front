import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductDetailComponent, ProductCarouselComponent, CommonModule, BreadcrumbModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  product: Product | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    // const productId = this.route.snapshot.paramMap.get('id');
    // if (productId) {
    //   this.inventoryService.getProductById(+productId).subscribe((product: Product) => {
    //     this.product = product;
    //   });
    // }
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.inventoryService.getProductById(+productId).subscribe((product: Product) => {
          this.product = product;
          this.setupBreadcrumb(product);
        });
      }
    });

    this.home = { icon: 'pi pi-home', routerLink: '/inventory' };
  }

  setupBreadcrumb(product: Product): void {
    this.items = [
      { label: product.category || 'Category', routerLink: `/category/${product.category}` }, 
      { label: product.title, routerLink: `/product/${product.id}` }
    ];
  }
}
