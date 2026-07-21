const bcrypt = require('bcryptjs');

// Password yang ingin di-hash
const passwords = {
    'admin': 'admin12345',
    'user1': 'password123',
    'user2': 'password123'
};

console.log('=== HASH PASSWORD GENERATOR ===\n');

// Generate hash untuk setiap password
for (const [label, password] of Object.entries(passwords)) {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error(`Error hashing ${label}:`, err);
        } else {
            console.log(`${label} (${password}):`);
            console.log(hash);
            console.log('');
        }
    });
}

console.log('\nCopy hash di atas dan gunakan untuk update database!');
console.log('\nContoh SQL:');
console.log("UPDATE users SET password = 'HASH_DI_ATAS' WHERE email = 'admin@diskominfo.go.id';");
