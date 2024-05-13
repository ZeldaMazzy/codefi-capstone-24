const express = require("express");
const { getTransactions, getTransactionById, updateTransaction, addTransaction, deleteTransaction } = require("../controllers/transaction.controller");
const router = express.Router();

// transactions/:id
// transactions?account=ssssssss


router.route("/").get(getTransactions);
router.route("/:id").get(getTransactionById);
router.route("/:id").put(updateTransaction);
router.route("/").post(addTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;