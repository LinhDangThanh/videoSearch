import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {UserService} from "./user.service";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private userService: UserService, private tokenService: TokenService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLogged = this.userService.isLogged();

    if (!isLogged) {
      this.router.navigateByUrl('/login');
    }

    console.log(`isLogged: ${isLogged}`);

    return isLogged;
  }
}
