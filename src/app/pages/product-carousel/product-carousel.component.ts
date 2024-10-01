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
  products: Product[] = [];
  // products!: Product[];


  @Input() context: 'detail' | 'page' = 'page'; 
  @Input() category: string | undefined;
  @Input() excludedProduct?: Product;

  @Input() resetPagination: boolean = false;
  page: number = 0;
  @Input() showTopProducts: boolean = false;

  responsiveOptions: any[] | undefined;
  errorMessage: string | null = null;
  
  filteredProducts: Product[] = [];


  constructor(private  inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(
      {
      next: (data) => {
        this.products = data;
        // this.setResponsiveOptions();
        this.filterProductsByCategory();
      },
      error: (err) => {
        this.errorMessage = `ERROR: ${err.message}`;
      }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['context']) {
      this.setResponsiveOptions();
    }
    if (changes['category'] || changes['excludedProduct'] || changes['resetPagination']) {
      this.filterProductsByCategory();
      if (this.resetPagination) {
        this.page = 0; 
        // this.resetPagination = false;
      }
    }
  }

  filterProductsByCategory(): void {
    // if (this.products.length > 0) {
    //   if (this.category) {
    //     this.filteredProducts = this.products.filter(product => product.category === this.category);
    //   } else {
    //     this.filteredProducts = [...this.products]; 
    //   }
    // }
    // if (this.excludedProduct) {
    //   this.filteredProducts = this.filteredProducts.filter(product => product.id !== this.excludedProduct?.id);
    // }
    if (this.products.length > 0) {
      if (this.showTopProducts) {
        // Filtrar productos por rating
        this.filteredProducts = [...this.products]
          .sort((a, b) => b.rating.rate - a.rating.rate)
          .slice(0, 12);
      } else if (this.category) {
        this.filteredProducts = this.products.filter(product => product.category === this.category);
      } else {
        this.filteredProducts = [...this.products]; 
      }
    }
    if (this.excludedProduct) {
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== this.excludedProduct?.id);
    }

  }

  handlePageChange(pageNumber: number | undefined): void {
  if (pageNumber !== undefined) {
    setTimeout(() => {
      this.page = pageNumber;
    });
  } else {
    this.page = 0;
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
