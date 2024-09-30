import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../domain/models/product';
import { InventoryService } from '../../adapters/api/inventory.service';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, RouterModule],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {
  products!: Product[];

  @Input() context: 'detail' | 'page' = 'page'; 

  responsiveOptions: any[] | undefined;
  errorMessage: string | null = null;
  
  constructor(private  inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(
      {
      next: (data) => {
        this.products = data;
        // this.setResponsiveOptions();
      },
      error: (err) => {
        this.errorMessage = `ERROR: ${err.message}`;
      }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['context']) {
      // Detecta cambios en el contexto y actualiza las responsiveOptions
      this.setResponsiveOptions();
    }
  }


  setResponsiveOptions(): void {
    if (this.context === 'detail') {
      this.responsiveOptions = [
        {
            breakpoint: '1800px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '1200px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '700px',
            numVisible: 1,
            numScroll: 1
        }
      ];
    } else {
      this.responsiveOptions = [
        {
          breakpoint: '1400px',
          numVisible: 4,
          numScroll: 4
      },
      {
          breakpoint: '1130px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '900px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '750px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '400px',
          numVisible: 1,
          numScroll: 1
      }
      ];
    }
  }

}
