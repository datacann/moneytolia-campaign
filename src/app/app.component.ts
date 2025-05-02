import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { ScreenService } from './core/services/screen.seervice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'moneytolia-campaign';
  isMobile: boolean = false;


  constructor(private authService: AuthService,private screenService: ScreenService ){
    this.screenService.isMobile$.subscribe(val => {
      this.isMobile = val;
    });
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn()
  }
}
