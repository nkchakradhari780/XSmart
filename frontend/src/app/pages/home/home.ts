import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ProductsCard } from '../../components/products-card/products-card';
import { ProjectsCard } from '../../components/projects-card/projects-card';
import { ContactCard } from '../../components/contact-card/contact-card';
import { Footer } from "../../components/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Navbar, ProductsCard, ProjectsCard, ContactCard, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
