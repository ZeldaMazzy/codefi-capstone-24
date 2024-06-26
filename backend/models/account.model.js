const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Transaction = require('./transaction.model')

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: [true, 'Account Number Require'],
        minlength: [10, 'Account Number must be 10 digits'],
        maxlenth: [10, 'Account Number must be 10 digits']
    },
    routingNumber: {
        type: String,
        required: [true, 'Routing Number is require'],
        minlength: [8, 'Routing Number must be 8 digits'],
        maxlenth: [8, 'Routing Number must be 8 digits']
    },
    accountBalance: {
        type: Number,
        required: [true, 'Balance is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: "Transaction",
        required: true
    }]
})

accountSchema.methods.calculateBalance = async function () {
    const transactions = await Transaction.find({ account: this._id })

    let sum = 0;
    for (let i = 0; i < transactions.length; i++) {
        sum = sum + transactions[i].amount;
    }

    this.accountBalance = sum;
}



module.exports = mongoose.model('Account', accountSchema);