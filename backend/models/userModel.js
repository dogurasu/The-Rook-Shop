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

// before we save, let's encrypt the password
// 'pre' for before save
userSchema.pre('save', async function(next) {
    // we only want to run this if the password field is sent or modified
    // when we're only updating things like our name or email, we don't want to run this
    if (!this.isModified('password')) {
        next();
    }

    // use salt to hash pw async'ly
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // initially, this.password was plaintext - now it's hashed
});

// initialize a model
const User = mongoose.model('User', userSchema);

export default User;