import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class DataService {
	private routines = new BehaviorSubject<any>([]);
	public routines$ = this.routines.asObservable();
	private Dermatologists = new BehaviorSubject<any>([]);
	public Dermatologists$ = this.Dermatologists.asObservable();
	constructor(private router: Router, public firestore: AngularFirestore, private auth: AngularFireAuth) {}
	addroutine(Record: any): any {
		let routines = { ...Record, id: this.firestore.createId() };
		return this.firestore
			.collection("routines")
			.doc(routines.id)
			.set({ ...routines })
			.then(() => {
				const msg = "routines added successfully";

				return {
					detail: msg,
					severity: "success",
					summary: "Success",
				};
			})
			.catch((err) => {
				console.error(err);
			});
	}

	getroutines() {
		let routines: any = [];
		return this.firestore
			.collection("routines")
			.get()
			.subscribe((data: any) => {
				data.docs.map((ele: any) => routines.push(ele.data()));
				this.routines.next(routines);
				console.log({ routines });
			});
	}
	getDermatologists() {
		let Dermatologists: any = [];
		return this.firestore
			.collection("Dermatologists")
			.get()
			.subscribe((data: any) => {
				data.docs.map((ele: any) => Dermatologists.push(ele.data()));
				this.Dermatologists.next(Dermatologists);
			});
	}

	getroutine(routineId: string) {
		return this.firestore.collection("routines").doc(routineId).get();
	}
	getDermatologist(routineId: string) {
		return this.firestore.collection("Dermatologists").doc(routineId).get();
	}

	updateroutine(id: string, routines: any) {
		return this.firestore
			.collection("routines")
			.doc(id)
			.update({ ...routines, id });
	}
	updateDermatologist(id: string, routines: any) {
		return this.firestore
			.collection("Dermatologists")
			.doc(id)
			.update({ ...routines, id });
	}
	deleteroutine(id: string) {
		return this.firestore.collection("routines").doc(id).delete();
	}
	deleteDermatologist(id: string) {
		return this.firestore.collection("Dermatologists").doc(id).delete();
	}
	addNewDermatologist(form: any) {
		return this.auth["createUserWithEmailAndPassword"](form.email, "Dermatologist123").then((res: { user: any }) => {
			return this.firestore
				.collection("Dermatologists")
				.doc(res.user.uid)
				.set({ name: form.name, email: form.email, id: res.user.uid })
				.then(() => {
					const msg = "Dermatologist added successfully";
					return {
						detail: msg,
						severity: "success",
						summary: "Success",
					};
				})
				.catch((err) => {
					console.error(err);
				});
		});
	}
}
