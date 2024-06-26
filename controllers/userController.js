const express = require("express");
const User = require("../models/user");
const { hashPassword } = require("../utils/hashPassword");
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // res.render('addUser', { title: 'Add User' });

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const addUser = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res
      .status(400)
      .json("Please add all fields (fullName, email, phone, password)");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    fullName,
    email,
    phone,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json("User added!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateUser = async (req, res) => {
  if ('password' in req.body) {
    req.body.password = await hashPassword(req.body.password);
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json("User updated!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
