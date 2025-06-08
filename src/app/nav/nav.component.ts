import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule, ButtonModule, CommonModule, TooltipModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  items: any[] = [];
  isDark: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Analyze', icon: 'pi pi-search', routerLink: '/analyze' },
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    ];

    const storedTheme = localStorage.getItem('theme');
    this.isDark = storedTheme === 'dark';
    this.applyTheme();
    this.checkLoginStatus();
  }
  checkLoginStatus() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }
  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    const themeClass = 'dark-theme';
    if (this.isDark) {
      this.renderer.addClass(document.body, themeClass);
    } else {
      this.renderer.removeClass(document.body, themeClass);
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;  
    this.router.navigate(['/login']);
  }
}
