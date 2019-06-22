import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenService} from "./token.service";
import {StorageService} from "./storage.service";

const STORE_USER = 'store_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseEndpoint: string;
  userInfo: BehaviorSubject<any>;

  constructor(private http: HttpClient, private tokenService: TokenService,
              private storageService: StorageService) {
    this.baseEndpoint = environment.production ? 'http://billinhit.online/videosearch' : 'http://localhost:8090';

    this.userInfo = new BehaviorSubject(null);

    this.loadUser();
  }

  isLogged() {
    return this.tokenService.getToken() ? true : false;
  }

  setUser(data: any) {
    this.storageService.set(STORE_USER, JSON.stringify(data));

    this.userInfo.next(data);
  }

  getUser(): any {
    let json = this.storageService.get(STORE_USER);

    return JSON.parse(json);
  }

  removeUser() {
    this.storageService.remove(STORE_USER);

    this.userInfo.next(null);
  }

  private loadUser() {
    let user = this.getUser();

    this.userInfo.next(user);
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
