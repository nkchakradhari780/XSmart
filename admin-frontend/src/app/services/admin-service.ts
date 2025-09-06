import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createTag(tagName: string) {
    return this.http.post<TagResponse>('http://localhost:3000/tag/', { TagName: tagName }, {withCredentials: true});
  }

  getAllTags() {
    return this.http.get<TagResponse[]>('http://localhost:3000/tag/', {withCredentials: true});
  }
}

export class TagResponse {
  TagId!: number;
  TagName!: string;
}

export class TagsResponse {
  tags!: Array<TagResponse>;
}
