import mongoose from 'mongoose'

// design our schema for users
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})
// the second option, 'timestamps' automatically adds 'createdAt' and 'updatedAt' fields in our schema

// initialize a model
const User = mongoose.model('User', userSchema);

export default User;