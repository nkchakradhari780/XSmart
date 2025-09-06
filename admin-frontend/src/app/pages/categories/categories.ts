import { Component } from '@angular/core';
import { AdminService, CategoryResponse } from '../../services/admin-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
  categories : CategoryResponse[] = [];
  categoryModel: any = {CategoryName: ''}
  constructor(private service: AdminService, private router: Router) {}

  onSubmit(){
    this.service.createCategory(this.categoryModel.CategoryName).subscribe({
      next: (response: CategoryResponse) => {
        alert("Category Created Successfully!")
      }, 
      error: (error: any) => {
        console.log("Error Creating Category: ", error)
        alert("Error Creating Category.")
      }
    })
  }

  ngOnInit() {
    this.service.getAllCategories().subscribe({
      next: (response: CategoryResponse[]) => {
        this.categories = response;
        console.log("All Categories: ", this.categories)
      }, 
      error: (error: any) => {
        console.log("Error Fetching Categories: ", error)
        alert("Error Fetching Categories.")
      }
    })
  }

  goToUpdate(categoryId: number) {
    const adminId = 3; 
    console.log("Navigating to update category with ID:", categoryId);
    this.router.navigate([`/dashboard/${adminId}/categories/update/${categoryId}`]);
  }

}
