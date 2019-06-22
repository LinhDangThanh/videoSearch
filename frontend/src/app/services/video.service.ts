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
    this.baseEndpoint = environment.production ? 'http://billinhit.online/videosearch' : 'http://localhost:8090';
  }

  search(data: any): Observable<any> {
    let url = `${this.baseEndpoint}/videos?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}`;

    if (data.pageToken) {
      url = `${url}&pageToken=${data.pageToken}`;
    }

    return this.http.get(url);
  }
}
