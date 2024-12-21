import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AsideService } from 'app/services/aside.service'
import { DataService } from 'app/services/data.service'

@Component({
  selector: 'app-dasborad',
  templateUrl: './dasborad.component.html',
  styleUrls: ['./dasborad.component.css'],
})
export class DasboradComponent implements OnInit {
  openMenu: boolean = false
  title = 'Glow'
  displayResult = false
  showErrorMsg: boolean = false
  loading: boolean = true
  routines: any = []
  msg = {
    detail: 'Deleted Routine successfully',
    summary: 'Success',
    severity: 'success',
  }
  constructor(
    private asideService: AsideService,
    private dataService: DataService,
    private router: Router,
  ) {
  }
  async ngOnInit() {
    this.asideService.openAside$.subscribe((val) => {
      this.openMenu = val
    })
    this.asideService.setSection('routines')
    await this.getroutines()
  }
  async getroutines() {
    await this.dataService.getroutines()
    this.dataService.routines$.subscribe((data) => {
      this.routines = data
    })
    this.loading = false
  }
  async filterGlobal(event: any) {
    let searchedWord = event.target.value.toLowerCase()
    if (!searchedWord) {
      return await this.getroutines()
    }
    this.routines = this.routines.filter((routine: any) => {
      return routine.name.toLowerCase()?.includes(searchedWord)
    })
  }

  async delete(routineId: string) {
    await this.dataService.deleteroutine(routineId)
    await this.getroutines()
    this.showErrorMsg = true
  }
  navigate(id: string) {
    this.router.navigate([`dashboard/edit-routine/${id?.trim()}`])
  }
}
