import { Component, OnInit } from '@angular/core';
import { UserDetails, UserService } from '../../Services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  firstName: string = "Rakib";
  lastName: string = "Noushad";
  currentUserInfo!: UserDetails;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.userService.currentUserData.subscribe(data => {
      this.currentUserInfo = data;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
    })

  }


}
