<?php
header('Content-Type: application/json');

// Define valid username and password combinations
$validCredentials = [
    ['username' => '12345678', 'password' => '87654321'],
    ['username' => '11111111', 'password' => '22222222'],
    ['username' => '33333333', 'password' => '44444444'],
    ['username' => '55555555', 'password' => '66666666'],
    ['username' => '77777777', 'password' => '88888888'],
    ['username' => '99999999', 'password' => '00000000'],
    ['username' => '12121212', 'password' => '34343434'],
    ['username' => '56565656', 'password' => '78787878'],
    ['username' => '90909090', 'password' => '23232323'],
    ['username' => '45454545', 'password' => '67676767']
];

// Get POST data
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Validate credentials
$isValid = false;
foreach ($validCredentials as $credential) {
    if ($credential['username'] === $username && $credential['password'] === $password) {
        $isValid = true;
        break;
    }
}

// Return response
if ($isValid) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
