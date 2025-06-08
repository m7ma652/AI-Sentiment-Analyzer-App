import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(private authServ: AuthService,private router:Router) { }
  canActivate(): boolean {
    if (this.authServ.isLogIn()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}