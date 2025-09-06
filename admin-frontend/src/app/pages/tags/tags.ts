import { Component } from '@angular/core';
import { AdminService, TagResponse, TagsResponse } from '../../services/admin-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';

@Component({
  selector: 'app-tags',
  imports: [FormsModule, CommonModule,],
  templateUrl: './tags.html',
  styleUrl: './tags.css'
})
export class Tags {
  tags : TagResponse[] = [];

  tagModel: any = {TagName: ''}
  constructor(private service: AdminService, private router: Router) {}

  onSubmit() {
    this.service.createTag(this.tagModel.tagName).subscribe({
      next: (response: TagResponse) => {
        const tagId = response.TagId;
        alert("Tag Created Successfully!")
      }, 
      error: (error: any) => {
        console.log("Error Creating Tag: ", error)
        alert("Error Creating Tag.")
      }
    })
  }

  ngOnInit() {
    this.service.getAllTags().subscribe({
      next: (response: TagResponse[]) => {
        this.tags = response;
        console.log("All Tags: ", this.tags)
      },
      error: (error: any) => {
        console.log("Error Fetching Tags: ", error)
        alert("Error Fetching Tags.")
      }
    })
  }

  goToUpdate(tagId: number) {
    const adminId = 3; 
    console.log("Navigating to update tag with ID:", tagId);
    this.router.navigate([`/dashboard/${adminId}/tags/update/${tagId}`]);
  }

}
