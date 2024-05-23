import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {

    private dashboardStatusListener = new Subject<{ firstName: string, lastName: string, accountNumber: number }>();

    constructor(private http: HttpClient, private router: Router) { }

    getUserData(userId: string) {
        const userData = {
            firstName: "",
            lastName: "",
            accountNumber: 0,
            balance: 0,
            transactions: [],
        };
        this.http.get
            <{
                firstName: string,
                lastName: string,
                accountNumber: number,
                balance: number,
                transactions: [],
            }>
            ('http://localhost:3000/api/user/dashboard/' + userId)
            .subscribe(res => {
                userData.firstName = res.firstName;
                userData.lastName = res.lastName;
                userData.accountNumber = res.accountNumber;
                userData.balance = res.balance;
                userData.transactions = res.transactions;
                this.dashboardStatusListener.next(userData);
            });
    }

    getUserDataListener() {
        return this.dashboardStatusListener.asObservable(); 
    }
}