import { Component } from '@angular/core';
import { AdminService, Product, ProductResponse } from '../../services/admin-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductPageCard } from '../../components/product-page-card/product-page-card';

@Component({
  selector: 'app-products',
  imports: [RouterLink,CommonModule,ProductPageCard],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
 data!: ProductResponse;
  products: Product[] = [];

  userId: number = 3;

  constructor(private service: AdminService) { }

  ngOnInit() {
    console.log('Initializing products component...');
    this.service.getAllProducts().subscribe({
      next: (response) => {
        this.data = response;
        this.products = this.data.result;
        console.log('Fetched products:', this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
