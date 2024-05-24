document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sellerId = urlParams.get('sellerId');

  if (sellerId) {
    loadSellerProfile(sellerId);
  }

  const messageSellerButton = document.getElementById('messageSellerButton');
  const chatSection = document.getElementById('chatSection');
  const chatInput = document.getElementById('chatInput');
  const sendMessageButton = document.getElementById('sendMessageButton');
  const chatMessages = document.getElementById('chatMessages');

  if (messageSellerButton) {
    messageSellerButton.onclick = () => {
      chatSection.style.display = "flex";
    };
  }

  if (sendMessageButton) {
    sendMessageButton.onclick = () => {
      const message = chatInput.value.trim();
      if (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    };
  }

  const stars = document.querySelectorAll('.stars span');
  if (stars) {
    stars.forEach(star => {
      star.addEventListener('click', (e) => {
        const value = parseInt(e.target.getAttribute('data-value'));
        const seller = e.target.parentElement.getAttribute('data-seller');
        saveRating(seller, value);
      });
    });
  }
});

function loadSellerProfile(sellerId) {
  const sellerData = {
    seller1: {
      name: 'Seller 1',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },

      seller2: {
        name: 'Seller 2',
        description: 'Person selling tablet',
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

function search() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  
  // Implement your search logic here
  
  // Example: Redirect to search results page with query string
  window.location.href = `search-results.html?q=${encodeURIComponent(searchInput)}`;
}
