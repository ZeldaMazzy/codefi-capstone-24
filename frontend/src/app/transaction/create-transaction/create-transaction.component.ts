import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/accounts/accounts.model';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { CreateTransaction } from '../transaction.model';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})

export class CreateTransactionComponent implements OnInit {
  isLoading = true;
  account: Account = new Account()
  constructor(private accountservice: AccountsService,
    private transactionservice: TransactionService,
    private Router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    const accountId = this.route.snapshot.params['id']
    this.accountservice.getAccountById(accountId).subscribe(
      {
        next: account => {
          this.account = account || new Account()
          this.isLoading = false;
        }
      }
    )
  }

  onDeposit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form)
    this.isLoading = true;

    const payload: CreateTransaction = {
      amount: form.value.amountInput,
      account: this.account._id
    }
    this.transactionservice.addTransaction(payload).subscribe({
      next: res => {
        const id = this.account._id
        this.Router.navigate(["/accounts", id])
      }
    })
  }
}

