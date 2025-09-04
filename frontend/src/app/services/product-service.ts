import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  createProduct(product: Product) {
    return this.http.post<Product>('http://localhost:3000/product', product);
  }

  getAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>('http://localhost:3000/product');
  }

  getLatestProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>('http://localhost:3000/product/latest/three');
  }

}

export class Product {
  ProductId!: number;
  ProductName!: string;
  Categories!: Array<Category>
  Image!: Blob;
  PdfFile!: Blob;
}

export class ProductResponse {
  result!: Array<Product>;
  response!: string;
}

export class Category {
  categoryId!: number;
  categoryName!: string;
}