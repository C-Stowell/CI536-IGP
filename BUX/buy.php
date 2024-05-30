<?php
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: sign_in.php');
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

// Fetch products
$sql = "SELECT id, product_name, description, price, image_url FROM BUX";
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search = $conn->real_escape_string($_GET['search']);
    $sql .= " WHERE product_name LIKE '%$search%' OR description LIKE '%$search%'";
}
if (isset($_GET['category']) && $_GET['category'] != 'all') {
    $category = $conn->real_escape_string($_GET['category']);
    $sql .= (strpos($sql, 'WHERE') !== false ? ' AND' : ' WHERE') . " category = '$category'";
}

$result = $conn->query($sql);

if (!$result) {
    die("Error executing query: " . $conn->error);
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buy Products</title>
    <link rel="stylesheet" href="css/buy.css">
    <script src="js/scripts.js" defer></script>
</head>
<body>
    <header class="header">
        <img src="images/campus.jpg" alt="Header Image" class="header-bg">
        <div class="header-content">
            <img src="images/logo.png" alt="BUX Logo" class="logo">
            <h1>Welcome to BUX Marketplace</h1>
        </div>
    </header>


<div class="nav-container">
    <a href="buy.php" class="nav-link">Buy</a>
    <a href="sign_out.php" class="nav-link sign-out-btn">Sign Out</a>
</div>


<main>
    <div class="search-filter">
        <form method="GET" action="buy.php">
            <input type="text" name="search" placeholder="Search for products...">
            <select name="category">
                <option value="all">All Categories</option>
                
            </select>
            <button type="submit">Search</button>
        </form>
    </div>
    <div class="products">
        <?php if ($result->num_rows > 0): ?>
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="product">
                    <img src="<?php echo htmlspecialchars($row['image_url']); ?>" alt="<?php echo htmlspecialchars($row['product_name']); ?>">
                    <h2><?php echo htmlspecialchars($row['product_name']); ?></h2>
                    <p><?php echo htmlspecialchars($row['description']); ?></p>
                    <p>£<?php echo htmlspecialchars(number_format($row['price'], 2)); ?></p>
                    <button class="buy-btn" onclick="confirmPurchase()">Buy</button>
                </div>
            <?php endwhile; ?>
        <?php else: ?>
            <p>No products found.</p>
        <?php endif; ?>
    </div>
    <div class="pagination">
        <a href="#">&laquo;</a>
        <a href="#" class="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">&raquo;</a>
    </div>
</main>
<button onclick="topFunction()" id="backToTopBtn" title="Go to top">Top</button>
<script>
function confirmPurchase() {
    if (confirm("Are you sure you want to buy this?")) {
        alert("Congratulations, you have bought the product!");
        return true;
    } else {
        return false;
    }
}
</script>
</body>
</html>
