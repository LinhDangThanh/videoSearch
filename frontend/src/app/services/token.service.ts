import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";

export function tokenGetter() {
  return localStorage.getItem('token');
}

const STORE_TOKEN = 'store_token';

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


}
