const router = require("express").Router();
const History = require("../models/History");
const historyValidation = require("../validations/historyValidation");
const verify = require("../verify");

router.get("/histories", verify, async (req, res) => {
    if (req.headers.id) {
        try {
            const history = await History.findById(req.headers.id);
            res.send(history);
        } catch (err) {
            res.status(400).send({ error: err });
        }
    } else {
        try {
            const histories = await History.find({});
            res.send({ histories });
        } catch (err) {
            res.status(400).send({ error: err });
        }
    }
});

router.post("/histories", verify, async (req, res) => {
    const { error } = historyValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const history = new History(req.body);
    try {
        const savedHistory = await history.save();
        res.send(savedHistory);
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.delete("/histories", verify, async (req, res) => {
    const id = req.headers.id;
    const history = await History.findById(id);
    if (!history) return res.status(400).send({ error: "Not found!" });

    try {
        await History.deleteOne({ _id: id });
        res.send({ history });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

module.exports = router;
