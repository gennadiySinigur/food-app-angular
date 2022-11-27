import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toast: BehaviorSubject<Toast | null> = new BehaviorSubject<Toast | null>(null);
  toast$: Observable<Toast | null> = this.toast.asObservable();

  show(text: string) {
    this.toast.next({ text: text });
  }

  hide() {
    this.toast.next(null);
  }
}
