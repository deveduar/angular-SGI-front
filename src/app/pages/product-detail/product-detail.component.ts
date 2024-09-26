import { Component, Input } from '@angular/core';
import { Product } from '../../domain/models/product';
import { InventoryService } from '../../adapters/api/inventory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @Input() product?: Product;

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {}
  
  ngOnInit(): void {
    if (!this.product) {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.inventoryService.getProductById(+productId).subscribe((product: Product) => {
          this.product = product;
        });
      }
    }
  }

}
