function moveCards() {
    var cards = document.querySelectorAll('.card');

    for (var i = 0; i < cards.length; i++) {
      cards[i].style.transform = 'translateY(-600%)';
      cards[i].style.opacity = 0;
    }
  

  setTimeout(function() {
    document.getElementById("paper").style.display = 'block';
    document.getElementById('backButton').style.display = 'block';
  }, 1000);
}

function showCards() {
    var cards = document.querySelectorAll('.card');
  
    for (var i = 0; i < cards.length; i++) {
      cards[i].style.transform = '';
      cards[i].style.opacity = 1;
    }
  
    // Hide the image and "Back" button
    document.getElementById('paper').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
  
}

