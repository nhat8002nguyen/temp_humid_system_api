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
        minTemp: req.headers.minTemp,
        maxTemp: req.headers.maxTemp,
        minHumid: req.headers.minHumid,
        maxHumid: req.headers.maxHumid,
        speakerFreq: req.headers.speakerFreq,
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

    if (req.headers.minHumid) threshold.minhumid = req.headers.minHumid;
    if (req.headers.maxHumid) threshold.maxhumid = req.headers.maxHumid;
    if (req.headers.minTemp) threshold.minTemp = req.headers.minTemp;
    if (req.headers.maxTemp) threshold.maxTemp = req.headers.maxTemp;
    if (req.headers.speakerFreq)
        threshold.speakerFreq = req.headers.speakerFreq;

    try {
        const savedThreshold = await threshold.save();
        res.send(savedThreshold);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
