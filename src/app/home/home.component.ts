import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
// import { InventoryListComponent } from '../pages/inventory-list/inventory-list.component';
import { InventoryTableComponent } from '../pages/inventory-table/inventory-table.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InventoryTableComponent
  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  saludar: string = ""
  
  OnSaludar() {
    this.saludar = "holaa"
  }
}
