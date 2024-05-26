import { Account } from "../accounts/accounts.model";

export class Transaction {
    _id: string = "";
    amount: number = 0;
    account: Account = new Account();

};

export class SimpleTransaction {
    createdAt: Date = new Date();
    amount: number = 0;
}