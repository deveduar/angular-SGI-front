import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPageComponent } from './product-page.component';
import { InventoryService } from '../../adapters/api/inventory.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([])),
      getProductById: jasmine.createSpy('getProductById').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ProductPageComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
