import { Component } from '@angular/core';
import { IsLoggedInService } from './admin/is-logged-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sidelines-juli-levi';

  constructor(
    private isLoggedInService: IsLoggedInService,
  ) {}

  // Global Sign Out is available from any point of application
  signOut() {
    this.isLoggedInService.logOut();
  }
}
