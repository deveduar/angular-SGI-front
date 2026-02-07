import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../adapters/theme-service';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: any;

  beforeEach(async () => {
    mockThemeService = {
      switchTheme: jasmine.createSpy('switchTheme')
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
