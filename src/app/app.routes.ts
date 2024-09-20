import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryListComponent } from './pages/inventory-list/inventory-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';



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
        path: 'product/:id',
        component: ProductDetailComponent
    }
];
