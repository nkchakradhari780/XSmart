import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { Products } from "./pages/products/products";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Products],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
