import { Component } from '@angular/core';
import { ProductPageCard } from "../../components/product-page-card/product-page-card";
import { ProductPageHeader } from "../../components/product-page-header/product-page-header";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-products',
  imports: [ProductPageCard, ProductPageHeader, Footer],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {

}
