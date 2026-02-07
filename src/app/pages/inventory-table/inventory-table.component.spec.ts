import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryTableComponent } from './inventory-table.component';
import { InventoryService } from '../../adapters/api/inventory.service';
import { of } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';

describe('InventoryTableComponent', () => {
  let component: InventoryTableComponent;
  let fixture: ComponentFixture<InventoryTableComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([])),
      getProductsMini: jasmine.createSpy('getProductsMini').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [InventoryTableComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        MessageService,
        ConfirmationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
