const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const database = require('./configs/database');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/userRoute');
const driverRouter = require('./routes/driverRoute');
const bodyParser = require('body-parser');
dotenv.config();

app.set('view engine', 'ejs')

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

database.connect();

app.use('/users', userRouter);
app.use('/drivers', driverRouter);
