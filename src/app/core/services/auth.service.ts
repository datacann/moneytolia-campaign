import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedInSignal = signal<boolean>(false);

  constructor(private router: Router) {
    const isLogged = localStorage.getItem('isLoggedIn') === 'true';
    this.loggedInSignal.set(isLogged);
  }

  login(username: string, password: string): boolean {
    console.log(12);
    
    if (username === 'admin' && password === '123456') {
      console.log(5);
      
      this.loggedInSignal.set(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInSignal.set(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }}