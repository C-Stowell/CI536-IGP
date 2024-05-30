document.addEventListener('DOMContentLoaded', () => {
  // Get sellerId from URL parameters
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

  // Show chat section when "Message Seller" button is clicked
  if (messageSellerButton) {
    messageSellerButton.onclick = () => {
      chatSection.style.display = "flex";
    };
  }

  // Send message and save it to local storage
  if (sendMessageButton) {
    sendMessageButton.onclick = () => {
      const message = chatInput.value.trim();
      if (message) {
        appendMessageToChat(message);
        saveChatMessage(sellerId, message);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    };
  }

  // Load and display existing chat messages from local storage
  loadChatMessages(sellerId);

  // Save rating when a star is clicked
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

// Load seller profile based on sellerId
function loadSellerProfile(sellerId) {
  const sellerData = {
    seller1: {
      name: 'John Doe',
      description: 'A computer science major selling his gently used textbooks.',
      rating: [5, 4, 4, 5]
    },
    seller2: {
      name: 'Jane Smith',
      description: 'Jane is an avid reader studying literature and enjoys sharing her favorite books.',
      rating: [5, 4, 4, 5]
    },
    seller3: {
      name: 'May Johnson',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },
    seller4: {
      name: 'Michael Brown',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },
    seller5: {
      name: 'Sarah Davis',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },
    seller6: {
      name: 'Robert Miller',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },
    seller7: {
      name: 'Linda Wilson',
      description: 'Person selling tablet',
      rating: [5, 4, 4, 5]
    },
    seller8: {
      name: 'James Taylor',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },
    seller9: {
      name: 'Patricia Moore',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },
    seller10: {
      name: 'William Anderson',
      description: 'Person selling book',
      rating: [5, 4, 4, 5]
    },
  };

  const seller = sellerData[sellerId];
  if (seller) {
    document.getElementById('seller-name').textContent = seller.name;
    document.getElementById('seller-description').textContent = seller.description;
    document.querySelector('.stars').setAttribute('data-seller', sellerId);
    updateAverageRating(sellerId, seller.rating);
  }
}

// Save rating to local storage and update average rating
function saveRating(seller, value) {
  let ratings = JSON.parse(localStorage.getItem('ratings')) || {};
  if (!ratings[seller]) {
    ratings[seller] = [];
  }
  ratings[seller].push(value);
  localStorage.setItem('ratings', JSON.stringify(ratings));
  updateAverageRating(seller, ratings[seller]);
}

// Update average rating display
function updateAverageRating(seller, ratings) {
  const avg = (ratings.reduce((acc, val) => acc + val, 0) / ratings.length).toFixed(1);
  document.getElementById('rating').textContent = `Average Rating: ${avg}`;
}

// Save chat message to local storage
function saveChatMessage(sellerId, message) {
  const chatMessages = JSON.parse(localStorage.getItem(`chat_${sellerId}`)) || [];
  chatMessages.push(message);
  localStorage.setItem(`chat_${sellerId}`, JSON.stringify(chatMessages));
}

// Load chat messages from local storage and display them
function loadChatMessages(sellerId) {
  const chatMessages = JSON.parse(localStorage.getItem(`chat_${sellerId}`)) || [];
  chatMessages.forEach(message => appendMessageToChat(message));
}

// Append message to chat section
function appendMessageToChat(message) {
  const chatMessages = document.getElementById('chatMessages');
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message';
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}




