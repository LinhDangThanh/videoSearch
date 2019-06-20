import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import {TokenService} from "./services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  user: any;
  toggleDropdown: boolean;

  constructor(private userService: UserService, private tokenService: TokenService,
              private router: Router) {
    this.toggleDropdown = false;

    this.userService.userInfo.subscribe(data => {
      this.user = data;
    });
  }

  logout() {
    this.toggleDropdown = !this.toggleDropdown;

    this.userService.removeUser();
    this.tokenService.removeToken();

    this.router.navigateByUrl('/login');
  }
}
