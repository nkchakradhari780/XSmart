  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class AdminService {

    constructor(private http: HttpClient) { }

    createTag(tagName: string): Observable<TagResponse> {
      return this.http.post<TagResponse>('http://localhost:3000/tag/', { TagName: tagName }, { withCredentials: true });
    }

    getAllTags(): Observable<TagResponse[]> {
      return this.http.get<TagResponse[]>('http://localhost:3000/tag/', { withCredentials: true });
    }

    createCategory(categoryName: string): Observable<CategoryResponse> {
      return this.http.post<CategoryResponse>('http://localhost:3000/category/', { CategoryName: categoryName }, { withCredentials: true });
    }

    getAllCategories(): Observable<CategoryResponse[]> {
      return this.http.get<CategoryResponse[]>('http://localhost:3000/category/', { withCredentials: true });
    }

    createMaterial(materialName: string): Observable<MaterialResponse> {
      return this.http.post<MaterialResponse>('http://localhost:3000/material/', { MaterialName: materialName }, { withCredentials: true });
    }

    getAllMaterials(): Observable<MaterialResponse[]> {
      return this.http.get<MaterialResponse[]>('http://localhost:3000/material/', { withCredentials: true });
    }

    createProduct(product: Product) {
      return this.http.post<Product>('http://localhost:3000/product', product);
    }

    getAllProducts(): Observable<ProductResponse> {
      return this.http.get<ProductResponse>('http://localhost:3000/product');
    }


    getAllProjects(): Observable<ProjectResponse> {
      return this.http.get<ProjectResponse>(`http://localhost:3000/project/`)
    }

  }

  export class TagResponse {
    TagId!: number;
    TagName!: string;
  }

  export class CategoryResponse {
    CategoryId!: number;
    CategoryName!: string;
  }

  export class MaterialResponse {
    MaterialId!: number;
    MaterialName!: string;
  }

  export class Product {
    ProductId!: number;
    ProductName!: string;
    Categories!: Array<CategoryResponse>;
    Image!: Blob;
    PdfFile!: Blob;
  }

  export class ProductResponse {
    result!: Array<Product>;
    response!: string;
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

  export class ProjectResponse {
    result!: Array<Project>;
    response!: string;
  }