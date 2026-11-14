const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },

    category: {
        type: String,
        required: true,
        trim: true
    },

    priceKobo: {
        type: Number,
        required: true,
        min: 1,
        validate: {
            validator: Number.isSafeInteger,
            message: "Product price must be a safe integer in kobo"
        }
    },

    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        validate: {
            validator: Number.isSafeInteger,
            message: "Stock must be a whole number"
        }
    },

    images: {
        type: [String],
        default: []
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    reviewCount: {
        type: Number,
        default: 0,
        min: 0
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    deletedAt: {
        type: Date,
        default: null
    }

}, {
    timestamps: true
});

productSchema.index({
    name: "text",
    description: "text"
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;