const express = require("express");
const User = require("../models/User");
const registerValidation = require("../validations/registerValidation");
const loginValidation = require("../validations/loginValidation");
const changePassValidation = require("../validations/changePassValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../verify");
const changeInfoValidation = require("../validations/changeInfoValidation");

const router = express.Router();

// Register route

router.post("/register", async (req, res) => {
    // register validation
    const registerData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    };
    const { error } = registerValidation(registerData);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
        return false;
    }
    // email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        res.status(400).send({ error: "Email already exist" });
        return false;
    }
    // check email exist
    const phoneExist = await User.findOne({ phone: req.body.phone });
    if (phoneExist) {
        res.status(400).send({ error: "Phone already exist" });
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
        res.status(400).send({ error: "Can not register" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    // login validation
    const loginData = {
        email: req.body.email,
        password: req.body.password,
    };
    const { error } = await loginValidation(loginData);
    if (error) {
        res.status(400).send({ error: error.details[0].message });
        return false;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send({ error: "Email is not exist !" });
        return false;
    }
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        res.status(400).send({ error: "Password is invalid!" });
        return false;
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ ...user._doc, token: token });
});

module.exports = router;
