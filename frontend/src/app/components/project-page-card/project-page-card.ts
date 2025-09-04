import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Input, OnChanges } from '@angular/core';
import Swiper from 'swiper';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Material, Tag } from '../../services/project-service';

// register modules globally
Swiper.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-project-page-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-page-card.html',
  styleUrls: ['./project-page-card.css']
})
export class ProjectPageCard implements OnChanges, AfterViewInit {

  @Input() project: any;

  projectTags: Tag[] = [];
  projectMaterials: Material[] = [];
  projectImages: string[] = [];  // ✅ renamed for clarity

  ngOnChanges() {
    this.projectTags = this.project?.Tags || [];
    this.projectMaterials = this.project?.Materials || [];

    // ✅ reset before pushing to avoid duplicates
    this.projectImages = this.project?.Images?.map((img: any) => img.Base64) || [];
  }

  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      loop: true,
      autoplay: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }

  getImageSrc(base64: string | null): string {
    return base64
      ? `data:image/png;base64,${base64}`
      : 'assets/placeholder.png';
  }
}
