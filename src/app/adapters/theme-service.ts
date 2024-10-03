import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  switchTheme(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
      const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
      if (themeLink) {
        // Aquí aseguramos que la ruta apunte a la carpeta assets/themes
        themeLink.href = `assets/themes/${theme}/theme.css`;
      } else {
        console.error('Theme link element not found');
      }
    }
  }
}
