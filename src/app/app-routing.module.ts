import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent, Role } from './Components/admin/admin.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { UserListComponent } from './Components/profile/user-list.component';
import { AuthGuard } from './Services/auth.guard';
const routes: Routes = [
  { 
    path: '',
    component: LoginComponent
  },
  { 
    path: 'signup',
    component: SignupComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'profile',
    canActivate: [AuthGuard],
    component: UserListComponent
  },
  { 
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: [Role.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
