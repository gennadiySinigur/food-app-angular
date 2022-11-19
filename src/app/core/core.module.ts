import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLinkActive, RouterLinkWithHref} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterLinkActive
  ],
  exports: [
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RegistrationComponent,
    LoginComponent
  ]
})
export class CoreModule { }
