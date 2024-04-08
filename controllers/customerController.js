const Customer = require('../models/customer');
const User = require('../models/user');

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const getCustomerById = async (req, res) => {

  try {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const addCustomer = async (req, res) => {
  try {
    const { defaultAddress } = req.body;
		if (!req.body.userId) {
			const user = new User({
				fullName: req.body.fullName,
				email: req.body.email,
				phone: req.body.phone,
				password: hashPassword(req.body.password),
			});
      await user.save();

		} else {
			const user = await User.findById(req.body.userId).catch((err) => {
				res.status(400).json(`Error: ${err}`);
			});
		}



    const newCustomer = new Customer({
      userId: user._id,
      defaultAddress
    });

    await newCustomer.save();
    res.json('Customer added!');
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    customer.userId = req.body.userId;
    customer.defaultAddress = req.body.defaultAddress;
    customer.save();
    res.json('Customer updated!');
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json('Customer deleted!');
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
}

const getCustomerLocation = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    res.json({
      latitude: customer.latitude,
      longitude: customer.longitude
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
    res.json('Customer location updated!');
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
  updateCustomerLocation
};
