import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, FormsModule, ButtonModule, InputTextModule, CardModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authServ: AuthService) { }
  // checkLoginStatus() {
  //   this.isLoggedIn = this.authServ.isLogIn();
  // }
  login() {
    if (this.username && this.password) {
      this.authServ.logIn();
      // this.checkLoginStatus();
      this.router.navigate(['/']);
    }
  }
}
