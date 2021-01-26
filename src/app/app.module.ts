import { MatComponentsModule } from './Components/mat-components/mat-components.module';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from 'src/in-memory-data.service';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { UserListComponent } from './Components/profile/user-list.component';
import { NavComponent } from './Components/nav/nav.component';
import { UserInfoComponent } from './Components/user-info/user-info.component';
import { UpdateInfoComponent } from './Components/update-info/update-info.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './Components/admin/admin.component';
import { UpdateUserDialog } from './Components/update-user-dialog/update-user-dialog.component';
import { JoinPipe } from './Pipes/join.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UserListComponent,
    NavComponent,
    UserInfoComponent,
    UpdateInfoComponent,
    AdminComponent,
    UpdateUserDialog,
    JoinPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 }),
    NgbModule
  ],
  providers: [FormControl],
  bootstrap: [AppComponent]
})
export class AppModule { }
