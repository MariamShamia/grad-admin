import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsideService {
  private isTypeSection = new BehaviorSubject<string>('Import Survey');
  public sectionName$ = this.isTypeSection.asObservable();
  private openAside = new BehaviorSubject<boolean>(false);
  public openAside$ = this.openAside.asObservable();
  constructor() {}
 setOpenAside = (val: boolean) => {    
    this.openAside.next(val);
  }
  getOpenAsideValue = () => {
    return this.openAside.getValue();
  }
  get sectionName(): string {
    return this.isTypeSection.getValue();
  }

  private set sectionName(val: string) {
    this.isTypeSection.next(val);
  }

  setSection(name: string) {
    this.sectionName = name;
  }
}