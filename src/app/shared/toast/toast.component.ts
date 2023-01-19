import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from '../services/confirmation.service';
import { BlockUIService } from '../services/block-ui.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(
    public toastService: ToastService,
    public confirmationService: ConfirmationService,
    private blockUIService: BlockUIService
  ) { }

  ngOnInit(): void {
  }

  hideToast() {
    this.toastService.hide();
    this.blockUIService.setBlockUI(false);
  }

  confirm() {
    this.confirmationService.confirmYes();
    this.blockUIService.setBlockUI(false);
  }
}
