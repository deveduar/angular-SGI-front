import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';

import { InventoryTableComponent } from './pages/inventory-table/inventory-table.component';

import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'inventory',
        component: InventoryListComponent
    },
    {
        path: 'inventory-table',
        component: InventoryTableComponent
    },
    {
        path: 'product/:id',
        component: ProductPageComponent
    },
    { 
        path: 'category/:category', 
        component: CategoryPageComponent 
    }
];
