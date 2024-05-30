<?php
session_start();

// Database connection details
$servername = "localhost";
$username = "jp1487_jp1487";
$password = "tj9?Ay7xFh~y";
$dbname = "jp1487_BUX";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param('ss', $username, $password);

    if ($stmt->execute()) {
        header('Location: sign_in.php');
        exit();
    } else {
        echo "Error executing statement: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Account</title>
    <link rel="stylesheet" href="css/common.css">
</head>
<body>
<header>
    <div class="header-content">
        <img src="images/logo.png" alt="BUX Logo" class="logo">
        <div class="slogan">
            <p>Your Student Marketplace at the University of Brighton</p>
        </div>
    </div>
</header>
<nav class="button-nav">
    <a href="create_account.php" class="button">Create Account</a>
    <a href="sign_in.php" class="button">Sign In</a>
</nav>

<main>
    <h1>Create an account below</h1>
    <form method="POST" action="create_account.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Create Account</button>
    </form>
</main>
</body>
</html>
