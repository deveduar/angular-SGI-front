import { Component} from '@angular/core';
import { InventoryService } from '../../adapters/api/inventory.service';
import { Product } from '../../domain/models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild, OnInit } from '@angular/core';

import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api'

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
// import { FileUploadModule } from 'primeng/fileupload';
import * as Papa from 'papaparse';

interface FormattedProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  Rate: number;
  RatingCount: number;
}


@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule, InputTextModule, IconFieldModule, InputIconModule, DialogModule, RippleModule,ToastModule, ToolbarModule, ConfirmDialogModule, InputTextareaModule, DropdownModule, RadioButtonModule, InputNumberModule],
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss'
})

export class InventoryTableComponent implements OnInit {

  products!: Product[];
  errorMessage: string | null = null;
  // rateKey: string = '';
  loading = true;

  @ViewChild('dt2') dt2!: Table;

  selectedProducts!:Product[] | null;
  product!: Product;
  submitted = false;
  productDialog = false;

  categories: string[] = []; 

  constructor(private inventoryService: InventoryService, private confirmationService:ConfirmationService, private messageService: MessageService){}

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(

      {     
        next: (data) => {
        this.products = data;
        this.errorMessage = null;
        this.loading = false;
        this.categories = [...new Set(data.map(product => product.category))];
      },
        error: (err) => {
          this.errorMessage = `ERROR: ${err.message}`;
      }
      }
    );
  };

  onFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt2.filterGlobal(inputElement.value, 'contains')
    }
  }

  onOpenNew() {
    this.product = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      images: { front: '', preview: '' },  // Inicializar las imágenes
      rating: { rate: 0, count: 0 }
    };
    this.submitted = false;
    this.productDialog = true;
  }

  onDeleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
          this.selectedProducts = null;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
  });
  }

  onEditProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  onDeleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Filtrar para eliminar el producto de la lista
        this.products = this.products.filter((val) => val.id !== product.id);
  
        // Reiniciar el producto seleccionado con el nuevo formato de imágenes
        this.product = {
          id: 0, 
          title: '',
          price: 0,
          description: '',
          category: '',
          images: { front: '', preview: '' },  // Cambiado de image a images
          rating: { rate: 0, count: 0 }
        };
  
        // Mostrar un mensaje de éxito al eliminar
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }
  

  onSaveProduct() {
    this.submitted = true;
  
    if (this.product.title?.trim() && this.product.description?.trim() && this.product.price > 0) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.images = { front: 'https://placehold.co/600x400/png', preview: 'https://placehold.co/600x400/png' };  // Usar imágenes por defecto
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Product Created', detail: 'Product Added', life: 3000 });
      }
  
      this.products = [...this.products];
      this.productDialog = false;
      this.resetProduct();
    }
  }
  
  resetProduct() {
    this.product = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      images: { front: '', preview: '' },
      rating: { rate: 0, count: 0 }
    };
  }
  

  onHideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }

  createId(): number {
    return this.products.length > 0 
        ? Math.max(...this.products.map(product => product.id)) + 1 
        : 1;
  }

  exportToCSV(): void {
    const formattedProducts: FormattedProduct[] = this.products.map(product => {
      const clonedProduct: FormattedProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.images.front,  // O cambiar a product.images.preview si prefieres esa imagen
        Rate: product.rating?.rate || 0,
        RatingCount: product.rating?.count || 0
      };
  
      return clonedProduct;
    });
  
    const csv = Papa.unparse(formattedProducts);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'products.csv');
    a.click();
  }
  



}
