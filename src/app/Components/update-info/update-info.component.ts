import { IInterest, UserDetails, UserService } from './../../Services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  userInfo!: FormGroup;
  currentUser!: UserDetails

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  interests: IInterest[] = [
    {name: 'Reading'}
  ];

  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.currentUser = this.userService.currentUserInfo;
    this.interests = this.currentUser.interest
    this.userInfo = this.formBuilder.group({
      firstName: [this.currentUser.firstName, Validators.required],
      email: [this.currentUser.email, Validators.required],
      password: [this.currentUser.password, Validators.required],
      lastName: [this.currentUser.lastName, Validators.required],
      dateOfBirth: [this.currentUser.dateOfBirth],
      profession: [this.currentUser.proffesion],
      phone: [this.currentUser.phone],
      location: [this.currentUser.location],
      gender: [this.currentUser.gender]
    })


  }

  async updateUserInfo(){
    const id = this.currentUser.id;
    const email = this.userInfo.controls.email.value;
    const lastName = this.userInfo.controls.lastName.value;
    const firstName = this.userInfo.controls.firstName.value;
    const password = this.userInfo.controls.password.value;
    const dateOfBirth = this.userInfo.controls.dateOfBirth.value;
    const profession = this.userInfo.controls.profession.value;
    const phone = this.userInfo.controls.phone.value;
    const location = this.userInfo.controls.location.value;
    const gender = this.userInfo.controls.gender.value;
    const role = this.currentUser.role;
     
    
    let updateUser: UserDetails = new UserDetails(id, email, firstName, lastName,
      password, role, dateOfBirth, profession, phone, location, gender, 
      this.interests)
    try {
      await this.authService.updateUser(id, updateUser)
      .subscribe(user => {
            this.authService.getUserById(id).subscribe(data => {
              this.userService.SetCurrentUser(data);
              this.currentUser = this.userService.currentUserInfo;
            })
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  //chips functionality

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Interest
    if ((value || '').trim()) {
      this.interests.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(interest: IInterest): void {
    const index = this.interests.indexOf(interest);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

}





