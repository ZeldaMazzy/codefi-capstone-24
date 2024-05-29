import { Component } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { NgForm } from '@angular/forms';
import { AddAccount } from '../accounts.model';
import { Router } from '@angular/router';
import { ViewAccountComponent } from '../view-account/view-account.component';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})


export class CreateAccountComponent {
  isLoading = false;
  constructor(private Account: AccountsService, private Router: Router) {
  }
  onCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form)
    this.isLoading = true;
    const payload: AddAccount = {
      accountNumber: form.value.accountInput,
      routingNumber: form.value.routingInput
    }
    this.Account.addAccount(payload).subscribe({
      next: res => {
        const id = res._id
        this.Router.navigate(["/accounts", id])
      }
    })
  }
}
