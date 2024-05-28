document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q').toLowerCase();
    const searchResultsList = document.getElementById('searchResultsList');
  
    // Example data
    const items = [
      {
        name: 'Book',
        link: 'item-page.html?itemId=1',
        description: 'A fascinating book on programming.'
      },
      {
        name: 'Tablet',
        link: 'item-page.html?itemId=2',
        description: 'A high-performance tablet for everyday use.'
      },
      // Add more items as needed
    ];
  
    const sellers = [
      {
        name: 'Seller 1',
        link: 'seller-profile.html?sellerId=seller1',
        description: 'Seller 1 specializes in books and educational materials.'
      },
      {
        name: 'Seller 2',
        link: 'sellers.html?sellerId=seller2',
        description: 'Seller 2 offers a variety of electronics and gadgets.'
      },
      // Add more sellers as needed
    ];
  
    const searchResults = [...items, ...sellers].filter(item =>
      item.name.toLowerCase().includes(query)
    );
  
    if (searchResults.length > 0) {
      searchResults.forEach(result => {
        const li = document.createElement('li');
        li.classList.add('search-result-item');
        li.innerHTML = `
          <div class="result-box">
            <a href="${result.link}">${result.name}</a>
            <p>${result.description}</p>
          </div>
        `;
        searchResultsList.appendChild(li);
      });
    } else {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.classList.add('no-results');
        noResultsMessage.textContent = 'No results found';
        searchResultsList.appendChild(noResultsMessage);
    }
  });
  