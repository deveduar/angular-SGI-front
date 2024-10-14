import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Product } from '../../domain/models/product';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  private apiUrl = 'http://localhost:3000/api/products';
  private productsCache: Product[] | null = null;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (this.productsCache) {
      return of(this.productsCache);  // Devuelve los productos cacheados si ya se han cargado
    }
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsCache = products)  // Almacena los productos en caché
    );
  }

  getProductById(id: number): Observable<Product> {
    if (this.productsCache) {
      const product = this.productsCache.find(p => p.id === id);
      if (product) {
        return of(product as Product);  

      }
      // return of(product as Product);
    }
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

}
