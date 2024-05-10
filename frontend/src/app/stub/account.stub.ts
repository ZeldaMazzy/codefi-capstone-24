import { filter } from "rxjs";
import { Account } from "../accounts/accounts.model";

export const TEST_DATA_ACCOUNTDATA: Account[] = [
    {
        _id: "1",
        accountNumber: "123456789",
        routingNumber: "123456789",
        transactions: [1, 2, 3],
        balance: 100,
        userId: "1"
    },

    {
        _id: "2",
        accountNumber: "987654321",
        routingNumber: "987654321",
        transactions: [4, 5, 6],
        balance: 200,
        userId: "2"
    },

    {
        _id: "3",
        accountNumber: "123456789",
        routingNumber: "123456789",
        transactions: [7, 8, 9],
        balance: 300,
        userId: "3"
    }
]
