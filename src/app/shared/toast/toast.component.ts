import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from '../services/confirmation.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(
    public toastService: ToastService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  hideToast() {
    this.toastService.hide();
  }

  confirm() {
    this.confirmationService.confirmYes();
  }
}
