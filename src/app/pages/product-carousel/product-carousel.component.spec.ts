import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCarouselComponent } from './product-carousel.component';
import { InventoryService } from '../../adapters/api/inventory.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('ProductCarouselComponent', () => {
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [ProductCarouselComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
