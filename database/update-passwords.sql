-- Update Password untuk Admin dan User
-- Password admin: admin12345
-- Password user: password123

USE wbs_diskominfo;

-- Update Admin Password
UPDATE users 
SET password = '$2a$10$Yyy9.tL7anEVTbWZ83iwc.HI1rtLF.KAOZ9F7n7m9poeGho3uDw1C' 
WHERE email = 'admin@diskominfo.go.id';

-- Update Budi Password
UPDATE users 
SET password = '$2a$10$6AaWGUFNBpZxPyAuSol8our7y04qKcuxA7CJkabpM9mlguOTDuVla' 
WHERE email = 'budi@email.com';

-- Update Siti Password  
UPDATE users 
SET password = '$2a$10$dy0qVBrTXkL15EPJ.M4JzeQCodgW8p.Pr6MU57qIziUAA14jNeYc6' 
WHERE email = 'siti@email.com';

-- Verify
SELECT id, name, email, role, 
       LEFT(password, 20) as password_preview 
FROM users;

-- Test Login Info
SELECT '=== LOGIN CREDENTIALS ===' as info;
SELECT 'Admin: admin@diskominfo.go.id / admin12345' as credentials
UNION ALL
SELECT 'User: budi@email.com / password123'
UNION ALL
SELECT 'User: siti@email.com / password123';
