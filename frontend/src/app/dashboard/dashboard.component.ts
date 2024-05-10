import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { User } from '../auth/auth.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),
  ]
})
@Injectable()
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
  private authService: AuthService){} 
  user: User | null = null;
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.authService.User.subscribe(user => {
      this.user = user;
      
    })
  }

  // store retrieved user data from server


}

  /* transaction table variables
  dataSource = [];
  columnsToDisplay = ['description', 'amount', 'date'];
  isLoading = false;
  userIsAuthenticated = false;
  
 private authStatusSub: Subscription = new Subscription();
  private userSub: Subscription = new Subscription();



  
  ngOnInit() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    this.dashService.getUserData(userId);
    this.userSub = this.dashService.getUserDataListener()
      .subscribe((
        userData: {
           name: string,
           surname: string, 
           clientNumber: number,  
           balance: number, 
           transactions: {trans: [] }, 
          }) => 
      {
        this.isLoading = false;
        this.user = userData; 
        let dataSourceTemp = [];
        this.user.transactions.trans.map((element, index) => {
          dataSourceTemp.push(element);
          dataSourceTemp[index].date = this.dashService.dateFromISO8601(element.date);
        });
        this.dataSource = dataSourceTemp; 
        if (this.dataSource.length > 0) {
          this.hasTransactions = true;
        }
      });


   this.userIsAuthenticated = this.authService.isAuthenticated();
   this.authStatusSub = this.authService
   .getAuthStatusListener()
   .subscribe(isAuthenticated => {
   this.userIsAuthenticated = isAuthenticated;
      });
  }


ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}


// Interface for accessing transaction fields

/* export interface LastTransaction {
  date: string;
  amount: number;
  paymentMethod: string;
  senderAccountNumber: number;
  receiverAccountNumber: number;
  description: string;
} */