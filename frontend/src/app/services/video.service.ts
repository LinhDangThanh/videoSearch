import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseEndpoint: string;

  constructor(private http: HttpClient) {
    this.baseEndpoint = environment.production ? '' : 'http://localhost:8086';
  }

  search(data: any): Observable<any> {
    const url = `${this.baseEndpoint}/videos?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}`;
    return this.http.get(url);
  }
}
