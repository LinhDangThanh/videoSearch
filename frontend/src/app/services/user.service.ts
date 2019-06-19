import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseEndpoint: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.baseEndpoint = environment.production ? '' : 'http://localhost:8086';
  }

  isLogged() {
    return this.tokenService.getToken() ? true : false;
  }

  login(data: any): Observable<any> {
    const url = `${this.baseEndpoint}/users/login`;
    return this.http.post(url, data);
  }

  register(data: any): Observable<any> {
    const url = `${this.baseEndpoint}/users`;
    return this.http.post(url, data);
  }
}
