const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        require: [true, 'There needs to be a transaction amount']
    },

    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        require: true
    },
}
)

module.exports = mongoose.model('Transaction', transactionSchema);