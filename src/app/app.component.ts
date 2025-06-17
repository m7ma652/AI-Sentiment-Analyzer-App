import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isDark = false;
  showThemeToggle = () => {
    const currentRoute = this.router.url;
    return currentRoute !== '/login' && currentRoute !== '/register';
  };

  constructor(private themeService: ThemeService, private router: Router) { }

  ngOnInit() {
    this.themeService.isDark$.subscribe(value => {
      this.isDark = value;
    });
  }

  title = 'AI-Sentiment-Analyzer-App';
}
