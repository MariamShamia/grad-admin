import { environment } from '../../../../environments/environment'
import { Component, OnInit } from '@angular/core'
import { AuthService } from 'app/services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  profileForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6)),
  })
  massage: string = ''
  get f() {
    return this.profileForm.controls
  }
  constructor(private authService: AuthService) {
    this.authService.getAdmins()
  }

  ngOnInit() {}
  async login() {
    if (this.profileForm.valid) {
      await this.authService.login(this.profileForm.value)
      this.authService.errorMsg$.subscribe((msg) => {
        this.massage = msg
      })
    } else {
      this.massage = 'You should enter email and password'
    }
  }
}
