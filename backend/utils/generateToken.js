import jwt from 'jsonwebtoken'

// generate token given user id
const generateToken = (id) => {
    // payload is id, secret is in env variables, expires in 30 days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export default generateToken;