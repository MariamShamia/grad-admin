import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { AsideService } from './services/aside.service';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  openMenu: boolean = false;
  dashboardPages: boolean = true;
  currentUrl: any;
  constructor(
    private auth: AuthService,
    private asideService: AsideService,
    private router: Router,
  ) {
    // this.auth.checkAuth();

  }
  ngOnInit(): void {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.currentUrl = event.url; // Update URL on navigation
      this.checkIfInDashboard(this.currentUrl)
    });
   }
   checkIfInDashboard(currentUrl:any){
    console.log({currentUrl})
    if (!currentUrl.includes('login')&&!currentUrl.includes('register')
        &&!currentUrl.includes('resetpassword')) {
          this.dashboardPages = true;
        } else {
          this.dashboardPages = false;
        }
        console.log({dashboardPages:this.dashboardPages})
   }
  checkMenu(event: boolean) {
    this.openMenu = event;
    this.asideService.setOpenAside(event);
  }
}
