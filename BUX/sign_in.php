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
    $password = $_POST['password'];

    $sql = "SELECT password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        $_SESSION['username'] = $username;
        header('Location: buy.php');
        exit();
    } else {
        $error = "Invalid username or password.";
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
    <title>Sign In</title>
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
<nav>
    <a href="create_account.php">Create Account</a>
    <a href="sign_in.php">Sign In</a>
</nav>
<main>
    <form method="POST" action="sign_in.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Sign In</button>
    </form>
    <?php if (isset($error)) { echo "<p style='color:red;'>$error</p>"; } ?>
</main>
</body>
</html>
