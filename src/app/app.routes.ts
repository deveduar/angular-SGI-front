import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'inventory',
        component: InventoryListComponent
    }
];
