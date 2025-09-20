<?php
// Database of valid usernames and passwords
$validCredentials = [
    'user1234' => 'pass1234',
    'testuser' => 'testpass',
    'gamemaster' => 'gamepass1',
    'player001' => 'playpass1',
    'silentg01' => 'silentp01',
    'premium01' => 'premium1',
    'gamer1234' => 'gamerpass',
    'admin0001' => 'adminpass',
    'member001' => 'member01',
    'access001' => 'access001'
];

// Get the submitted username and password
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Initialize response array
$response = ['success' => false];

// Check if credentials are valid
if (!empty($username) && !empty($password)) {
    if (isset($validCredentials[$username]) && $validCredentials[$username] === $password) {
        $response['success'] = true;
        $response['message'] = 'Login successful';
    }
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
