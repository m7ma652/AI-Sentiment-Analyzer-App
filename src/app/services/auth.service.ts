import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSub = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSub.asObservable();
  constructor() { 
    this.isLoggedInSub.next(this.isLogIn());
  }
  logIn() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSub.next(true);
  }
  logOut() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSub.next(false);
  }
  isLogIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
