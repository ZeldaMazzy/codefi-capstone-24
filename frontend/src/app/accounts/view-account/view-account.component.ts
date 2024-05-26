import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/auth.model';
import { AccountsService } from '../accounts.service';
import { Account } from '../accounts.model';
import { TransactionService } from 'src/app/transaction/transaction.service';
import { SimpleTransaction } from 'src/app/transaction/transaction.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {
  constructor(private route: ActivatedRoute, private accountService: AccountsService, private transactionService: TransactionService) { }
  account: Account | null = null;
  transactions: SimpleTransaction [] = [];
  columnsToDisplay = ['Date', 'Amount'];
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
      const AccountID = this.route.snapshot.params['id'];
      if (AccountID) {
        combineLatest([this.accountService.getAccountById(AccountID),
        this.transactionService.getTransactions(AccountID)]).subscribe({
          next: ([account, transactions]) => {
            this.account = account;
            this.transactions = transactions;
          }
        })
      };
    };
  }
