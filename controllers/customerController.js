const Customer = require("../models/customer");
const User = require("../models/user");
const { hashPassword } = require("../utils/hashPassword");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json(customer);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const addCustomer = async (req, res) => {
  try {
    const { defaultAddress } = req.body;
    let user;
    if (!req.body.userId) {
      const newUser = new User({
        email: req.body.email,
        phone: req.body.phone,
        password: await hashPassword(req.body.password),
      });
      user = await newUser.save();
    } else {
      user = await User.findById(req.body.userId).catch((err) => {
        res.status(400).json(`Error: ${err}`);
      });
    }

    const newCustomer = new Customer({
      fullName: req.body.fullName,
      userId: user._id,
      defaultAddress,
    });

    await newCustomer.save();
    res.status(200).json(`Customer {${newCustomer.fullName}} added!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(`Customer {${customer.fullName}} updated!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    await User.findByIdAndDelete(customer.userId);
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json("Customer deleted!");
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getCustomerLocation = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    res.status(200).json({
      latitude: customer.latitude,
      longitude: customer.longitude,
    });
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const updateCustomerLocation = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    customer.latitude = req.body.latitude;
    customer.longitude = req.body.longitude;
    customer.save();
    res.status(200).json(`Customer ${customer.fullName} location updated!`);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};

const getCustomerInformation = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.status(200).json(customer);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
};



module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerLocation,
  updateCustomerLocation,
};
