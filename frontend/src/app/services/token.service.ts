import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";
import { JwtHelperService } from '@auth0/angular-jwt';

const STORE_TOKEN = 'store_token';

export function tokenGetter() {
  return localStorage.getItem(STORE_TOKEN);
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private storageService: StorageService) { }

  setToken(token: string) {
    this.storageService.set(STORE_TOKEN, token);
  }

  getToken(): string {
    return this.storageService.get(STORE_TOKEN);
  }

  removeToken() {
    this.storageService.remove(STORE_TOKEN);
  }

  isExpired(): boolean {
    const helper = new JwtHelperService();

    const token = this.storageService.get(STORE_TOKEN);

    if (token) {
      return helper.isTokenExpired(token);
    }

    return true;
  }
}
