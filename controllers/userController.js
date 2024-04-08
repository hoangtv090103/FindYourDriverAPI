const express = require("express");
const User = require("../models/user");
const { hashPassword } = require("../utils/hashPassword");
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});
		// res.render('addUser', { title: 'Add User' });

		res.json(users);
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
};

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
};

const addUser = async (req, res) => {
	const { fullName, email, phone, password } = req.body;
	const hashedPassword = await hashPassword(password);
	const newUser = new User({
		fullName,
		email,
		phone,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		res.json("User added!");
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		user.fullName = req.body.fullName;
		user.email = req.body.email;
		user.phone = req.body.phone;
		user.password = req.body.password;
		user.save();
		res.json("User updated!");
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
};

const deleteUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json("User deleted!");
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
