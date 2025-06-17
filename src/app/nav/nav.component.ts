import { Component, OnInit, OnDestroy } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule, ButtonModule, CommonModule, TooltipModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, OnDestroy {

  items: any[] = [];
  isLoggedIn: boolean = false;
  private subscription: any;
  isDark = false;

  constructor(private router: Router, private renderer: Renderer2, private authServ: AuthService, private themeService: ThemeService) {
    this.subscription = this.authServ.isLoggedIn.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
    this.themeService.isDark$.subscribe(value => this.isDark = value);
  }

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Analyze', icon: 'pi pi-search', routerLink: '/analyze' },
      // { label: 'Chat Bot', icon: 'pi pi-search', routerLink: '/chatbot' },
      // { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    ];
    this.checkLoginStatus();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  checkLoginStatus() {
    this.isLoggedIn = this.authServ.isLogIn();
  }
  // login() {
  //   this.router.navigate(['/login']);
  // }
  register() {
    this.router.navigate(['/register']);
  }
  logout() {
    console.log('Before logout, localStorage:', localStorage);
    this.authServ.logOut();
    console.log('After logout, localStorage:', localStorage);
    this.checkLoginStatus();
    this.router.navigate(['/register']);
  }
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
