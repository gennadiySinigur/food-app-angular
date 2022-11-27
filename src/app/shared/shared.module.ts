import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [
    FooterComponent,
    ToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    ToastComponent
  ]
})
export class SharedModule { }
