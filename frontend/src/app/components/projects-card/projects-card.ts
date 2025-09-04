import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-projects-card',
  standalone: true, // if you are using standalone components
  imports: [CommonModule],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.css'
})
export class ProjectsCard implements OnChanges {

  @Input() project: any;

  projectTags: string[] = [];
  projectImageBase64: string | null = null;

  ngOnChanges() {
    this.projectTags = this.project?.Tags || [];
    this.projectImageBase64 = this.project?.Images?.length ? this.project.Images[0] : null;
  }

  getImageSrc(base64: string | null): string {
    return base64
      ? `data:image/png;base64,${base64}`
      : 'assets/placeholder.png';
  }
}
