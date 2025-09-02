import { Component, AfterViewInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { ProductsCard } from '../../components/products-card/products-card';
import { ProjectsCard } from '../../components/projects-card/projects-card';
import { ContactCard } from '../../components/contact-card/contact-card';
import { Footer } from "../../components/footer/footer";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [Navbar, ProductsCard, ProjectsCard, ContactCard, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home implements AfterViewInit {
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
      { threshold: 0.3 } // triggers when 30% of section is visible
    );

    observer.observe(heroSection);
  }
}
