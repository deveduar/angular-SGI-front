import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { InventoryService } from '../../adapters/api/inventory.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
