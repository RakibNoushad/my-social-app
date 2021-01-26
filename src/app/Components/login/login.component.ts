import { AuthServiceService, User } from './../../Services/auth-service.service';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule, FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from 'src/app/Services/user-service.service';

interface Alert {
  type: string;
  message: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  matcher = new MyErrorStateMatcher();
  hide=true;
  state!: string | boolean;
  loginForm!: FormGroup;
  private loginData: any;
  alerts!: Alert[];
  tried: boolean = false;

  constructor(
   private authService: AuthServiceService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private userService : UserService
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.FormBuilder.group({
      email: this.emailFormControl,
      password: this.passFormControl
    });
  }

  close() {
    this.alerts.splice(1);
  }

  async userLogin() {
    try {
      await this.authService.getUsers()
      .subscribe(async data => {
        let user = data[data.findIndex(a => a.email === this.loginForm.controls.email.value)];
        if (user && user.password==this.loginForm.controls.password.value) {
          this.userService.SetCurrentUser(user)
          this.authService.setCurrentState(true);
          
          if(user.role === 'user') this.router.navigate(["profile"]);
          if(user.role === 'admin') this.router.navigate(["admin"]);

        }
        else
        {
          this.tried = true;
        }
      });
    } 
    catch (error) {
      console.log(error);
    }
  }
}
