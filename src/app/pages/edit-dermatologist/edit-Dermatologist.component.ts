import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsideService } from 'app/services/aside.service';
import { DataService } from 'app/services/data.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-Dermatologist',
  templateUrl: './edit-Dermatologist.component.html',
  styleUrls: ['./edit-Dermatologist.component.css']
})
export class EditDermatologistComponent implements OnInit {

  completeformprofile: boolean
  showMsg: boolean = false
  id: string = "";
  DermatologistForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl({value:'',disabled:true}, Validators.required),
  })
  private msg = new BehaviorSubject<any>({})
  public msg$ = this.msg.asObservable()
  constructor(
    private dataService: DataService,
    public asideService: AsideService,
    private route: ActivatedRoute
  ) {
    this.asideService.setSection('Edit Dermatologist')
    this.id = this.route.snapshot.paramMap.get("id") || "";
  }

	ngOnInit() {
		this.dataService.getDermatologist(this.id).subscribe((data: any) => {
			let Dermatologist = data.data();
			this.DermatologistForm = new FormGroup({
				name: new FormControl(Dermatologist.name, Validators.required),
				email: new FormControl({value:Dermatologist.email, disabled: true}, Validators.required),
			});
		});
	}
	edit() {
		if (this.DermatologistForm.valid) {
			this.dataService.updateDermatologist(this.id, this.DermatologistForm.value);
			this.msg.next({
				detail: "Dermatologist updated successfully",
				summary: "Success",
				severity: "success",
			});
			this.DermatologistForm.reset();
		} else {
			this.msg.next({
				detail: "You should fill the required fields",
				summary: "Warn",
				severity: "warn",
			});
		}
		this.showMsg = true;
	}

}
