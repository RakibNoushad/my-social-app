import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MAT_DIALOG_DATA, _closeDialogVia } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { IInterest, UserDetails, UserService } from '../../Services/user-service.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
/**
 * @title Dialog with header, scrollable content and actions
 */

@Component({
  selector: 'dialog-update-user',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialog {

  userInfo!: FormGroup;
  currentUser!: UserDetails;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  hide = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  interests: IInterest[] = [
    { name: 'Reading' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.init()
  }

  async init() {
    await this.authService.getUserById(this.data).subscribe(data => {
       this.userService.SetCurrentUser(data);
    })
    this.currentUser = this.userService.currentUserInfo;
    this.interests = this.currentUser.interest;

    this.userInfo = this.formBuilder.group({
      firstName: [this.currentUser.firstName],
      email: [this.currentUser.email],
      password: [this.currentUser.password],
      lastName: [this.currentUser.lastName],
      dateOfBirth: [this.currentUser.dateOfBirth],
      profession: [this.currentUser.proffesion],
      phone: [this.currentUser.phone],
      location: [this.currentUser.location],
      gender: [this.currentUser.gender]
    })
  }

  async updateUserInfo() {

    const email = this.userInfo.controls.email.value;
    const lastName = this.userInfo.controls.lastName.value;
    const firstName = this.userInfo.controls.firstName.value;
    const password = this.userInfo.controls.password.value;
    const dateOfBirth = this.userInfo.controls.dateOfBirth.value;
    const profession = this.userInfo.controls.profession.value;
    const phone = this.userInfo.controls.phone.value;
    const location = this.userInfo.controls.location.value;
    const gender = this.userInfo.controls.location.value;
    const role = this.currentUser.role;

    let updateUser: UserDetails = new UserDetails(this.data, email, firstName, 
      lastName, password, role, dateOfBirth, profession,  phone, location, gender,
      this.interests)
    try {
      await this.authService.updateUser(this.data, updateUser)
        .subscribe(user => {
        });
    } catch (error) {
      console.log(error);
    }
  }

  //chips functionality

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.interests.push({ name: value.trim() });
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
