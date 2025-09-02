import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'] // <-- typo fix: should be styleUrls (plural)
})
export class Navbar {
  @Input() position: 'absolute' | 'fixed' | 'relative' | 'sticky' = 'absolute';
}
