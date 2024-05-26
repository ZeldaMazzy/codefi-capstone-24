const Account = require('../models/account.model')
const mongoose = require('mongoose')

const getAccounts = async (req, res) => {
    try {
        const allAccounts = await Account.find({ user: req.userId })
        res.status(200).json({ success: true, data: allAccounts })
    }
    catch (e) {
        res.status(400).json({ success: false, msg: "Accounts Not Found: " + e.message })
    }
};

const getAccountById = async (req, res) => {
    try {
        const accountId = req.params.id;
        const account = await Account.findOne({ _id: accountId, "user": { _id: req.userId } }).populate('transactions')
        if (account == null) {
            throw new Error("No Account")
        }
        await account.calculateBalance()
        res.status(200).json({ success: true, data: account })
    }
    catch (e) {
        res.status(400).json({ success: false, msg: "Account Not Found:" + e.message })
    }
}

const updateAccount = async (req, res) => {
    try {
        const accountToUpdate = req.params.id;
        const account = await Account.findOneAndUpdate(
            { _id: accountToUpdate, "user": { _id: req.userId } },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        res.status(201).json({ success: true, msg: "Account Updated", data: account })
    }

    catch (e) {
        res.status(400).json({ success: false, msg: "Account not Updated: " + e.message })
    }
}

const addAccount = async (req, res) => {
    try {
        const payload = {
            ...req.body,
            accountBalance: 0,
            user: req.userId
        }
        newAccount = await Account.create(payload)
        res.status(201).json({ success: true, msg: "Account Created", account: newAccount })
    }
    catch (e) {
        res.status(400).json({ success: false, msg: "Account cannot be created: " + e.message })
    }
}

const deleteAccount = async (req, res) => {
    try {
        const accountToDelete = req.params.id;
        await Account.findOneAndDelete(
            { _id: accountToDelete, "user": { _id: req.userId } }
        );
        res.status(204).send()
    }


    catch (e) {
        res.status(400).json({ success: false, msg: "Account not Deleted:" + e.message })
    }
}

module.exports = {
    getAccounts, getAccountById, updateAccount, addAccount, deleteAccount
}