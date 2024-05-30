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

// Pagination variables
$limit = 20;
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $limit;

// Fetch products
$sql = "SELECT id, product_name, description, price, image_url FROM BUX";

// Search and sort functionality
if (isset($_GET['search']) && !empty($_GET['search'])) {
    $search = $conn->real_escape_string($_GET['search']);
    $sql .= " WHERE product_name LIKE '%$search%' OR description LIKE '%$search%'";
}
if (isset($_GET['sort'])) {
    $sort = $conn->real_escape_string($_GET['sort']);
    if ($sort == 'alpha') {
        $sql .= " ORDER BY product_name ASC";
    } elseif ($sort == 'price_asc') {
        $sql .= " ORDER BY price ASC";
    } elseif ($sort == 'price_desc') {
        $sql .= " ORDER BY price DESC";
    }
} else {
    $sql .= " ORDER BY id ASC";
}

$sql .= " LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

// Total pages calculation
$total_sql = "SELECT COUNT(*) FROM BUX";
if (isset($search)) {
    $total_sql .= " WHERE product_name LIKE '%$search%' OR description LIKE '%$search%'";
}
$total_result = $conn->query($total_sql);
$total_rows = $total_result->fetch_row()[0];
$total_pages = ceil($total_rows / $limit);

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buy Products</title>
    <link rel="stylesheet" href="css/buy.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
                <select name="sort">
                    <option value="alpha">Alphabetically</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
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
                        <button class="buy-btn" onclick="confirmPurchase(<?php echo $row['id']; ?>)">Buy</button>
                    </div>
                <?php endwhile; ?>
            <?php else: ?>
                <p>No products found.</p>
            <?php endif; ?>
        </div>
        <div class="pagination">
            <?php if ($page > 1): ?>
                <a href="?page=<?php echo $page - 1; ?>">&laquo; Previous</a>
            <?php endif; ?>
            <?php for ($i = 1; $i <= $total_pages; $i++): ?>
                <a href="?page=<?php echo $i; ?>" class="<?php echo $i == $page ? 'active' : ''; ?>"><?php echo $i; ?></a>
            <?php endfor; ?>
            <?php if ($page < $total_pages): ?>
                <a href="?page=<?php echo $page + 1; ?>">Next &raquo;</a>
            <?php endif; ?>
        </div>
    </main>
    <button onclick="topFunction()" id="backToTopBtn" title="Go to top">Top</button>
    <script>
        function confirmPurchase(productId) {
            if (confirm("Are you sure you want to buy this?")) {
                $.ajax({
                    url: 'purchase.php',
                    type: 'POST',
                    data: { id: productId },
                    success: function(response) {
                        alert(response);
                        location.reload();
                    },
                    error: function() {
                        alert('Error processing your purchase.');
                    }
                });
            }
        }
    </script>
    <footer class="footer">
        <div class="container">
            <a href="contact_support.php" class="back-btn">Contact Support</a>
        </div>
    </footer>
</body>
</html>
