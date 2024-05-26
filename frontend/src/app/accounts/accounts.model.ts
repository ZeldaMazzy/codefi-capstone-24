export class Account {
    _id: string = "";
    accountNumber: string = "";
    routingNumber: string = "";
    transactions: any[] = [];
    balance: number = 0;
    userId: string = "";
};

export class AddAccount {
    accountNumber: string = "";
    routingNumber: string = "";
}