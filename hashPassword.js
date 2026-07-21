// hashPassword.js
const bcrypt = require('bcrypt');

// Ganti password ini dengan password yang ingin Anda hash
const password = 'admin12345';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed password:', hash);
    }
});