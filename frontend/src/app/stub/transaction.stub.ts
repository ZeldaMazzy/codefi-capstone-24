import { Transaction } from "../transaction/transaction.model";
import { TEST_DATA_ACCOUNTDATA } from "./account.stub";

export const TEST_DATA_TRANSACTION: Transaction[] = [

    {
        _id: "1",
        amount: 100,
        account: TEST_DATA_ACCOUNTDATA[0]
    },

    {
        _id: "2",
        amount: 200,
        account: TEST_DATA_ACCOUNTDATA[1]
    },

    {
        _id: "3",
        amount: 300,
        account: TEST_DATA_ACCOUNTDATA[2]
    }
]
