const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Transaction = require('./transaction.model')

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        require: [true, 'Account Number Require'],
        minlength: [10, 'Account Number must be 10 digits'],
        maxlenth: [10, 'Account Number must be 10 digits']
    },
    routingNumber: {
        type: String,
        require: [true, 'Routing Number is require'],
        minlength: [8, 'Routing Number must be 8 digits'],
        maxlenth: [8, 'Routing Number must be 8 digits']
    },
    accountBalance: {
        type: Number,
        require: [true, 'Balance is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
})

accountSchema.methods.calculateBalance = async function () {
    const transactions = await Transaction.find({ account: this._id })

    let sum = 0;
    for (let i = 0; i < transactions.length; i++) {
        sum = sum + transactions[i].amount;
    }

    this.accountBalance = sum;
}

// userSchema.methods.comparePassword = async function (incomingPassword) {
//     const isMatch = await bcrypt.compare(incomingPassword, this.password);
//     return isMatch;
// };

module.exports = mongoose.model('Account', accountSchema);
//https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2