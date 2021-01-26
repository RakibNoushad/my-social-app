import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASEURL } from '../util/config';

export interface IInterest {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserId!: number;
  currentUserInfo!: UserDetails;
  currentLabel: number = 1;

  currentUser = new BehaviorSubject(this.currentUserInfo);
  currentUserData = this.currentUser.asObservable();

  constructor(
    private http: HttpClient
  ) { }



  GetAllUsers(): Observable<any> {
    return this.http.get(`${BASEURL}/users`);
  }

  GetUserById(id: any): Observable<any> {
    return this.http.get(`${BASEURL}/user/${id}`);
  }

async SetCurrentUser(userInfo: UserDetails){
    this.currentUserInfo = userInfo;
    this.currentUser.next(userInfo);
  }
}


export class UserDetails {
  id: number|any;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  dateOfBirth: Date;
  proffesion: string;
  phone: string;
  location: string;
  gender: string;
  interest: IInterest[];


  constructor(id: number|any, email: string, firstName: string, 
    lastName: string, password: string, role?: string, dateOfBirth?: Date, 
    proffesion?: string, phone?: string, loacation?: string, gender?: string,
    interest?: IInterest[]) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.role = role ? role : 'user';
    this.dateOfBirth = dateOfBirth ? dateOfBirth : new Date;
    this.proffesion = proffesion ? proffesion : '';
    this.phone = phone ? phone : '';
    this.location = loacation ? loacation : '';
    this.gender = gender ? gender : '';
    this.interest = interest ? interest : [{ name: ''}];


  }

  // UI behaviour
  Visibility: boolean = true

}
