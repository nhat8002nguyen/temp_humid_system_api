const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const verify = require("../verify");

router.get("/users", verify, async (req, res) => {
    const users = await User.find({});
    if (!users) return res.status(404).send("No user found!");

    res.send({ users });
});

router.get("/users/:id", verify, async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.send(user);
    } catch (err) {
        res.status(400).send("User not found!");
    }
});

router.put("/users/:id", verify, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send("Not found user!");

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // update user fields
    user.name = req.body.name;
    user.password = hashedPassword;
    user.phone = req.body.phone;

    try {
        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/users", verify, async (req, res) => {
    const userId = req.headers.id;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send("Not found user!");

    try {
        const removedUser = await User.deleteOne({ _id: userId });
        res.send(user);
    } catch (err) {
        res.status(400).send("Can not delete user!");
    }
});

module.exports = router;
