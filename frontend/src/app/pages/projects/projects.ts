import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPageCard } from "../../components/project-page-card/project-page-card";
import { Footer } from "../../components/footer/footer";
import { RouterLink } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";
import { ProjectResponse, ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectPageCard, Footer, RouterLink, Navbar],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects {
  projectData!: ProjectResponse;
  projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  categories = ['All Projects', 'Residential', 'Commercial', 'Hospitality'];
  activeCategory = 'All Projects';
  setActive(category: string) {
    this.activeCategory = category;
  }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe({
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
}
