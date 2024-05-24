const express = require("express");
const router = express.Router();

const { getAccounts, getAccountById, updateAccount, addAccount, deleteAccount } = require("../controllers/account.controller");

router.route("/").get(getAccounts);
router.route("/:id").get(getAccountById);
router.route("/:id").put(updateAccount);
router.route("/").post(addAccount);
router.route("/:id").delete(deleteAccount);

module.exports = router;