const express = require("express");
const dotenv = require("dotenv");
const database = require("./configs/database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = Number(process.env.PORT) || 3000;


const userRouter = require("./routes/userRoute");
const driverRouter = require("./routes/driverRoute");
const vehicleTypeRouter = require("./routes/vehicleTypeRoute");
const customerRouter = require("./routes/customerRoute");
const trackingRouter = require("./routes/trackingRoute");
const vehicleRouter = require("./routes/vehicleRoute");
const findDriverRouter = require("./routes/findDriverRoute");



const { login, register } = require("./auth/auth");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Middleware


app.listen(port, async () => {
  try {
    await database.connect();
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error(`Failed to connect to the database: ${err}`);
  }
});

database.connect();

app.use("/users", userRouter);
app.use("/vehicle-type", vehicleTypeRouter);
app.use("/vehicles", vehicleRouter);
app.use("/drivers", driverRouter);
app.use("/customers", customerRouter);
app.use("/tracking", trackingRouter);
app.get("/verifyToken", authMiddleware, (req, res) => {
  res.json("Token is valid");
});

app.use("/find-driver", findDriverRouter);

app.post("/login", login);
app.post("/register", register);
