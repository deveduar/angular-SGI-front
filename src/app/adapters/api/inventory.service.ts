import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product';


@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  private apiUrl = 'https://fakestoreapi.com/products?limit=20';
  private productDetailUrl = 'https://fakestoreapi.com/products'; 

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.productDetailUrl}/${id}`;
    return this.http.get<Product>(url);
  }



}
