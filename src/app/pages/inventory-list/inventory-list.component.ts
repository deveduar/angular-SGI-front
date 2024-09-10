import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../adapters/api/inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {
    products: any[] = [];

    constructor(private inventoryService: InventoryService){}

    ngOnInit(): void {
      this.inventoryService.getProducts().subscribe(
        (data) => {
          this.products = data;
          console.log(data);
        }
      );
    };

}
