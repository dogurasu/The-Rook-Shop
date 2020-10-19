import mongoose from 'mongoose'

// design our schema for orders
const orderSchema = mongoose.Schema({
    // user field represents the user who bought the item and whose order this belongs to
    // the 'ref' field tells MongoDB which Object Model this schema is referring to
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // orderItems - array of items in our order w/ name, quantity, etc
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },

        }
    ],
    // shippingAddress has "embedded objects" instead of an array of objects
    shippingAddress: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true
    },
    // the result/receipt you get from Paypal if your order is successful
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        update_time: {
            type: String,
        },
        email_address: {
            type: String
        }
    },
    TaxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    ShippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    TotalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true
})
// the second option, 'timestamps' automatically adds 'createdAt' and 'updatedAt' fields in our schema

// initialize a model
const Order = mongoose.model('Order', orderSchema);

export default Order;