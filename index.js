const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const database = require('./configs/database');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/userRoute');
const driverRouter = require('./routes/driverRoute');
const vehicleTypeRouter = require('./routes/vehicleTypeRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
const { login, register } = require('./auth/auth');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

app.set('view engine', 'ejs')

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

database.connect();

app.use('/users', userRouter);
app.use('/drivers', driverRouter);
app.use('/vehicle-type', vehicleTypeRouter);

app.get('/verifyToken', authMiddleware, (req, res) => {
  res.json('Token is valid');
});

app.post('/login', login);
app.post('/register', register);
