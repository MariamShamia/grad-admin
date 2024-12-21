import { AsideService } from 'app/services/aside.service'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators,  } from '@angular/forms'
import { Router } from '@angular/router'
import { DataService } from 'app/services/data.service'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

@Component({
  selector: 'app-profile',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css'],
})
export class AddroutineComponent implements OnInit {
  completeformprofile: boolean
  showMsg: boolean = false
  skinType = [
    { name: '' },
    { name: 'Dry' },
    { name: 'Sensitive' },
    { name: 'Oily' },
    { name: 'Combination' },
    { name: 'Normal' },
    { name: 'All Skin ' },
  ]
  skinConcernsList = [
    { label: 'Wrinkles', value: 'Wrinkles' },
    { label: 'Dryness', value: 'Dryness' },
    { label: 'Acne', value: 'Acne' },
    { label: 'Sensitivity', value: 'Sensitivity' },
    { label: 'Dark Spots', value: 'Dark Spots' },
  ];
  routineForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    skinType: new FormControl('', Validators.required),
    urlImage:new FormControl('', Validators.required),
    skinConcerns: new FormControl([]),
    steps: new FormControl(0,Validators.required),
  })
  private msg = new BehaviorSubject<any>({})
  public msg$ = this.msg.asObservable()

  constructor(
    private dataService: DataService,
    public asideService: AsideService,
  ) {
    this.asideService.setSection('Add Routine')
  }

  ngOnInit(): void {
      

  }
  onCheckboxChange(event: any) {
    const selectedConcerns = this.routineForm.get('skinConcerns')?.value || [];
  
    if (event.target.checked) {
      // Add the concern if not already in the list
      if (!selectedConcerns.includes(event.target.value)) {
        selectedConcerns.push(event.target.value);
      }
    } else {
      // Remove the concern if unchecked
      const index = selectedConcerns.indexOf(event.target.value);
      if (index >= 0) {
        selectedConcerns.splice(index, 1);
      }
    }
  
    // Update the FormControl value
    this.routineForm.get('skinConcerns')?.setValue(selectedConcerns);
  }

  async save() {
    const formData = {
      ...this.routineForm.value,
      skinType: this.routineForm.value.skinType.name,
    }

    if (this.routineForm.valid) {
      let message = await this.dataService.addroutine(formData)
      this.msg.next(message)
      this.routineForm.reset()
    } else {
      this.msg.next({
        detail: 'You should fill the required fields',
        summary: 'Warn',
        severity: 'warn',
      })
    }
    this.showMsg = true
  }
  
  
// onCheckboxChange(event: any) {
//   const selectedConcerns = this.routineForm.get('skinConcerns')?.value || [];
//   if (event.target.checked) {
//     selectedConcerns.push(event.target.value); 
//   } else {
//     const index = selectedConcerns.indexOf(event.target.value);
//     if (index >= 0) selectedConcerns.splice(index, 1); 
//   }
//   this.routineForm.get('skinConcerns')?.setValue(selectedConcerns); 
// }
}
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { DataService } from 'app/services/data.service';
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// @Component({
//   selector: 'app-add-routine',
//   templateUrl: './add-routine.component.html',
//   styleUrls: ['./add-routine.component.css'],
// })
// export class AddRoutineComponent implements OnInit {
//   showMsg: boolean = false;

//   skinType = [
//     { name: 'Dry' },
//     { name: 'Sensitive' },
//     { name: 'Oily' },
//     { name: 'Combination' },
//     { name: 'Normal' },
//     { name: 'All Skin Types' },
//   ];

  
//   skinConcernsList = [
//     { label: 'Wrinkles', value: 'wrinkles' },
//     { label: 'Dryness', value: 'dryness' },
//     { label: 'Acne', value: 'acne' },
//     { label: 'Sensitivity', value: 'sensitivity' },
//     { label: 'Dark Spots', value: 'dark-spots' },
//   ];
//   routineForm = new FormGroup({
//     name: new FormControl('', Validators.required),
//     description: new FormControl('', Validators.required),
//     skinType: new FormControl('', Validators.required),
//     urlImage: new FormControl('', Validators.required),
//     skinConcerns: new FormControl([]), 
//     steps: new FormControl('', Validators.required),
//   });

//   private msg = new BehaviorSubject<any>({});
//   public msg$ = this.msg.asObservable();

//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {}

//   async save() {
//     if (this.routineForm.valid) {
//       const routineData = this.routineForm.value; 
//       console.log('Routine Data:', routineData);

//       let message = await this.dataService.addroutine(routineData);
//       this.msg.next(message); 
//       this.routineForm.reset(); 
//     } else {
//       this.msg.next({
//         detail: 'You should fill the required fields',
//         summary: 'Warn',
//         severity: 'warn',
//       });
//     }
//     this.showMsg = true; 
//   }

//   onCheckboxChange(event: any) {
//     const selectedConcerns = this.routineForm.get('skinConcerns')?.value || [];
//     if (event.target.checked) {
//       selectedConcerns.push(event.target.value); 
//     } else {
//       const index = selectedConcerns.indexOf(event.target.value);
//       if (index >= 0) selectedConcerns.splice(index, 1); 
//     }
//     this.routineForm.get('skinConcerns')?.setValue(selectedConcerns); 
//   }
// }
