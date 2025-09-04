import { Component, AfterViewInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ProductsCard } from '../../components/products-card/products-card';
import { ProjectsCard } from '../../components/projects-card/projects-card';
import { ContactCard } from '../../components/contact-card/contact-card';
import { Footer } from "../../components/footer/footer";
import { RouterLink } from '@angular/router';
import { Product, ProductResponse, ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { ProjectResponse, ProjectService } from '../../services/project-service';


@Component({
  selector: 'app-home',
  imports: [Navbar, ProductsCard, ProjectsCard, ContactCard, Footer, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home implements AfterViewInit {

  data!: ProductResponse;
  products: Product[] = [];

  projectData!: ProjectResponse;
  projects: any[] = [];

  constructor(private productService: ProductService, private projectService: ProjectService) {}

  ngOnInit() {
    this.productService.getLatestProducts().subscribe({
      next: (response) => {
        this.data = response;
        this.products = this.data.result;
        console.log("Response: ", this.products)
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
    
    this.projectService.getLatestProjects().subscribe({
      next: (response) => {
        this.projectData = response;
        this.projects = this.projectData.result;
        console.log("Projects: ", this.projects);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    })
  }

  ngAfterViewInit() {
    const heroSection = document.querySelector('#heroSection')!;
    const content = heroSection.querySelector('.hero-content')!;
    const image = heroSection.querySelector('.hero-image')!;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            content.classList.add('animate-slide-in-left');
            image.classList.add('animate-slide-in-right');
          } else {
            // Remove animation classes when leaving viewport
            content.classList.remove('animate-slide-in-left');
            image.classList.remove('animate-slide-in-right');
          }
        });
      },
      { threshold: 0 } // triggers when 30% of section is visible
    );

    observer.observe(heroSection);
  }
}
