const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    orderId: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: "Rating must be a whole number between 1 and 5"
        }
    },

    comment: {
        type: String,
        trim: true,
        maxlength: 1000
    }

}, {
    timestamps: true
});

reviewSchema.index(
    { buyer: 1, product: 1 },
    { unique: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;