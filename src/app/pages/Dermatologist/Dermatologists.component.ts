import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsideService } from 'app/services/aside.service';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-Dermatologists',
  templateUrl: './Dermatologists.component.html',
  styleUrls: ['./Dermatologists.component.css']
})
export class DermatologistsComponent implements OnInit {

  openMenu: boolean = false
  title = 'nula'
  showErrorMsg: boolean = false
  loading: boolean = true
  Dermatologists: any = []
  msg = {
    detail: 'Deleted Dermatologist successfully',
    summary: 'Success',
    severity: 'success',
  }
  constructor(
    private asideService: AsideService,
    private dataService: DataService,
    private router: Router,
  ) {
    this.asideService.openAside$.subscribe((val) => {
      this.openMenu = val
    })
    this.asideService.setSection('Dermatologists')
  }
  async ngOnInit() {
    await this.getDermatologists()
  }
  async getDermatologists() {
    await this.dataService.getDermatologists()
    this.dataService.Dermatologists$.subscribe((data) => {
      this.Dermatologists = data
    })
    this.loading = false
  }
  async filterGlobal(event: any) {
    let searchedWord = event.target.value.toLowerCase()
    if (!searchedWord) {
      return await this.getDermatologists()
    }
    this.Dermatologists = this.Dermatologists.filter((Dermatologist: any) => {
      return Dermatologist.name.toLowerCase()?.includes(searchedWord)
    })
  }

  async delete(DermatologistId: string) {
    await this.dataService.deleteDermatologist(DermatologistId).then(async ()=>{
      await this.getDermatologists()
      this.showErrorMsg = true
    })
  }
  navigate(id: string) {
    console.log({id})
    this.router.navigate([`dashboard/edit-Dermatologist/${id?.trim()}`])
  }

}
