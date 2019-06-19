import { Component, OnInit } from '@angular/core';
import {VideoService} from "../services/video.service";
import {HttpErrorResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formData: any;
  isLoading: boolean;
  errorText: string;
  videoData: any;

  constructor(private videoService: VideoService) {
    this.formData = {};
    this.isLoading = false;
    this.errorText = '';
    this.videoData = {};
  }

  ngOnInit() {
  }

  search() {
    this.isLoading = true;
    this.videoData = {};
    this.errorText = '';

    this.videoService.search(this.formData).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {
      console.log(`res: ${res}`);

      if (res.data) {
        this.videoData = res.data;
      }

      if (res.errors) {
        this.errorText = res.errors[0].message;
      }
    }, (error: HttpErrorResponse) => {
      console.log(`res: ${error}`);
      if (error && error.statusText) {
        this.errorText = error.statusText
      }
    })
  }

}
