const Transaction = require('../models/transaction.model')
const mongoose = require('mongoose');
const { getAccountById } = require('./account.controller');

// getTransactions [add a query string that lets users filter transactions by account]
// getTransactionById
// updateTransaction
// addTransaction
// deleteTransaction

const getTransactions = async (req, res) => {
    try {
        const accountQuery = req.query.account;
        const allTransactions = await Transaction.find({ "account": { _id: accountQuery } })
        res.status(200).json({ success: true, data: allTransactions })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Transactions not Found" })
    }
}

const getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const account = await Transaction.findOne({ _id: transactionId })
        res.status(200).json({ success: true, data: account })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Transaction not found" })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const transactionToUpdate = req.params.id;
        const transaction = await Transaction.findOneAndUpdate(
            { _id: transactionToUpdate },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        res.status(201).json({ success: true, msg: "Transaction Updated", data: transaction })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Transaction not Updated" })
    }
}

const addTransaction = async (req, res) => {
    try {
        newTransaction = await Transaction.create(req.body)
        res.status(201).json({ success: true, msg: "Transaction Created", transaction: newTransaction })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Transaction not Created" })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const transactionToDelete = req.params.id;
        await Transaction.findOneAndDelete(
            { _id: transactionToDelete }
        );
        res.status(204).json({ success: true, msg: "Transaction Deleted" })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Transaction not Deleted" })
    }
}

module.exports = {
    getTransactions, getTransactionById, updateTransaction, addTransaction, deleteTransaction
}