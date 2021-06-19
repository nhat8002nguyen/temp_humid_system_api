const mongoose = require("mongoose");

const thresholdSchema = mongoose.Schema({
    temp: {
        type: String,
        require: true,
    },
    humid: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Threshold", thresholdSchema);
