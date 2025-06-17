import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, FormsModule, ButtonModule, InputTextModule, CardModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private router: Router,
    private authServ: AuthService,
    private themeService: ThemeService
  ) { }

  login() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: any) => u.email === email && u.password === password);

    if (user) {
      // تم تسجيل الدخول بنجاح
      this.authServ.logIn(email, password);
      localStorage.setItem('currentUser', JSON.stringify({ email: email }));
      this.themeService.updateThemeForUser(); // Apply user's theme
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials or unregistered user.');
    }
  }
}
