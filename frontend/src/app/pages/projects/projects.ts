import { Component, NgModule } from '@angular/core';
import { ProjectPageHeader } from '../../components/project-page-header/project-page-header';
import { CommonModule } from '@angular/common';
import { ProjectPageCard } from "../../components/project-page-card/project-page-card";
import { Footer } from "../../components/footer/footer";
import { RouterLink } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-projects',
  imports: [ProjectPageHeader, CommonModule, ProjectPageCard, Footer, RouterLink, Navbar],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects {
categories = ['All Projects', 'Residential', 'Commercial', 'Hospitality'];
  activeCategory = 'All Projects'; 
  setActive(category: string) {
    this.activeCategory = category;
  }
}
