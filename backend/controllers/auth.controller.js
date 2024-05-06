
const User = require("../models/user.model")
const mongoose = require('mongoose')

/* Tmiddleware ref class 8 note
Test all of your routes in Postman! */

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
        res.status(200).json({ message: "Successfully logged in", return: payload })
    }

    catch (e) {

        res.status(401).send("Login Fail")
    }
};

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.create({ firstName: firstName, lastName: lastName, email: email, password: password })
        res.status(201).json({ message: "User Created" })
    }
    catch (e) {
        res.status(401).send("Registration Failed")
    }
}

module.exports = {
    login, register
}