import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  state: boolean = false;

  constructor(
    private authService: AuthServiceService
  ) { }
  
  ngOnInit(): void {
    this.authService.currentState.subscribe(state => {
      this.state = state;
    })
  }

  logout(){
    this.authService.setCurrentState(false);
  }

}
