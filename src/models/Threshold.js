const mongoose = require("mongoose");

const thresholdSchema = mongoose.Schema({
    maxHumid: {
        type: String,
        require: true,
    },
    minHumid: {
        type: String,
        require: true,
    },
    minTemp: {
        type: String,
        require: true,
    },
    mintemp: {
        type: String,
        require: true,
    },
    speakerFreq: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model("Threshold", thresholdSchema);
