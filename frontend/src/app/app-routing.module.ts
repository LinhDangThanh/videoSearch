import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SearchComponent} from "./search/search.component";
import {AuthService} from "./services/auth.service";

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    canActivate: [AuthService]
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
