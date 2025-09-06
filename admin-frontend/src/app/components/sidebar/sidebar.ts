import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink],
  providers: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  isActive=true;
  name!: string;
  role: string = 'user'; // Default role
  amount!: number;
  userData: any;
  userId!: number ; // Default userId, can be set dynamically


  
}
