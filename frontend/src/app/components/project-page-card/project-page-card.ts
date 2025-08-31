import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// register modules globally
Swiper.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-project-page-card',
  standalone: true,
  templateUrl: './project-page-card.html',
  styleUrls: ['./project-page-card.css']
})
export class ProjectPageCard implements AfterViewInit {

  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      loop: true,
      autoplay: { delay: 3000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }
}
