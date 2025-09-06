import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Login {

  constructor(private http: HttpClient) { }

  loginAdmin(admin: Admin) {
    return this.http.post('http://localhost:3000/admin/login', admin);
  }
  
}

export class Admin {
  email!: string;
  password!: string;
}