const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./src/routers/auth");
const usersRoute = require("./src/routers/users");
const historyRoute = require("./src/routers/histories");
const thresholdRoute = require("./src/routers/threshold");

const app = express();
dotenv.config();

// Mongoose connection
mongoose.connect(
    "mongodb+srv://nhat:dadnProject@cluster0.e4tak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("mongoose connected !")
);

// Middleware
app.use(express.json({ limit: "10mb" }));

// Route middlewares
app.use("/api/user", authRoute);
app.use("/api", usersRoute);
app.use("/api", historyRoute);
app.use("/api", thresholdRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App start at port ${port} ...`);
});
