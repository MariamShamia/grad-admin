import { AuthService } from 'app/services/auth.service';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PrimeIcons } from "primeng/api";
import { AsideService } from "../../../services/aside.service";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
	isSection: string = "survey";
	@Input() isSideSmall: boolean = false;
	@Output() isMenuopen = new EventEmitter();
	allCompnayIcon = PrimeIcons.USERS;
	logoutIcon = PrimeIcons.ARROW_CIRCLE_LEFT;
	constructor(public section: AsideService,public authService: AuthService) {}

	sideBarArray = [
		{
			icon: PrimeIcons.HOME,
			label: "Routines",
			route: "dashboard",
		},
		{
			icon: PrimeIcons.USERS,
			label: "Dermatologists",
			route: "dashboard/Dermatologists",
		},
		{
			icon: PrimeIcons.PLUS,
			label: "Add Routine",
			route: "/dashboard/add-routine",
		},
		{
			icon: PrimeIcons.USER_PLUS,
			label: "Add Dermatologist",
			route: "/dashboard/add-Dermatologist",
		},
	];
	closeSideBar() {
		this.isMenuopen.emit(false);
	}
}
