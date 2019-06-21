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
  searchFormData: any;
  isLoading: boolean;
  errorText: string;
  videoData: any;
  pageIndex: number;

  constructor(private videoService: VideoService) {
    this.formData = {};
    this.isLoading = false;
    this.errorText = '';
    this.videoData = {};
    this.pageIndex = 0;
  }

  ngOnInit() {
  }

  search() {
    this.isLoading = true;
    this.videoData = {};
    this.errorText = '';
    this.pageIndex = 0;

    this.searchFormData = {...this.formData};

    this.videoService.search(this.formData).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {

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


  getPage(toPage: string, pageToken: string) {
    this.isLoading = true;

    this.formData = {...this.searchFormData};

    this.videoService.search({...this.formData, pageToken}).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {

      if (res.data) {
        this.videoData = res.data;
      }

      this.pageIndex = toPage === 'prev' ? this.pageIndex - 1 : this.pageIndex + 1;

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
