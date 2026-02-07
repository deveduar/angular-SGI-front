import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryListComponent } from './inventory-list.component';
import { InventoryService } from '../../adapters/api/inventory.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [InventoryListComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
