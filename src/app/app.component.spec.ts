import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { ThemeService } from './adapters/theme-service';

describe('AppComponent', () => {
  let mockThemeService: any;
  beforeEach(async () => {
    mockThemeService = {
      switchTheme: jasmine.createSpy('switchTheme')
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'SGI' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SGI');
  });
});
