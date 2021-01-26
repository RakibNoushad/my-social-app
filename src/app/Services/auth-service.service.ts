import { BASEURL } from './../util/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { UserDetails } from './user-service.service';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  button: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService{

  private users!: User[];
  private usersUrl = 'api/';

  state = new BehaviorSubject(false);
  currentState = this.state.asObservable();

  constructor(
    private http: HttpClient  ) {}

  setCurrentState(state: boolean){
    this.state.next(state);
  }

  getUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.usersUrl}users`);
  }

  getUserById(id: number): Observable<UserDetails>{
    return this.http.get<UserDetails>(`${this.usersUrl}users/${id}`).pipe(
      catchError(this.handleError<UserDetails>('getUserById', undefined))
    );
  }

  addUser(user: UserDetails): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.usersUrl}users`, user);
  }

  loginUser(body: any): Observable<UserDetails> {
    this.getUsers().subscribe( (response: UserDetails[]) => {
      let user = response[response.findIndex(a => a.email === body.email)];
    });
    return this.http.post<UserDetails>(`${BASEURL}/temp`,body);
  }

  updateUser(id: number, user: UserDetails){
    return this.http.put(`${this.usersUrl}users/${id}`, user)
  }

  deleteUser(id: number){
    return this.http.delete(`${this.usersUrl}users/${id}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
