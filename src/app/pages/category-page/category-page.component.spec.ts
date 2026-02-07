import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryPageComponent } from './category-page.component';
import { InventoryService } from '../../adapters/api/inventory.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let mockInventoryService: any;

  beforeEach(async () => {
    mockInventoryService = {
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([])),
      getProductById: jasmine.createSpy('getProductById').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [CategoryPageComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
