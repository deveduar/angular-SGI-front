import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../domain/models/product';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductCarouselComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product?: Product;
}
