import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { NgForm } from '@angular/forms';
import { AddAccount } from '../accounts.model';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})

// <form (submit)="onCreate(accountcreateForm)" #accountcreateForm="ngForm"  *ngIf="!isLoading">
export class CreateAccountComponent {
  isLoading = false;
  constructor(private Account: AccountsService) {
  }
  onCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const payload: AddAccount = {
      accountNumber: form.value.accountInput,
      routingNumber: form.value.routingInput
    }
    this.Account.addAccount(payload).subscribe()
  }
}
