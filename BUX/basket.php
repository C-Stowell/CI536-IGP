<?php
session_start();
// Check if basket is set in session storage
$basket = $_SESSION['basket'] ?? [];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BUX Marketplace - Basket</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Header with navigation links -->
    <header>
        <nav>
            <ul>
                <li><a href="buy.php">Buy</a></li>
                <li><a href="basket.php">Basket</a></li>
                <li><a href="sell.php">Sell</a></li>
            </ul>
        </nav>
    </header>

    <!-- Basket contents -->
    <div class="basket">
        <?php foreach ($basket as $productName): ?>
            <p><?php echo htmlspecialchars($productName); ?></p>
        <?php endforeach; ?>
    </div>

    <!-- Checkout button -->
    <button onclick
