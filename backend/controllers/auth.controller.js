
const User = require("../models/user.model")
const mongoose = require('mongoose')

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const passwordsMatch = await user.comparePassword(password);
        if (passwordsMatch == false) {
            throw new Error("Invalid Credentials")
        }

        const funToken = user.createToken();
        const payload = { firstName: user.firstName, lastName: user.lastName, email: user.email, token: funToken }
        res.status(200).json({ success: true, msg: "Successfully logged in", return: payload })
    }

    catch (e) {

        res.status(401).json({ success: false, msg: "Login Fail: " + e.message })
    }
};

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.create({ firstName: firstName, lastName: lastName, email: email, password: password })
        res.status(201).json({ msg: "User Created" })
    }
    catch (e) {
        res.status(401).json({ msg: "Registration Failed: " + e.message })
    }
}

module.exports = {
    login, register
}