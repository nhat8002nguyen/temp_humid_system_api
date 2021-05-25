const express = require("express");
const User = require("../models/User");
const changePassValidation = require("../validations/changePassValidation");
const bcrypt = require("bcryptjs");
const verify = require("../verify");
const changeInfoValidation = require("../validations/changeInfoValidation");

const router = express.Router();

// update user profile
router.post("/profile/password", verify, async (req, res) => {
    const id = req.query.id;

    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(404).send({ error: "User not found !" });
    }

    // check req.body
    const { error } = changePassValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const curPassword = req.body.curPassword;

    // compare old password with password in database
    const validPassword = await bcrypt.compare(curPassword, user.password);
    if (!validPassword)
        return res.status(400).send({ error: "Current password is wrong !" });

    // check enter new password
    if (req.body.newPassword === req.body.curPassword)
        return res.status(400).send({ error: "New password must different" });

    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    user.password = hashedPassword;

    try {
        await user.save();
        res.send({ status: "Change password successfully !" });
    } catch (err) {
        res.status(400).send({ error: "Can not update !" });
    }
});

router.post("/profile/info", verify, async (req, res) => {
    const id = req.query.id;
    const { error } = await changeInfoValidation(req.body);
    if (error) {
        return res.status(400).send({ error: error.details[0].message });
    }

    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).send({ error: "User not found" });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;

    try {
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send({ error: "Can not update user info" });
    }
});

router.get("/profile", verify, async (req, res) => {
    const id = req.query.id;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).send({ error: "User not found" });

    res.send(user);
});

module.exports = router;
