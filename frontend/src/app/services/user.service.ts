import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseEndpoint: string;

  constructor(private http: HttpClient) {
    this.baseEndpoint = environment.production ? '' : 'http://localhost:8086';
  }

  login(data: any): Observable<any> {
    const url = `${this.baseEndpoint}/user/login`;
    return this.http.post(url, data);
  }

  register(data: any): Observable<any> {
    const url = `${this.baseEndpoint}/user`;
    return this.http.post(url, data);
  }
}
