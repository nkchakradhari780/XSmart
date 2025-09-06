import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginAdmin(admin: Admin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/login', admin);
  }

}
export class Admin {
  email!: string;
  password!: string;
}

export class LoginResponse {
  message!: string;
  admin!: {
    AdminId: number;
    FullName: string;
    Email: string;
    Role: 'superadmin' | 'admin' | 'editor';
  };
}
