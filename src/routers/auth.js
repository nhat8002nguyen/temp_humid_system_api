const express = require("express");
const User = require("../models/User");
const registerValidation = require("../validations/registerValidation");
const loginValidation = require("../validations/loginValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register route

router.post("/register", async (req, res) => {
    // register validation
    const { error } = registerValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return false;
    }
    // email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        res.status(400).send("Email already exist");
        return false;
    }
    // check email exist
    const phoneExist = await User.findOne({ phone: req.body.phone });
    if (phoneExist) {
        res.status(400).send("Phone already exist");
        return false;
    }

    // hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send("Can not register");
    }
});

// Login route
router.post("/login", async (req, res) => {
    // login validation
    const { error } = await loginValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return false;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send("Email is not exist !");
        return false;
    }
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        res.status(400).send("Password is invalid!");
        return false;
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
});

module.exports = router;
