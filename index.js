const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const database = require('./config/database');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/userRoute');

dotenv.config();

app.set('view engine', 'ejs')

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

database.connect();

app.use('/users', userRouter);
