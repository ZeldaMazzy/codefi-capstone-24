import { Injectable } from '@angular/core';
import { Account } from './accounts.model';
import { EMPTY, Observable, findIndex, of } from 'rxjs';
import { TEST_DATA_ACCOUNTDATA } from '../stub/account.stub';


@Injectable({
  providedIn: 'root'
})

export class AccountsService {
  constructor() { }

  getAccounts(): Observable<Account[]> {
    return of(TEST_DATA_ACCOUNTDATA)
  }

  getAccountById(AccountID: string): Observable<Account| null> {
    const account: Account | undefined = TEST_DATA_ACCOUNTDATA.find((account: Account) => {
      return account._id == AccountID;
    })
    return of(account || null);
  }

  updateAccount(accountToChange: Account): Observable<Account> {
    const accountIndex: number = TEST_DATA_ACCOUNTDATA.findIndex((account: Account) => {
      return account._id === accountToChange._id;
    })
    TEST_DATA_ACCOUNTDATA[accountIndex] = accountToChange;
    return of(accountToChange);
  }

  addAccount(addAccount: Account): Observable<Account> {
    TEST_DATA_ACCOUNTDATA.push();
    return of(addAccount)
  }

  deleteAccount(deleteAccount: Account): Observable<void> {
    const accountIndex: number = TEST_DATA_ACCOUNTDATA.findIndex((account: Account) => {
      return account._id === deleteAccount._id;
    })
    TEST_DATA_ACCOUNTDATA.splice(accountIndex);
    return EMPTY;
  }
}