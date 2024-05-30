import { Injectable } from '@angular/core';
import { CreateTransaction, SimpleTransaction, Transaction } from './transaction.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  constructor(private http: HttpClient, private router: Router) { }

  private endpoint: string = "http://localhost:2077/api/v1/transactions"

  getTransactions(accountID: string): Observable<SimpleTransaction[]> {
    return this.http.get<any>(this.endpoint + '?account=' + accountID)
      .pipe(map(r => r.data))
  }

  getTransactionByID(TransactionID: string): Observable<Transaction | null> {
    return this.http.get<any | null>(this.endpoint + '/' + TransactionID)
      .pipe(map(r => r.data))
  }

  updateTransaction(transactionToChange: Transaction): Observable<Transaction> {
    return this.http.put<any>(this.endpoint + '/' + transactionToChange._id, transactionToChange)
      .pipe(map(r => r.data))
  }
  addTransaction(addTransaction: CreateTransaction): Observable<Transaction> {
    return this.http.post<any>(this.endpoint, addTransaction)
      .pipe(map(r => r.transaction))
  }

  deleteTransaction(deleteTransaction: Transaction): Observable<void> {
    return this.http.delete<void>(this.endpoint + '/' + deleteTransaction._id)
  }
}