import { filter } from "rxjs";
import { Account } from "../accounts/accounts.model";

export const TEST_DATA_ACCOUNTDATA: Account[] = [
    {
        _id: "1",
        accountNumber: "123456789",
        routingNumber: "123456789",
        transactions: "1",
        balance: 100,
        userId: "1"
    }
]