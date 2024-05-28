// Get references to the cart items list and total
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total p');

// Function to add an item to the cart
function addToCart(product) {
    cartItems.push(product);
    total += product.price;
    saveCartToLocalStorage();
    renderCart();
  }
  
  // Function to render the cart
  function renderCart() {
    // Clear the cart items list
    cartItemsList.innerHTML = '';
  
    // Loop through the cart items and create HTML elements
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('li');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <input type="number" value="1" min="1">
          <button>Remove</button>
        </div>
      `;
      cartItemsList.appendChild(cartItemElement);
    });
  
    // Update the total
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Function to save the cart data to local storage
  function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('total', total);
  }
  
  function loadCartFromLocalStorage() {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedTotal = parseFloat(localStorage.getItem('total')) || 0;
  
    cartItems = storedCartItems.map(item => {
      return {
        name: item.name,
        price: item.price,
        image: item.image
      };
    });
  
    total = storedTotal;
  }
  
// Load the cart data from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    renderCart();
  
    // Get references to the product items
    const productItems = document.querySelectorAll('.product');
  
    // Add event listeners to the "Add to Cart" buttons
    productItems.forEach(product => {
      const button = product.querySelector('button');
      button.addEventListener('click', () => {
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.querySelector('p').textContent.replace('$', ''));
        const image = product.querySelector('img').src;
        addToCart({ name, price, image });
      });
    });
  });

  // Load the cart data from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromLocalStorage();
  renderCart();

  // Get references to the product items
  const productItems = document.querySelectorAll('.product');

  // Add event listeners to the "Add to Cart" buttons
  productItems.forEach(product => {
      const button = product.querySelector('button');
      button.addEventListener('click', () => {
          const name = product.querySelector('h3').textContent;
          const price = parseFloat(product.querySelector('p').textContent.replace('$', ''));
          const image = product.querySelector('img').src;
          addToCart({ name, price, image });
      });
  });

  // Add event listener to the search form
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
          e.preventDefault();
          search();
      });
  }
});

// Search function to redirect to search-results.html with the query string
function search() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  // Redirect to search results page with query string
  window.location.href = `search-results.html?q=${encodeURIComponent(searchInput)}`;
}