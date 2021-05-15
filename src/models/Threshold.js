const mongoose = require("mongoose");

const thresholdSchema = mongoose.Schema({
    humid: {
        type: String,
        require: true,
    },
    temp: {
        type: String,
        require: true,
    },
    speakerFreq: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model("Threshold", thresholdSchema);
