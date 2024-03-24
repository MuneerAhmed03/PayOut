const express = require("express");
const { authMiddleWare } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

const accountRoute = express.Router();

accountRoute.get("/balance", authMiddleWare, async (req, res) => {
  const account = await Account.findOne({
    _id: req.userId,
  });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }
  res.json({
    balance: account.balance,
  });
});

accountRoute.get("/user-datails",authMiddleWare,async(req,res)=>{
  const account = await Account.findOne({
    userId: req.userId,
  }).populate({
    path: "userId",
    select: "firstName",
  });
  res.json({account});
})

accountRoute.post("/transfer", authMiddleWare, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = accountRoute;
