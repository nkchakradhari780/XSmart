import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createTag(tagName: string): Observable<TagResponse> {
    return this.http.post<TagResponse>('http://localhost:3000/tag/', { TagName: tagName }, {withCredentials: true});
  }

  getAllTags(): Observable<TagResponse[]> {
    return this.http.get<TagResponse[]>('http://localhost:3000/tag/', {withCredentials: true});
  }

  createCategory(categoryName: string): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>('http://localhost:3000/category/', {CategoryName: categoryName}, {withCredentials: true});
  }

  getAllCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>('http://localhost:3000/category/', {withCredentials: true});
  }

  createMaterial(materialName: string): Observable<MaterialResponse> {
    return this.http.post<MaterialResponse>('http://localhost:3000/material/', {MaterialName: materialName}, {withCredentials: true});
  }

  getAllMaterials(): Observable<MaterialResponse[]> {
    return this.http.get<MaterialResponse[]>('http://localhost:3000/material/', {withCredentials: true});
  }

}

export class TagResponse {
  TagId!: number;
  TagName!: string;
}

export class CategoryResponse{
  id!: number;
  CategoryName!: string;
}

export class MaterialResponse{
  MaterialId!: number;
  MaterialName!: string;
}
