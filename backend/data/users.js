// make sure to hash and salt your passwords w/ B-Crypt
import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10), // hashSync(password, # of rounds - default is 10)
        isAdmin: true
    },
    {
        name: 'Cali Kemperton',
        email: 'caliK@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'John Cruiser',
        email: 'JCruise@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;