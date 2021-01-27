import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails, IInterest } from '../../Services/user-service.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  infoContent: number = 1;
  location: string = "";
  gender: string = "";
  dob: Date = new Date;
  interest: IInterest[] = [{ name: ""}];
  firstname: string = "";
  lastname: string = "";
  email:string = "";
  phone:string = "";
  profession:string = "";

  currentUserInfo!: UserDetails;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.currentUserData.subscribe(data => {
      this.currentUserInfo = data;
      this.init();
    })
    this.init();
  }

  init(){
    this.firstname = this.currentUserInfo.firstName;
    this.lastname = this.currentUserInfo.lastName;
    this.email = this.currentUserInfo.email;
    this.profession = this.currentUserInfo.proffesion;
    this.gender = this.currentUserInfo.gender;
    this.location = this.currentUserInfo.location;
    this.phone = this.currentUserInfo.phone;
    this.dob = this.currentUserInfo.dateOfBirth;
    this.interest = this.currentUserInfo.interest;

  }

  toggle(value: number){
    this.infoContent = value;
  }



}
