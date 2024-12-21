import { DataService } from 'app/services/data.service'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AsideService } from 'app/services/aside.service'
import { BehaviorSubject } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.component.html',
  styleUrls: ['./edit-routine.component.css'],
})
export class EditroutineComponent implements OnInit {
  id: string = ''
  showMsg: boolean = false
  private msg = new BehaviorSubject<any>({})
  public msg$ = this.msg.asObservable()
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
  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    public asideService: AsideService,
  ) {
  
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.asideService.setSection('Edit routines')
    console.log({id:this.id})
    this.dataService.getroutine(this.id).subscribe((data: any) => {
      let routine = data.data()
      console.log('Routine structure:',routine);

      // this.routineForm = new FormGroup({
      //   name: new FormControl(routine.name, Validators.required),
      //   description: new FormControl(routine.description, Validators.required),
      //   skinType: new FormControl(routine.skinType, Validators.required),
      //   urlImage: new FormControl(routine.urlImage),
      //   skinConcerns: new FormControl([routine.skinConcerns]),
      //   steps: new FormControl(routine.steps),
      // })
      this.routineForm.patchValue({
        name: routine?.name || '',
        description: routine?.description || '',
        skinType:routine?.skinType ? { name: routine.skinType } : { name: '' },
        urlImage: routine?.urlImage || '', 
        skinConcerns: routine?.skinConcerns || [],  
        steps: routine?.steps || 0, 
      });

   
      
    })
  }
  // ngOnInit() {
  //   this.dataService.getroutine(this.id).subscribe((data: any) => {
  //     const routine = data ? data.data() : null;
  
  //     if (routine) {
  //       this.routineForm.patchValue({
  //         name: routine.name || '', // Default to an empty string if undefined
  //         description: routine.description || '',
  //         skinType: routine.skinType || '',
  //         urlImage: routine.urlImage || '',
  //         skinConcerns: routine.skinConcerns || [], // Default to an empty array
  //         steps: routine.steps || 0, // Default to 0 if undefined
  //       });
  //     } else {
  //       console.error('No routine data available for ID:', this.id);
  //     }
  //   });
  // }

  
  
  onCheckboxChange(event: any) {
    const selectedConcerns = this.routineForm.get('skinConcerns')?.value || [];
  
    if (event.target.checked) {
   if (!selectedConcerns.includes(event.target.value)) {
        selectedConcerns.push(event.target.value);
      }
    } else {
      
      const index = selectedConcerns.indexOf(event.target.value);
      if (index >= 0) {
        selectedConcerns.splice(index, 1);
      }
    }
  
    this.routineForm.get('skinConcerns')?.setValue(selectedConcerns);
  }
  edit() {
    if (this.routineForm.valid) {
      const formData = {
        ...this.routineForm.value,
        skinType: this.routineForm.value.skinType.name,
      }
      this.dataService.updateroutine(this.id, formData)
      this.msg.next({
        detail: 'routine updated successfully',
        summary: 'Success',
        severity: 'success',
      })
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
}
