// Get references to the cart items list and total
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total p');

// Initialize cart items and total
let cartItems = [];
let total = 0;

// Function to add an item to the cart
function addToCart(product) {
  cartItems.push(product);
  total += product.price;
  saveCartToLocalStorage();
  renderCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  const itemToRemove = cartItems[index];
  cartItems.splice(index, 1);
  total -= itemToRemove.price;
  saveCartToLocalStorage();
  renderCart();
}

// Function to render the cart
function renderCart() {
  // Clear the cart items list
  cartItemsList.innerHTML = '';

  // Loop through the cart items and create HTML elements
  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement('li');
    cartItemElement.classList.add('cart-item');

    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    imageElement.alt = item.name;

    const detailsElement = document.createElement('div');
    detailsElement.classList.add('item-details');

    const nameElement = document.createElement('h3');
    nameElement.textContent = item.name;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: $${item.price}`;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = 1;
    quantityInput.min = 1;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });

    detailsElement.appendChild(nameElement);
    detailsElement.appendChild(priceElement);
    detailsElement.appendChild(quantityInput);
    detailsElement.appendChild(removeButton);

    cartItemElement.appendChild(imageElement);
    cartItemElement.appendChild(detailsElement);

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

// Function to load the cart data from local storage
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