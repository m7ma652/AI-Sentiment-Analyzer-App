import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _isDark = new BehaviorSubject<boolean>(false);
  isDark$ = this._isDark.asObservable();

  constructor() {
    const initial = this.getThemeForCurrentUser();
    this._isDark.next(initial);
  }

  toggleTheme() {
    const newTheme = !this._isDark.value;
    this._isDark.next(newTheme);
    this.saveThemeForCurrentUser(newTheme);
  }

  private getThemeForCurrentUser(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userEmail = JSON.parse(currentUser).email;
      const userTheme = localStorage.getItem(`theme_${userEmail}`);
      return userTheme ? JSON.parse(userTheme) : false;
    }
    return false;
  }

  private saveThemeForCurrentUser(isDark: boolean) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userEmail = JSON.parse(currentUser).email;
      localStorage.setItem(`theme_${userEmail}`, JSON.stringify(isDark));
    }
  }

  // Update theme when user logs in
  updateThemeForUser() {
    const theme = this.getThemeForCurrentUser();
    this._isDark.next(theme);
  }
}
