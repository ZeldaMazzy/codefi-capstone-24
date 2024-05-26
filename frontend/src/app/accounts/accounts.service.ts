import { Injectable } from '@angular/core';
import { Account, AddAccount } from './accounts.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AccountsService {
  constructor(private http: HttpClient, private router: Router) { }

  private endpoint: string = "http://localhost:2077/api/v1/accounts/"

  getAccounts(): Observable<Account[]> {
    return this.http.get<any>(this.endpoint)
      .pipe(map(r => r.data))
  }

  getAccountById(AccountID: string): Observable<Account | null> {
    return this.http.get<any | null>(this.endpoint + AccountID)
     .pipe(map(r => r.data))
  }

  updateAccount(accountToChange: Account): Observable<Account> {
    return this.http.put<any>(this.endpoint + accountToChange._id, accountToChange)
      .pipe(map(r => r.data))
  }

  addAccount(addAccount: AddAccount): Observable<Account> {
    return this.http.post<any>(this.endpoint, addAccount)
      .pipe(map(r => r.data))
  }

  deleteAccount(deleteAccount: Account): Observable<void> {
    return this.http.delete<void>(this.endpoint + deleteAccount._id)
  }
}