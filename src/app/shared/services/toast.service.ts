import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast: BehaviorSubject<Toast | null> = new BehaviorSubject<Toast | null>(null);
  toast$: Observable<Toast | null> = this.toast.asObservable();
  toastType = 'error';

  show(type: string, text: string): void {
    this.toastType = type;

    this.toast.next({ type: type, text: text });
  }

  hide(): void {
    this.toast.next(null);
  }
}
