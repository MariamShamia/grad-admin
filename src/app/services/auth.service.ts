import { Injectable, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  loginValue: boolean
  completeform: boolean
  adminInfo: any
  item: any
  admins: any = []
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    public firestore: AngularFirestore,
  ) {}
  async ngOnInit() {
    await this.getAdmins();
	await this.getUserData();
  }
  private errorMsg = new BehaviorSubject<string>('')
  public errorMsg$ = this.errorMsg.asObservable()
  private email = new BehaviorSubject<any>('')
  public email$ = this.email.asObservable()

  private username = new BehaviorSubject<any>(null)
  public username$ = this.username.asObservable()

  private profileData = new BehaviorSubject<any>(null)
  public profileData$ = this.profileData.asObservable()

  public get getErrorMsg(): string {
    return this.errorMsg.getValue()
  }

  userId = ''

  register(form: any, Record: any) {
    this.auth['createUserWithEmailAndPassword'](form.email, form.password).then(
      (res: { user: any }) => {
        this.userId = res.user.uid
        this.firestore
          .collection('admins')
          .doc(res.user.uid)
          .set({ name: Record.name, email: form.email })
          .then(() => {
            this.username.next(Record.name)
            this.email.next(form.email)
            this.router.navigate(['/dashboard'])
          })
      },
    )
  }
  async login(form: any) {
    try {
      const res = await this.auth['signInWithEmailAndPassword'](
        form.email,
        form.password,
      )
      this.userId = res.user?.uid!
      this.email.next(form.email)
      await this.getUserData()
      const checkIfAdmin = this.admins.find(
        (admin: string) => admin === form.email,
      )
      if (checkIfAdmin) {
        this.router.navigate(['/dashboard'])
      } else {
        this.errorMsg.next('This user is not admin')
      }
    } catch (error) {
      this.errorMsg.next('Invalid Email or Password')
    }
  }

  ResetPassword(email: string) {
    let msg
    return this.auth
      .sendPasswordResetEmail(email)
      .then(
        () => {
          msg =
            'A password reset link has been sent to your email address , check spam emails'

          return {
            detail: msg,
            summary: 'Success',
            severity: 'success',
          }
        },
        (rejectionReason) => {
          msg = 'There is no user record corresponding to this identifier.'
          return (
            rejectionReason && {
              detail: msg,
              severity: 'error',
              summary: 'Error',
            }
          )
        },
      )
      .catch((e) => {
        msg = 'An error occurred while attempting to reset your password'
        return { detail: msg, severity: 'error', summary: 'Error' }
      })
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login'])
      this.loginValue = false
    })
  }

  getUserData() {
    return this.firestore
      .collection('admins')
      .doc(this.userId)
      .get()
      .subscribe((data) => {
        this.username.next(data.data())
      })
  }

  getAdmins() {
    return this.firestore
      .collection('admins')
      .get()
      .subscribe((data) => {
        data.docs.map((ele: any) => this.admins.push(ele.data().email))
      })
  }
}
