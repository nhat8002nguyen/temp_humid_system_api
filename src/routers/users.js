const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const verify = require("../verify");

router.get("/users", verify, async (req, res) => {
    if (req.headers.id) {
        const userId = req.headers.id;
        try {
            const user = await User.findById(userId);
            res.send(user);
        } catch (err) {
            res.status(400).send({ error: "User not found!" });
        }
    } else {
        const users = await User.find({});
        if (!users) return res.status(404).send({ error: "No user found!" });

        const returnedUser = users.map((user) => ({
            isAdmin: user.isAdmin,
            created_at: user.created_at,
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        }));
        res.send({ users: returnedUser });
    }
});

router.put("/users", verify, async (req, res) => {
    const userId = req.headers.id;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ error: "Not found user!" });

    // hash password
    if (req.params.passoword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.params.password, salt);
        user.password = hashedPassword;
    }

    // update user fields
    if (req.params.name) {
        user.name = req.params.name;
    }
    if (req.params.phone) {
        user.phone = req.params.phone;
    }

    try {
        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.delete("/users", verify, async (req, res) => {
    const userId = req.headers.id;
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ error: "Not found user!" });

    try {
        const removedUser = await User.deleteOne({ _id: userId });
        res.send(user);
    } catch (err) {
        res.status(400).send({ error: "Can not delete user!" });
    }
});

module.exports = router;
