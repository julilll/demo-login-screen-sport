import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IsLoggedInService } from '../admin/is-logged-in.service';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedIn: boolean | undefined;
  iAmUser: { expirationDate: Date; email: string | null } | undefined;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription = new Subscription();

  constructor(
    public router: Router,
    private isLoggedInService: IsLoggedInService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.accountService.autoAuthUser();
    this.userIsAuthenticated = this.isLoggedInService.isAuthenticated();
    this.authListenerSubs = this.isLoggedInService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.getAuthData();
      });
  }

  getTheUser(event: any) {
    this.loggedIn = true;
  }

  signOut() {
    this.isLoggedInService.logOut();
  }

  getAuthData() {
    this.iAmUser = this.isLoggedInService.getAuthData();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
