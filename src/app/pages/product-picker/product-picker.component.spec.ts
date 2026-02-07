import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPickerComponent } from './product-picker.component';
import { InventoryService } from '../../adapters/api/inventory.service';
import { of } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';

describe('ProductPickerComponent', () => {
  let component: ProductPickerComponent;
  let fixture: ComponentFixture<ProductPickerComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([])),
      getProductsMini: jasmine.createSpy('getProductsMini').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [ProductPickerComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        MessageService,
        ConfirmationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
