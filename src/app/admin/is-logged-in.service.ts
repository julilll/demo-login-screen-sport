import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInService {
  users: [] = [];
  email: string = '';
  isLoggedIn: boolean = false;
  isUserLoggedIn = new Subject<boolean>();

  constructor(public router: Router) {}

  getAuthStatusListener() {
    return this.isUserLoggedIn.asObservable();
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  setIsLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
    this.isUserLoggedIn.next(this.isLoggedIn);
  }

  setUser(email: string) {
    this.email = email;
    localStorage.setItem('email', this.email);
  }

  logOut() {
    this.clearAuthData();
    this.isLoggedIn = false;
    this.isUserLoggedIn.next(false);
    this.router.navigate(['home'])
  }

  saveAuthData(expirationDate: string, email: string) {
    localStorage.setItem('expiration', expirationDate);
    localStorage.setItem('email', email);
  }

  private clearAuthData() {
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }

  getAuthData() {
    const expirationDate = localStorage.getItem('expiration');
    if (!expirationDate) return;
    return {
      expirationDate: new Date(expirationDate),
      email: localStorage.getItem('email'),
    };
  }
}
