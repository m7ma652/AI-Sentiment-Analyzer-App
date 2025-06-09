import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, FormsModule, ButtonModule, InputTextModule, CardModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(private router: Router, private authServ: AuthService) { }
  login() {
    if (this.loginForm.valid) {
      this.authServ.logIn();
      this.router.navigate(['/']);
    }
  }
}
