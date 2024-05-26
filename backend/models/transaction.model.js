const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'There needs to be a transaction amount']
    },

    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: [true, 'Account Required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    


},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Transaction', transactionSchema);