import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductCarouselComponent } from '../product-carousel/product-carousel.component';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductDetailComponent, ProductCarouselComponent, CommonModule, BreadcrumbModule, ImageModule, ButtonModule, TagModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product: Product | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  selectedVariant!: Product['variants'][0]; 
  selectedColor!: string;
  selectedSize!: string;
  
  filteredVariants: Product['variants'] = [];
  availableColors: string[] = [];
  availableSizes: string[] = [];

  colorMap: { [key: string]: string } = {
    'Black Heather': '#1F1B1B',
    'Dark Heather': '#1F1B1B',
    'Light Blue': '#ADD8E6',
    'Faded Black': "#282829",
    'Red': '#FF0000',
    'Green': '#00FF00',
    'Blue': '#0000FF',
    'Maroon': '#800000',
    'Navy': '#000080',
    'Navy Blazer': '#000080',
    'Black': '#000000',
    'White': '#FFFFFF',
    'Orange': '#FFA500',
    'Yellow': '#FFFF00',
    'Purple': '#800080',
    'Teal': '#008080',
    'Pink': '#FFC0CB',
    'Brown': '#A52A2A',
    // Agrega más colores según sea necesario
  };

  availabilitySeverity: 'success' | 'danger' = 'danger';
  availabilityStatus: string = 'Stockout';

  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.inventoryService.getProductById(+productId).subscribe((product: Product) => {
          this.product = product;
          this.setupBreadcrumb(product);
          console.log(product);

          this.selectedVariant = this.product.variants[0];
          this.selectedColor = this.selectedVariant.color;
          this.selectedSize = this.selectedVariant.size;
          
          this.loadAvailableColors();
          this.loadAvailableSizes();

          if (this.product.availability_status === 'active') {
            this.availabilitySeverity = 'success';
            this.availabilityStatus = 'Stock';
          } else {
            this.availabilitySeverity = 'danger';
            this.availabilityStatus = 'Stockout';
          }
        });
      }
    });
    this.home = { icon: 'pi pi-home', routerLink: '/inventory' };
  }

  // Cargar colores disponibles para la talla seleccionada
  loadAvailableColors(): void {
    const colorSet = new Set<string>();
    this.product?.variants.forEach(variant => {
      if (variant.size === this.selectedSize) {
        colorSet.add(variant.color);
      }
    });
    this.availableColors = Array.from(colorSet);
  }

  // Cargar tallas disponibles para el color seleccionado
  loadAvailableSizes(): void {
    const sizeSet = new Set<string>();
    this.product?.variants.forEach(variant => {
      if (variant.color === this.selectedColor) {
        sizeSet.add(variant.size);
      }
    });
    this.availableSizes = Array.from(sizeSet);
  }

  onSizeSelect(size: string): void {
    this.selectedSize = size;
    this.selectedVariant = this.product?.variants.find(
      variant => variant.size === size && variant.color === this.selectedColor
    )!;
    this.loadAvailableColors(); // Actualizar los colores disponibles para esta talla
  }

  onColorSelect(color: string): void {
    this.selectedColor = color;
    this.selectedVariant = this.product?.variants.find(
      variant => variant.color === color && variant.size === this.selectedSize
    )!;
    this.loadAvailableSizes(); // Actualizar las tallas disponibles para este color
  }

  setupBreadcrumb(product: Product): void {
    this.items = [
      { label: product.category || 'Category', routerLink: `/category/${product.category}` }, 
      { label: product.title, routerLink: `/product/${product.id}` }
    ];
  }

  getColorHex(colorName: string): string {
    return this.colorMap[colorName] || '#FFFFFF';
  }
}
