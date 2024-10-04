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
        themeLink.href = `assets/themes/${theme}/theme.css`;
        const body = document.body;
        if (theme.includes('dark')) {
          body.classList.add('dark-theme');
          body.classList.remove('light-theme');
        } else {
          body.classList.add('light-theme');
          body.classList.remove('dark-theme');

        }
      } else {
        console.error('Theme link element not found');
      }
    }
  }
}
