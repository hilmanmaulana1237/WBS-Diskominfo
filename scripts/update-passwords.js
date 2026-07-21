const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function updatePasswords() {
    try {
        // Create connection
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        console.log('✓ Connected to database\n');

        // Check current data
        console.log('=== CURRENT DATA ===');
        const [currentUsers] = await connection.query('SELECT id, name, email, role FROM users');
        console.table(currentUsers);

        // Generate hash untuk password baru
        const adminPassword = 'admin12345';
        const userPassword = 'password123';
        
        console.log('\n=== GENERATING NEW HASHES ===');
        const adminHash = await bcrypt.hash(adminPassword, 10);
        const userHash = await bcrypt.hash(userPassword, 10);
        
        console.log('Admin password (admin12345) hash:', adminHash);
        console.log('User password (password123) hash:', userHash);

        // Update admin password
        console.log('\n=== UPDATING PASSWORDS ===');
        
        const [adminResult] = await connection.query(
            'UPDATE users SET password = ? WHERE email = ?',
            [adminHash, 'admin@diskominfo.go.id']
        );
        console.log(`✓ Admin password updated (${adminResult.affectedRows} row)`);

        const [budiResult] = await connection.query(
            'UPDATE users SET password = ? WHERE email = ?',
            [userHash, 'budi@email.com']
        );
        console.log(`✓ Budi password updated (${budiResult.affectedRows} row)`);

        const [sitiResult] = await connection.query(
            'UPDATE users SET password = ? WHERE email = ?',
            [userHash, 'siti@email.com']
        );
        console.log(`✓ Siti password updated (${sitiResult.affectedRows} row)`);

        // Verify update
        console.log('\n=== VERIFYING UPDATE ===');
        const [updatedUsers] = await connection.query(
            'SELECT id, name, email, role, LEFT(password, 30) as password_preview FROM users'
        );
        console.table(updatedUsers);

        // Test password verification
        console.log('\n=== TESTING PASSWORD VERIFICATION ===');
        const [adminUser] = await connection.query(
            'SELECT * FROM users WHERE email = ?',
            ['admin@diskominfo.go.id']
        );
        
        if (adminUser.length > 0) {
            const isMatch = await bcrypt.compare(adminPassword, adminUser[0].password);
            console.log(`Admin password test: ${isMatch ? '✓ MATCH' : '✗ NOT MATCH'}`);
        }

        console.log('\n=== LOGIN CREDENTIALS ===');
        console.log('Admin: admin@diskominfo.go.id / admin12345');
        console.log('User: budi@email.com / password123');
        console.log('User: siti@email.com / password123');

        await connection.end();
        console.log('\n✓ Done!');
    } catch (error) {
        console.error('Error:', error);
    }
}

updatePasswords();
