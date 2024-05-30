<?php
// Start the session
session_start();

// Unset all session variables
$_SESSION = [];

// Destroy the session
session_destroy();

// Redirect to a suitable page after sign-out, such as the homepage
header("Location: index.php"); // Replace 'index.php' with the appropriate URL
exit();
?>
