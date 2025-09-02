import { Component } from '@angular/core';
import { ProductPageCard } from "../../components/product-page-card/product-page-card";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { Product, ProductResponse, ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [ProductPageCard, Footer, Navbar, CommonModule, ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

  data!: ProductResponse;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log('Initializing products component...');
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.data = response;
        this.products = this.data.result;
        console.log('Fetched products:', this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    })
  }
}
