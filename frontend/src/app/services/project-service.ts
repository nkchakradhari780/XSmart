import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`http://localhost:3000/project/`)
  }

  

}

export class Project {
  ProjectId!: number;
  ProjectName!: string;
  Description!: string;
  Associates!: string;
  CompletionYear!: number;
  TagIds!: Array<Tag>;
  MaterialIds!: Array<Material>
  Images!: Array<Image>;
}

export class Tag {
  TagId!: number;
  TagName!: string;
}

export class Material {
  MaterialId!: number;
  MaterialName!: string;
}

export class Image {
  ImageId!: number;
  Image!: Blob;
}

export class ProjectResponse{
  result!: Array<Project>;
  response!: string;
}