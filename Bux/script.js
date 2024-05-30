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

//Products
document.addEventListener('DOMContentLoaded', () => {
  const books = [
    { title: "Book 1", img: "book1.jpg", price: 10.99, seller: "Seller 1", sellerLink: "sellers.html?sellerId=seller1" },
    { title: "Book 2", img: "book2.jpg", price: 12.99 },
    { title: "Book 3", img: "book3.jpg", price: 15.99 }
  ];
  const tech = [
    { title: "Tech 1", img: "tech1.jpg", price: 299.99 },
    { title: "Tech 2", img: "tech2.jpg", price: 399.99 },
    { title: "Tech 3", img: "tech3.jpg", price: 499.99 }
  ];
  const clothing = [
    { title: "Clothing 1", img: "clothing1.jpg", price: 25.99 },
    { title: "Clothing 2", img: "clothing2.jpg", price: 35.99 },
    { title: "Clothing 3", img: "clothing3.jpg", price: 45.99 }
  ];
  const accessories = [
    { title: "Accessory 1", img: "accessory1.jpg", price: 5.99 },
    { title: "Accessory 2", img: "accessory2.jpg", price: 7.99 },
    { title: "Accessory 3", img: "accessory3.jpg", price: 9.99 }
  ];

  function populateCategory(category, items) {
    const categoryList = document.querySelector(`#${category} .product-list`);
    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'product';
      li.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>$${item.price.toFixed(2)}</p>
        ${item.seller ? `<p>Seller: <a href="${item.sellerLink}">${item.seller}</a></p>` : ''}
        <button>Add to Cart</button>
      `;
      categoryList.appendChild(li);

      li.querySelector('button').addEventListener('click', () => {
        addToCart(item);
      });
    });
  }

  populateCategory('books', books);
  populateCategory('tech', tech);
  populateCategory('clothing', clothing);
  populateCategory('accessories', accessories);
});

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${item.title} has been added to the cart.`);
}

document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
  }
});
