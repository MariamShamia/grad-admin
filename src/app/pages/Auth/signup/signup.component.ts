import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "app/services/auth.service";
@Component({
	selector: "app-signup",
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
	showErrorDifferenetPass: boolean = false;

	registerForm = new FormGroup({
		email: new FormControl("", Validators.email),
		password: new FormControl("", Validators.minLength(3)),
		confirmpassword: new FormControl("", Validators.minLength(3)),
	});

	proForm = new FormGroup({
		name: new FormControl("", Validators.required),
	});
	get f() {
		return this.registerForm.controls;
	}
	get r() {
		return this.proForm.controls;
	}
	massage: string;
	emailExiis: string;
	constructor(private authService: AuthService) {}

	ngOnInit(): void {}
	register() {
		if (this.proForm.valid && this.registerForm.valid) {
			if (this.registerForm.value.confirmpassword === this.registerForm.value.password) {
				this.showErrorDifferenetPass = false;
				this.authService.register(this.registerForm.value, this.proForm.value);
			} else {
				this.showErrorDifferenetPass = true;
			}
		} else {
			this.massage = "you should enter all required values";
		}
	}
}
