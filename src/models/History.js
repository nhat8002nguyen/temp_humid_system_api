const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
    temp: {
        type: Number,
        require: true,
    },
    humid: {
        type: Number,
        require: true,
    },
    speaker: {
        type: Boolean,
        require: true,
    },
    time: {
        type: String,
        default: Date(Date.now()),
    },
});

module.exports = mongoose.model("History", historySchema);
