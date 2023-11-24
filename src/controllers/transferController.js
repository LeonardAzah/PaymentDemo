require("dotenv").config();
const Transfer = require("../models/Transfer");
const Flutterwave = require("flutterwave-node-v3");
const StatusCodes = require("http-status-codes");
const CustomError = require("../errors");
const { paginate } = require("../utils");

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

const initTrans = async (req, res) => {
  const payload = req.body;
  const sender = req.user.userId;

  // Remove the "user" field from the payload during testing
  delete payload.user;

  const response = await flw.Transfer.initiate(payload);

  const transfer = new Transfer({
    ...payload,
    user: sender,
  });
  await transfer.save();
  res.status(StatusCodes.CREATED).json({
    response,
  });
};

const getFee = async (req, res) => {
  const payload = req.body;

  const response = await flw.Transfer.fee(payload);
  res.status(StatusCodes.OK).json({ response });
};

const getAllTrans = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const transfers = await paginate({
    model: Transfer,
    page,
    limit,
  });

  res.status(StatusCodes.OK).json({
    transfers,
  });
};

getUserTransferHistory = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filters = { user: req.user.userId };
  const excludeFields = "user";

  const transfers = await paginate({
    model: Transfer,
    page,
    limit,
    excludeFields,
    filters,
  });
  res.status(StatusCodes.OK).json({
    transfers,
  });
};

const getATransfer = async (req, res) => {
  const id = req.params;
  const transfer = await Transfer.findOne({ _id: req.params });
  console.log(transfer);

  if (!transfer) {
    throw new CustomError.NotFoundError("Transfer not found");
  }

  res.status(StatusCodes.OK).json({
    transfer,
  });
};

module.exports = {
  initTrans,
  getATransfer,
  getAllTrans,
  getFee,
  getUserTransferHistory,
};
