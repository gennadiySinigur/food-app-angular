import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockUIService {
  private blockUI = new BehaviorSubject<boolean>(false);
  isBlocked$ = this.blockUI.asObservable();

  constructor() { }

  setBlockUI(value: boolean) {
    this.blockUI.next(value);
  }
}
