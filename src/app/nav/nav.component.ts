import { Component, OnInit, OnDestroy } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../services/auth.service';
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

  constructor(private router: Router, private renderer: Renderer2, private authServ: AuthService) {
    this.subscription = this.authServ.isLoggedIn.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Analyze', icon: 'pi pi-search', routerLink: '/analyze' },
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
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
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    console.log('Before logout, localStorage:', localStorage);
    this.authServ.logOut();
    console.log('After logout, localStorage:', localStorage);
    this.checkLoginStatus();
    this.router.navigate(['/login']);
  }
}
   