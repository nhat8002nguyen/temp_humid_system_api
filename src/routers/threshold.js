const router = require("express").Router();
const Threshold = require("../models/Threshold");
const thresholdValidation = require("../validations/thresholdValidation");
const verify = require("../verify");

router.get("/threshold", verify, async (req, res) => {
    try {
        const threshold = await Threshold.findById("threshold123");
        res.send(threshold);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/threshold", verify, async (req, res) => {
    const thresholdData = {
        temp: req.body.temp,
        humid: req.body.humid,
    };
    const { error } = thresholdValidation(thresholdData);
    if (error) return res.status(400).send(error.details[0].message);

    const threshold = new Threshold(req.body);
    threshold._id = "threshold123";
    try {
        const savedThreshold = await threshold.save();
        res.send(savedThreshold);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put("/threshold", verify, async (req, res) => {
    const threshold = await Threshold.findById("threshold123");
    if (!threshold) return res.status(400).send("Something wrong !");

    if (req.body.temp) threshold.temp = req.body.temp;
    if (req.body.humid) threshold.humid = req.body.humid;

    try {
        const savedThreshold = await threshold.save();
        res.send(savedThreshold);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
