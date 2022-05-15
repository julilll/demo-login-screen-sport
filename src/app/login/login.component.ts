import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IsLoggedInService } from '../admin/is-logged-in.service';
import { DataBaseService } from '../services/data-base.service';
import { AccountService } from '../services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() userIsLoggedIn = new EventEmitter()
  loginForm: FormGroup
  userIsAuthenticated: boolean | undefined
  loginError: boolean | undefined
  signupError: boolean | undefined

  constructor(
    private accountService: AccountService,
    private isLoggedInService: IsLoggedInService,
    private dataBaseService: DataBaseService,
    private router: Router,
  ) {
    this.loginError = false
    this.signupError = false
    this.loginForm = new FormGroup({
      email: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.isLoggedInService.isAuthenticated()
  }

  login(input: User) {
    this.accountService.login(input.email, res => {
      if (res) {
        this.router.navigate(['/articles', input.email]);
        this.isLoggedInService.setIsLoggedIn(true);
      } else {
        this.loginError = true
      }
    });
  }

  signup(input: User) {
    this.dataBaseService.signup(input.email, res => {
      console.log(res)
      if (res) {
        this.login(input)
      } else {
        this.signupError = true
      }
    })
  }

  onSubmit(action: any) {
    if (action === 'login') this.login(this.loginForm.value)
    else if (action === 'signup') this.signup(this.loginForm.value)
  }
}
