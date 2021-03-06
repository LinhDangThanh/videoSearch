import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";
import {finalize, tap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: any;
  errorText: string;
  isLoading: boolean;
  activePage: string;

  constructor(private userService: UserService, private tokenService: TokenService,
              private router: Router, private titleService: Title) {
    this.formData = {};
    this.errorText = '';
    this.isLoading = false;
    this.activePage = 'login';
  }

  ngOnInit() {
    if (this.userService.isLogged()) {
      return this.router.navigateByUrl('/');
    }

    this.titleService.setTitle('Login - Video Search');
  }

  login() {
    this.isLoading = true;
    this.errorText = '';

    this.userService.login(this.formData).pipe(finalize(
      () => {
        this.isLoading = false;
      }
    )).subscribe(res => {
      if (res.statusText) {
        return this.errorText = res.statusText;
      }

      // store token
      this.tokenService.setToken(res.token);

      // store use
      this.userService.setUser(res.user);

      this.router.navigateByUrl('/');

    }, (error: HttpErrorResponse) => {

      if (error && error.statusText) {
        this.errorText = error.statusText
      }
    });
  }

  onActivePage(page) {
    this.formData = {};
    this.activePage = page;
    this.errorText = '';
  }

  register() {
    this.isLoading = true;
    this.errorText = '';

    this.userService.register(this.formData).pipe(finalize(
      () => {
        this.isLoading = false;
      }
    )).subscribe(res => {
      if (res.statusText) {
        return this.errorText = res.statusText;
      }

      this.formData = {};
      this.activePage = 'login';

    }, (error: HttpErrorResponse) => {

      if (error && error.statusText) {
        this.errorText = error.statusText
      }
    });
  }
}
