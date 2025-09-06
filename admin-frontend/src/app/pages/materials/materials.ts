import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materials',
  imports: [FormsModule, CommonModule],
  templateUrl: './materials.html',
  styleUrl: './materials.css'
})
export class Materials {
  materials : any[] = [];
  materialModel: any = {MaterialName: ''}

  constructor(private service: AdminService, private router: Router) {}

  onSubmit() {
    this.service.createMaterial(this.materialModel.MaterialName).subscribe({
      next: (response: any) => {
        alert("Material Created Successfully!")
      }, 
      error: (error: any) => {
        console.log("Error Creating Material: ", error)
        alert("Error Creating Material.")
      }
    })
  }

  ngOnInit() {
    this.service.getAllMaterials().subscribe({
      next: (response: any[]) => {
        this.materials = response;
        console.log("All Materials: ", this.materials)
      },
      error: (error: any) => {
        console.log("Error Fetching Materials: ", error)
        alert("Error Fetching Materials.")
      }
    })
  }

  goToUpdate(materialId: number) {
    const adminId = 3; 
    console.log("Navigating to update material with ID:", materialId);
    this.router.navigate([`/dashboard/${adminId}/materials/update/${materialId}`]);
  }
}
