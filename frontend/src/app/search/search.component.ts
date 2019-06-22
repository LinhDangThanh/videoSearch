import { Component, OnInit } from '@angular/core';
import {VideoService} from "../services/video.service";
import {HttpErrorResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import {Title} from "@angular/platform-browser";

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
  lat: number;
  lng: number;

  constructor(private videoService: VideoService, private titleService: Title) {
    this.formData = {};
    this.isLoading = false;
    this.errorText = '';
    this.videoData = {};
    this.pageIndex = 0;
  }

  ngOnInit() {
    this.titleService.setTitle('Search - Video Search');
  }

  search() {

    this.isLoading = true;
    this.videoData = {};
    this.errorText = '';
    this.pageIndex = 0;

    this.searchFormData = {...this.formData};

    this.lat = parseFloat(this.formData.latitude);
    this.lng = parseFloat(this.formData.longitude);

    this.videoService.search(this.formData).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {

      if (res.data) {
        this.videoData = res.data;

        if (this.videoData.items && this.videoData.items.length) {
          this.sortData();
        }
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

    this.lat = parseFloat(this.formData.latitude);
    this.lng = parseFloat(this.formData.longitude);

    this.videoService.search({...this.formData, pageToken}).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe(res => {

      if (res.data) {
        this.videoData = res.data;

        if (this.videoData.items && this.videoData.items.length) {
          this.sortData();
        }
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

  pageInfo() {
    let start = this.pageIndex * this.videoData.pageInfo.resultsPerPage;

    if (this.videoData.items.length > 0) {
      start += 1;
    }

    let end = this.pageIndex * this.videoData.pageInfo.resultsPerPage + this.videoData.items.length;

    return `${start} - ${end} of ${this.videoData.pageInfo.totalResults}`;
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let deg2rad = (deg) => {
      return deg * (Math.PI/180)
    };

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
  }

  sortData() {
    this.videoData.items.sort((item1, item2) => {
      let dis1 = this.getDistanceFromLatLonInKm(this.lat, this.lng,
        item1.recordingDetails.location.latitude, item1.recordingDetails.location.longitude);
      let dis2 = this.getDistanceFromLatLonInKm(this.lat, this.lng,
        item2.recordingDetails.location.latitude, item2.recordingDetails.location.longitude);

      return dis1 - dis2;
    });
  }

}
