import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class DataBaseService {
  users: any = [];
  constructor(private http: HttpClient) {
    this.getDataBaseUsers();
  }

  login(email: string) {
    return this.users.find((el: { email: string; }) => el.email == email)
  }

  // Add new user
  signup(email: string, callback: { (res: any): void; (arg0: boolean): void; }) {
    if (this.users.find((el: { email: string; }) => el.email == email)) callback(false)
    else {
      const user = {email} as User
      this.users.push(user)
      this.http.post<User>('../../assets/users.json', user).subscribe(res => {
        console.log(res) // This is it. Here I spent almost an hour an found out that it's impossible to write to JSON file, only read... :( Tell me how did you do it. I wanna know :))))
      })
      callback(true)
    }
  }

  // Read Users Database
  getDataBaseUsers() {
    this.http.get<User>('../../assets/users.json').subscribe((data: User) => {
      this.users = data
    });
  }
}
