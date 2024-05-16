import { Injectable } from '@angular/core';
import { Transaction } from './transaction.model';
import { EMPTY, Observable, findIndex, of } from 'rxjs';
import { TEST_DATA_TRANSACTION } from '../stub/transaction.stub';
import { TEST_DATA_ACCOUNTDATA } from '../stub/account.stub';
import { Account } from '../accounts/accounts.model';


@Injectable({
  providedIn: 'root'
})


export class TransactionService {

  constructor() { }
  getTransactions(accountID: string): Observable<Transaction[]> {
    return of (TEST_DATA_TRANSACTION)
  }

  getTransactionByID(_id: string): Observable<Transaction | null> {
    const transaction: Transaction | undefined = TEST_DATA_TRANSACTION.find(transaction => transaction._id === _id);
    return of(transaction || null);
  }

  addTransaction(addTransaction: Transaction): Observable<Transaction> {
    TEST_DATA_TRANSACTION.push(addTransaction);
    return of(addTransaction)
  }

  updateTransaction(transactionToChange: Transaction): Observable<Transaction> {
    const transactionIndex: number = TEST_DATA_TRANSACTION.findIndex(transaction => {
      return transaction._id === transactionToChange._id;
    })
    TEST_DATA_TRANSACTION[transactionIndex] = transactionToChange;
    return of(transactionToChange);
  }

  deleteTransaction(deleteTransaction: Transaction): Observable<void> {
    const transactionIndex: number = TEST_DATA_TRANSACTION.findIndex(transaction => {
      return transaction._id === deleteTransaction._id;
    })
    TEST_DATA_TRANSACTION.splice(transactionIndex);
    return EMPTY;
  }

}