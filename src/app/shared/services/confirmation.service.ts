import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private confirmation = new Subject<boolean>();
  confirmation$ = this.confirmation.asObservable();

  constructor() { }

  confirm() {
    return this.confirmation$;
  }

  confirmYes() {
    this.confirmation.next(true);
  }
}
