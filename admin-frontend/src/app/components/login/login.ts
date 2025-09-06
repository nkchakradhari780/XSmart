import { Component } from '@angular/core';
import { AuthService, LoginResponse } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginUserModel: any = { Email: '', Password: '' };
  constructor(private service: AuthService, private router: Router) { }

  onSubmit() {
    this.service.loginAdmin(this.loginUserModel).subscribe({
      next: (response: LoginResponse) => {
        const adminId = response.admin.AdminId;
        sessionStorage.setItem('admin', JSON.stringify(response.admin));
        this.router.navigate(['/dashboard', adminId]);
      },
      error: (error: any) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    })
  }

}
