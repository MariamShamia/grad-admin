import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AsideService } from 'app/services/aside.service'
import { DataService } from 'app/services/data.service'
import { BehaviorSubject } from 'rxjs'



@Component({
  selector: 'app-add-Dermatologist',
  templateUrl: './add-Dermatologist.component.html',
  styleUrls: ['./add-Dermatologist.component.css'],
})
export class AddDermatologistComponent implements OnInit {
  completeformprofile: boolean
  showMsg: boolean = false
  DermatologistForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })
  private msg = new BehaviorSubject<any>({})
  public msg$ = this.msg.asObservable()
  constructor(
    private dataService: DataService,
    public asideService: AsideService,
  ) {
    this.asideService.setSection('Add Dermatologist')
  }

  ngOnInit(): void {}
  async save() {
    if (this.DermatologistForm.valid) {
      let message = await this.dataService.addNewDermatologist(this.DermatologistForm.value)
      this.msg.next(message)
      this.DermatologistForm.reset()
    } else {
      this.msg.next({
        detail: 'You should fill the required fields',
        summary: 'Warn',
        severity: 'warn',
      })
    }
     this.showMsg = true
  }
}
