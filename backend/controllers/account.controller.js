const Account = require('../models/account.model')
const mongoose = require('mongoose')

const getAccounts = async (req, res) => {
    //      (make sure to filter by the user requesting the accounts!)
    try {
        const allAccounts = await Account.find({ user: req.userId })
        res.status(200).json({ success: true, data: allAccounts })
    }
    catch (err) {
        res.status(400).send("Accounts Not Found")
    }
};

const getAccountById = async (req, res) => {
    try {
        const accountId = req.params.id;
        const account = await Account.findOne({ _id: accountId })
        res.status(200).json({ success: true, data: account })
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Account Not Found" })
    }

}

const updateAccount = async (req, res) => {
    try {
        const accountToUpdate = req.params.id;
        const account = await Account.findOneAndUpdate(
            { _id: accountToUpdate },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        res.status(201).json({ success: true, msg: "Account Updated", data: account })
    }

    catch (e) {
        res.status(400).json({ success: false, msg: "Account not Updated" })
    }
}

const addAccount = async (req, res) => {
    try {
        newAccount = await Account.create(req.body)
        res.status(201).json({ success: true, msg: "Account Created", account: newAccount })
    }
    catch (e) {
        res.status(400).json({ success: false, msg: "Account cannot be created" })
    }
}

const deleteAccount = async (req, res) => {
    try {
        const accountToDelete = req.params.id;
        await Task.findOneAndDelete(
            { _id: accountToDelete }
        );
        res.status(204).json({ success: true, msg: "Account Deleted" })
    }


    catch (e) {
        res.status(400).json({ success: false, msg: "Account not Deleted" })
    }
}

module.exports = {
    getAccounts, getAccountById, updateAccount, addAccount, deleteAccount
}