import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';

import { ThemeService } from '../../adapters/theme-service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  currentTheme = 'lara-dark-blue';
  constructor(private themeService: ThemeService) {}


  ngOnInit() {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        route: ''
      },
      {
        label: 'Inventory',
        icon: 'pi pi-box',
        items: [
          {
            label: 'View Products',
            icon: 'pi pi-list',
            shortcut: 'Ctrl+P',
            route: '/inventory'

          },
          {
            label: 'Edit Products',
            icon: 'pi pi-plus',
            shortcut: 'Ctrl+N',
            route: '/inventory-table'
          },
          // {
          //   label: 'Stock Levels',
          //   icon: 'pi pi-chart-line',
          //   shortcut: 'Ctrl+S'
          // }
        ]
      },
      // {
      //   label: 'Orders',
      //   icon: 'pi pi-shopping-cart',
      //   items: [
      //     {
      //       label: 'View Orders',
      //       icon: 'pi pi-eye',
      //       shortcut: 'Ctrl+O'
      //     },
      //     {
      //       label: 'Create Order',
      //       icon: 'pi pi-plus',
      //       shortcut: 'Ctrl+N'
      //     }
      //   ]
      // },
      // {
      //   label: 'Suppliers',
      //   icon: 'pi pi-truck',
      //   items: [
      //     {
      //       label: 'View Suppliers',
      //       icon: 'pi pi-users',
      //       shortcut: 'Ctrl+S'
      //     },
      //     {
      //       label: 'Add Supplier',
      //       icon: 'pi pi-plus',
      //       shortcut: 'Ctrl+N'
      //     }
      //   ]
      // },
      // {
      //   label: 'Reports',
      //   icon: 'pi pi-chart-bar',
      //   items: [
      //     {
      //       label: 'Sales Report',
      //       icon: 'pi pi-dollar',
      //       badge: '3'
      //     },
      //     {
      //       label: 'Inventory Report',
      //       icon: 'pi pi-chart-pie',
      //       badge: '5'
      //     }
      //   ]
      // }
    ];
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'lara-light-blue' ? 'lara-dark-blue' : 'lara-light-blue';
    this.themeService.switchTheme(this.currentTheme);
  }
  
}
