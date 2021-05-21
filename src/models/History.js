const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
    minTemp: {
        type: Number,
        require: true,
    },
    maxTemp: {
        type: Number,
        require: true,
    },
    averageTemp: {
        type: Number,
        require: true,
    },
    minHumid: {
        type: Number,
        require: true,
    },
    maxHumid: {
        type: Number,
        require: true,
    },
    averageHumid: {
        type: Number,
        require: true,
    },
    speaker: {
        type: Boolean,
        require: true,
    },
    created_at: {
        type: String,
        default: new Date().toISOString(),
    },
});

module.exports = mongoose.model("History", historySchema);
