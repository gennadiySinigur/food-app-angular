import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [CommonModule],
  exports: [
    HomeComponent,
    AboutComponent,
    RegistrationComponent,
    LoginComponent,
  ],
})
export class CoreModule {}
