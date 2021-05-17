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
    created_at: {
        type: String,
        default: new Date().toISOString(),
    },
});

module.exports = mongoose.model("History", historySchema);
