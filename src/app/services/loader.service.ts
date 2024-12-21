import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoad = new BehaviorSubject<boolean>(false);
  public loader$ = this.isLoad.asObservable();
  constructor() {}

  get loader(): boolean {
    return this.isLoad.getValue();
  }

  private set loader(val: boolean) {
    this.isLoad.next(val);
  }

  setLoader(event: boolean) {
    this.loader = event;
  }
}