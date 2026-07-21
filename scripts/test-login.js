const axios = require('axios');

async function testLogin() {
    console.log('=== TESTING LOGIN API ===\n');

    // Test Admin Login
    console.log('1. Testing Admin Login...');
    try {
        const adminResponse = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'admin@diskominfo.go.id',
            password: 'admin12345'
        });
        
        console.log('✓ Admin Login SUCCESS');
        console.log('Response:', JSON.stringify(adminResponse.data, null, 2));
    } catch (error) {
        console.log('✗ Admin Login FAILED');
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }

    console.log('\n2. Testing User Login...');
    try {
        const userResponse = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'budi@email.com',
            password: 'password123'
        });
        
        console.log('✓ User Login SUCCESS');
        console.log('Response:', JSON.stringify(userResponse.data, null, 2));
    } catch (error) {
        console.log('✗ User Login FAILED');
        if (error.response) {
            console.log('Error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }

    console.log('\n3. Testing Wrong Password...');
    try {
        const wrongResponse = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'admin@diskominfo.go.id',
            password: 'wrongpassword'
        });
        
        console.log('✗ Should have failed but succeeded');
    } catch (error) {
        console.log('✓ Correctly rejected wrong password');
        if (error.response) {
            console.log('Error:', error.response.data);
        }
    }

    console.log('\n=== TEST COMPLETE ===');
}

testLogin();
