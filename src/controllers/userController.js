const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
} = require("../utils");
const { paginate } = require("../utils");

const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filters = { role: "user" };
  const excludeFields = "password";

  const users = await paginate({
    model: User,
    page,
    limit,
    excludeFields,
    filters,
  });
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError("User not found");
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { name, email, dateOfBirth, phone } = req.body;
  if (!name || !email || !dateOfBirth || !phone) {
    throw new CustomError.BadRequestError("Provide email & name");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { name, email, dateOfBirth, phone },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(updatedUser);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
};
