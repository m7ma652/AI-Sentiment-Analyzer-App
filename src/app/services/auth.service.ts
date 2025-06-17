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
  logIn(email: string, password: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    this.isLoggedInSub.next(true);
  }
  logOut() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSub.next(false);
  }
  isLogIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  getCurrentUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

}
