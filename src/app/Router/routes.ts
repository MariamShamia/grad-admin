import { LoginComponent } from '../pages/Auth/login/login.component'
import { SignupComponent } from '../pages/Auth/signup/signup.component'
import { DasboradComponent } from '../pages/dasborad/dasborad.component'
import { ResetpasswordComponent } from '../pages/Auth/resetpassword/resetpassword.component'
import { EditroutineComponent } from 'app/pages/edit-routine/edit-routine.component'
import { AddDermatologistComponent } from 'app/pages/add-Dermatologist/add-Dermatologist.component'
import { DermatologistsComponent } from 'app/pages/Dermatologist/Dermatologists.component'
import { AddroutineComponent } from 'app/pages/add-routine/add-routine.component'
import { EditDermatologistComponent } from 'app/pages/edit-dermatologist/edit-Dermatologist.component'
export const routinegTable = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'dashboard', component: DasboradComponent },
  { path: 'dashboard/Dermatologists', component: DermatologistsComponent },
  { path: 'dashboard/add-routine', component: AddroutineComponent },
  { path: 'dashboard/edit-routine/:id', component: EditroutineComponent },
  { path: 'dashboard/edit-Dermatologist/:id', component: EditDermatologistComponent },
  { path: 'dashboard/add-Dermatologist', component: AddDermatologistComponent },
]
