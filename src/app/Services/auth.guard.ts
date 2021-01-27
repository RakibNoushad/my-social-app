import { UserService } from '../Services/user-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentState:boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthServiceService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let currentUser = this.userService.currentUserInfo;
      this.authService.currentState.subscribe(data => {
        this.currentState = data;
      
    })
      console.log(this.currentState);
      if(currentUser && this.currentState){
        if(route.data.role && route.data.role != currentUser.role){
          this.router.navigate(['/profile']);
          return false;
        }
        return true;
      }
        // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
}
