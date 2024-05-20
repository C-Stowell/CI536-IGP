document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sellerId = urlParams.get('sellerId');

  if (sellerId) {
    loadSellerProfile(sellerId);
  }

  const modal = document.getElementById("messageModal");
  const span = document.getElementsByClassName("close")[0];
  const messageSellerButton = document.getElementById('messageSellerButton');

  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  messageSellerButton.onclick = () => {
    const sellerId = document.querySelector('.stars').getAttribute('data-seller');
    document.getElementById('sellerId').value = sellerId;
    modal.style.display = "block";
  };

  document.getElementById('messageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!');
    modal.style.display = "none";
  });

  document.querySelectorAll('.stars span').forEach(star => {
    star.addEventListener('click', (e) => {
      const value = parseInt(e.target.getAttribute('data-value'));
      const seller = e.target.parentElement.getAttribute('data-seller');
      saveRating(seller, value);
    });
  });
});

function loadSellerProfile(sellerId) {
  // Dummy data for example, replace with actual data fetching logic
  const sellerData = {
    seller1: {
      name: 'Seller 1',
      description: 'Specializes in electronics and gadgets.',
      rating: [5, 4, 4, 5]
    },
    // Add more sellers as needed
  };

  const seller = sellerData[sellerId];
  if (seller) {
    document.getElementById('seller-name').textContent = seller.name;
    document.getElementById('seller-description').textContent = seller.description;
    document.querySelector('.stars').setAttribute('data-seller', sellerId);
    updateAverageRating(sellerId, seller.rating);
  }
}

function saveRating(seller, value) {
  let ratings = JSON.parse(localStorage.getItem('ratings')) || {};
  if (!ratings[seller]) {
    ratings[seller] = [];
  }
  ratings[seller].push(value);
  localStorage.setItem('ratings', JSON.stringify(ratings));
  updateAverageRating(seller, ratings[seller]);
}

function updateAverageRating(seller, ratings) {
  const avg = (ratings.reduce((acc, val) => acc + val, 0) / ratings.length).toFixed(1);
  document.getElementById('rating').textContent = `Average Rating: ${avg}`;
}
