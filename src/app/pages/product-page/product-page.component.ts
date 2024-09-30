import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductDetailComponent, ProductCarouselComponent, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  product: Product | undefined;

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
        });
      }
    });
  }
}
