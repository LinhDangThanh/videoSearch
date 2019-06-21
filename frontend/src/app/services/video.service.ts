import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    let url = `${this.baseEndpoint}/videos?keyword=${data.keyword}&latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}`;

    if (data.pageToken) {
      url = `${url}&pageToken=${data.pageToken}`;
    }

    return this.http.get(url);
  }
}
