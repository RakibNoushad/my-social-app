import { AuthServiceService, User } from './../../Services/auth-service.service';
import { 
  FormControl, 
  FormGroupDirective, 
  NgForm, Validators, 
  ReactiveFormsModule, 
  FormGroup, 
  FormBuilder } 
  from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {ErrorStateMatcher} from '@angular/material/core';
import { UserDetails } from '../../Services/user-service.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class ConfirmPassErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isMatched = form && form.submitted;
    return !!(control && control.invalid)
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  [x: string]: any;
  fNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$')
  ]);

  lNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z ]*$')
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  floatLabelControl = new FormControl('user');

  signupForm!: FormGroup;
//private signupData: IUser;

matcher = new MyErrorStateMatcher();
private users!: User[];
hide=true;
isExist =false;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private ativatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.initSignupForm();
  }
  initSignupForm() {
    this.signupForm = this.FormBuilder.group({
      firstname: this.fNameFormControl,
      lastname: this.lNameFormControl,
      email: this.emailFormControl,
      password: this.passFormControl,
      role: this.floatLabelControl
    });
  }

  close() {
    this.alerts.splice(1);
  }

  async addUser() {
    let user: UserDetails = new UserDetails(undefined, this.signupForm.controls.email.value, this.signupForm.controls.firstname.value, this.signupForm.controls.lastname.value, this.signupForm.controls.password.value, this.signupForm.controls.role.value);
    try {
      await this.authService.getUsers()
      .subscribe(async data => {
        let temp = data[data.findIndex(a => a.email === this.signupForm.controls.email.value)];
        if (temp) {
            this.isExist = true;
            console.log(this.isExist);
          }
          else
          {
            await this.authService.addUser(user)
            .subscribe(user => {
            });   
            
            this.router.navigate(["login"]);
          }
        })
    } 
    catch (error) {
      console.log(error);
    }
  }
}
