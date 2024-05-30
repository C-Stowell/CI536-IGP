<?php
session_start();
if (!isset($_SESSION['username'])) {
    echo "You must be signed in to make a purchase.";
    exit();
}

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

// Handle purchase
if (isset($_POST['id'])) {
    $product_id = $conn->real_escape_string($_POST['id']);
    $buyer = $conn->real_escape_string($_SESSION['username']);

    // Fetch product details
    $product_sql = "SELECT * FROM BUX WHERE id = '$product_id'";
    $product_result = $conn->query($product_sql);

    if ($product_result->num_rows > 0) {
        $product = $product_result->fetch_assoc();
        $product_name = $conn->real_escape_string($product['product_name']);
        $price = $product['price'];

        // Insert into sales
        $sales_sql = "INSERT INTO sales (product_id, product_name, buyer, price, sale_date) VALUES ('$product_id', '$product_name', '$buyer', '$price', NOW())";
        if ($conn->query($sales_sql) === TRUE) {
            // Delete from BUX
            $delete_sql = "DELETE FROM BUX WHERE id = '$product_id'";
            if ($conn->query($delete_sql) === TRUE) {
                echo "Purchase successful! Your order will be ready for pick up at the student union shop at 3PM on the next week day! ";
            } else {
                echo "Error deleting product: " . $conn->error;
            }
        } else {
            echo "Error recording sale: " . $conn->error;
        }
    } else {
        echo "Product not found.";
    }
} else {
    echo "Invalid request.";
}

$conn->close();
?>
