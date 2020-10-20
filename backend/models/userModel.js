import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// create a method to check if the input password matches w/ registered password
// (we need to import bcryptjs bc the pw is hashed)
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    
}

// initialize a model
const User = mongoose.model('User', userSchema);

export default User;