import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private userSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.userIsAuthenticated = !!user;
    })
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}