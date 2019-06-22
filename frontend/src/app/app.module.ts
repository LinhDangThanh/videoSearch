import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import {tokenGetter} from "./services/token.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['billinhit.online', 'localhost:8090'],
        headerName: 'authorization',
        authScheme: 'Bearer '
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvm9NF7HWUUXDriFY9r9yZ56Itm6MZmog'
    }),
    AgmSnazzyInfoWindowModule,
    AppRoutingModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
