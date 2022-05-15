import { Injectable } from '@angular/core';
import { IsLoggedInService } from '../admin/is-logged-in.service';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private isLoggedInService: IsLoggedInService,
    private dataBaseService: DataBaseService
  ) {}

  // Main login process
  async login(email: string, callback: (arg0: boolean | null) => void) {
    const answer = await this.dataBaseService.login(email);
    if (answer) {
      this.isLoggedInService.setIsLoggedIn(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + 18000000);
      this.isLoggedInService.saveAuthData(expirationDate.toISOString(), email);
      callback(true);
    } else callback(false);
  }

  // Auto authorization if there is already user with saved email in local storage and still not expires token
  autoAuthUser() {
    const authInformation = this.isLoggedInService.getAuthData();
    const now = new Date();
    if (authInformation) {
      const expiresIn =
        authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.isLoggedInService.setIsLoggedIn(true);
      }
    }
  }
}
