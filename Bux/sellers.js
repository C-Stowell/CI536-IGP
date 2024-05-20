<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seller Profile</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="categories.html">Categories</a></li>
        <li><a href="cart.html">Cart</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="seller-profile">
      <h1 id="seller-name">Seller Name</h1>
      <p id="seller-description">Seller description goes here.</p>

      <div class="rating">
        <span>Rate this seller:</span>
        <div class="stars" data-seller="">
          <span data-value="1">&#9733;</span>
          <span data-value="2">&#9733;</span>
          <span data-value="3">&#9733;</span>
          <span data-value="4">&#9733;</span>
          <span data-value="5">&#9733;</span>
        </div>
        <div class="average-rating" id="rating">Average Rating: 0</div>
      </div>

      <button onclick="messageSeller()">Message Seller</button>
    </section>
  </main>

  <footer>
    <p>&copy; 2023 BUX</p>
  </footer>

  <!-- Message Modal -->
  <div id="messageModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Message Seller</h2>
      <form id="messageForm">
        <input type="hidden" id="sellerId" name="sellerId">
        <label for="message">Your Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
