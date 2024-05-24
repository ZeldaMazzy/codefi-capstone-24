const Transaction = require('../models/transaction.model')
const mongoose = require('mongoose');
const { getAccountById } = require('./account.controller');

const getTransactions = async (req, res) => {
    try {
        const accountQuery = req.query.account.replace('/', '');
        const allTransactions = await Transaction.find({ "account": { _id: accountQuery }, "user": { _id: req.userId } })
        res.status(200).json({ success: true, data: allTransactions })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Transactions not Found" })
    }
}

const getTransactionById = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const account = await Transaction.findOne({ _id: transactionId, "user": { _id: req.userId } })
        if (account == null) { res.status(404).json({ success: false, msg: "Transaction Not Found" }) }
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
            { _id: transactionToUpdate, "user": { _id: req.userId } },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if (account == null) { res.status(404).json({ success: false, msg: "Transaction Not Updated" }) }
        res.status(201).json({ success: true, msg: "Transaction Updated", data: transaction })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Transaction not Updated" })
    }
}

const addTransaction = async (req, res) => {
    try {
        const payload = {
            ...req.body,
            user: req.userId
        }
        newTransaction = await Transaction.create(payload)
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
            { _id: transactionToDelete, "user": { _id: req.userId } }
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