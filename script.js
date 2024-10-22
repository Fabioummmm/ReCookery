    function openNav() {
    document.getElementById("mySidebar").style.width = "200px"; 
    document.getElementById("main").style.marginLeft = "200px"; 
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0"; 
    document.getElementById("main").style.marginLeft = "0"; 
}

function toggleDropdown(id) {
    // Close all dropdowns first
    const dropdowns = ['mainDishesDropdown', 'glutenfreedishesDropdown', 'bolomaçaDropdown'];
    dropdowns.forEach(drop => {
        if (drop !== id) {
            document.getElementById(drop).style.display = 'none';
        }
    });

    // Toggle the selected dropdown
    const dropdownContent = document.getElementById(id);
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}
function openNav() {
            document.getElementById("mySidebar").style.width = "200px"; 
            document.getElementById("main").style.marginLeft = "200px"; 
        }

        function closeNav() {
            document.getElementById("mySidebar").style.width = "0"; 
            document.getElementById("main").style.marginLeft = "0"; 
        }

        function toggleDropdown1() {
            var dropdownContent = document.getElementById("mainDishesDropdown");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }

        function toggleDropdown2() {
            var dropdownContent = document.getElementById("glutenfreedishesDropdown");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }

        function toggleDropdown3() {
            var dropdownContent = document.getElementById("bolomaçaDropdown");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }
        function toggleDropdown4() {
            var dropdownContent = document.getElementById("DrinksDropdown");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }
        function toggleDropdown5() {
            var dropdownContent = document.getElementById("CommentsDropdown");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }
        function toggleDropdown6() {
            var dropdownContent = document.getElementById("favoritesDropdown");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }
        function toggleDropdown8() {
            var dropdownContent = document.getElementById("contactDropdown");
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        }
        
        function toggleNav() {
    var sidebar = document.getElementById("mySidebar");
    var main = document.getElementById("main");
    
    if (sidebar.style.width === "200px") {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementById("main").classList.add("sidebar-open"); // Add class to adjust button position
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").classList.remove("sidebar-open"); // Remove class to revert button position
}
function toggleDropdown() {
            var dropdownMenu = document.getElementById("dropdownMenu");
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        }
        function toggleNav() {
    var sidebar = document.getElementById("mySidebar");
    var main = document.getElementById("main");
    
    if (sidebar.style.width === "200px") {
        closeNav();
    } else {
        openNav();
    }
}



/* Comments */


// Admin password for deleting comments
const adminPassword = 'ReCookery'; // Password for deleting comments

// Variable to store the selected star rating
let selectedRating = 1; // Default is 1 star
let comments = []; // Global variable to store all comments
let visibleComments = 3; // Number of comments visible by default

// Function to load comments from localStorage
function loadComments() {
    let commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    // Retrieve comments from localStorage
    comments = JSON.parse(localStorage.getItem('comments')) || [];

    // Display only the last `visibleComments` comments
    let displayComments = comments.slice(-visibleComments);

    displayComments.forEach((comment, index) => {
        let commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';

        let commentName = document.createElement('p');
        commentName.className = 'comment-name';
        commentName.innerText = comment.name;

        let commentText = document.createElement('p');
        commentText.className = 'comment-text';
        commentText.innerText = comment.text;

        let commentRating = document.createElement('span');
        commentRating.className = 'comment-rating';
        commentRating.innerHTML = 'Rating: ' + '★'.repeat(comment.rating);

        // Delete button (visible to all, but protected by a password prompt)
        let deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteComment(comments.length - 1 - index); // Adjusted index for correct deletion

        commentDiv.appendChild(commentName);
        commentDiv.appendChild(commentText);
        commentDiv.appendChild(commentRating);
        commentDiv.appendChild(deleteButton);

        commentsList.appendChild(commentDiv);
    });

    // Show or hide the "View More" button based on the number of comments
    document.getElementById('view-more-btn').style.display = comments.length > visibleComments ? 'block' : 'none';
}

// Function to handle star selection
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        // Set selectedRating based on the data-value of the clicked star
        selectedRating = this.getAttribute('data-value');
        highlightStars(selectedRating);
    });
});

// Function to highlight stars based on the selected rating
function highlightStars(rating) {
    // Light up stars from left to right
    document.querySelectorAll('.star').forEach(star => {
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('selected'); // Light up the star
        } else {
            star.classList.remove('selected'); // Turn off the star
        }
    });
}

// Function to submit a new comment
function submitComment() {
    let commentName = document.getElementById('comment-name').value;
    let commentText = document.getElementById('comment-text').value;

    // Check if name and comment text are not empty
    if (commentName === "" || commentText === "") {
        alert("Please enter your name and comment.");
        return;
    }

    // Add the new comment
    comments.push({
        name: commentName,
        text: commentText,
        rating: selectedRating // Store the selected rating (1 to 5)
    });

    // Save the comments back to localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // Clear the form
    document.getElementById('comment-name').value = "";
    document.getElementById('comment-text').value = "";
    selectedRating = 1; // Reset to default rating
    highlightStars(selectedRating); // Reset star highlighting

    // Reload comments to display the new one
    loadComments();
}

// Function to delete a comment with password protection
function deleteComment(index) {
    let password = prompt("Enter the admin password to delete this comment:");

    if (password === adminPassword) {
        // Remove the comment at the given index
        comments.splice(index, 1);

        // Save the updated comments back to localStorage
        localStorage.setItem('comments', JSON.stringify(comments));

        // Reload the comments
        loadComments();
    } else {
        alert("Incorrect password. You are not authorized to delete this comment.");
    }
}

// Function to show more comments when the button is clicked
function viewMoreComments() {
    visibleComments += 3; // Increase the number of visible comments
    loadComments(); // Reload comments to show more
}

// Load the comments when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComments();
    highlightStars(selectedRating); // Initialize with default rating
});





/*FAvorites*/

// Function to save recipes to favorites (localStorage)
function saveToFavorites(recipeTitle, recipeDescription, recipeImage, recipeDifficulty) {
    // Get existing favorites or initialize an empty array
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the recipe is already in the favorites
    const isAlreadyFavorite = favorites.some(recipe => recipe.title === recipeTitle);

    if (!isAlreadyFavorite) {
        // Add new recipe to favorites with title, description, image, and difficulty
        favorites.push({
            title: recipeTitle,
            description: recipeDescription,
            image: recipeImage,
            difficulty: recipeDifficulty
        });

        // Save updated favorites back to localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        alert(`${recipeTitle} has been added to your favorites!`);
    } else {
        alert(`${recipeTitle} is already in your favorites!`);
    }
}

// Function to show favorites in the favorites section
function showFavorites() {

    let favoritesSection = document.getElementById('favorites-section');
    let favoritesList = document.getElementById('favorites-list');

    // Clear the current list of favorites
    favoritesList.innerHTML = '';

    // Get favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite recipes yet!</p>';
    } else {
        // Generate HTML for each favorite recipe
        favorites.forEach((recipe, index) => {
            let recipeDiv = document.createElement('div');
            recipeDiv.className = 'favorite-item recipe-card'; // Use the same styling class as your recipe card

            // Create image element
            let image = document.createElement('img');
            image.src = recipe.image;
            image.alt = recipe.title;
            image.style.width = "100px"; // Ensure it's appropriately sized
            image.style.height = "auto";

            // Create title element
            let title = document.createElement('h2');
            title.innerText = recipe.title;

            // Create difficulty and rating (if applicable)
            let difficulty = document.createElement('div');
            difficulty.className = 'rating';
            difficulty.innerHTML = `${recipe.difficulty}`;

            // Create description element
            let description = document.createElement('p');
            description.innerText = recipe.description;

            // Create a button to remove the favorite recipe
            let removeBtn = document.createElement('button');
            removeBtn.innerText = 'Remove from Favorites';
            removeBtn.onclick = () => removeFromFavorites(index);

            // Append elements to the recipeDiv
            recipeDiv.appendChild(image);
            recipeDiv.appendChild(title);
            recipeDiv.appendChild(difficulty);
            recipeDiv.appendChild(description);
            recipeDiv.appendChild(removeBtn);

            favoritesList.appendChild(recipeDiv);
        });
    }

    // Show the favorites section
    favoritesSection.style.display = 'block';
    
}

// Function to remove a recipe from favorites
function removeFromFavorites(index) {
    // Get existing favorites
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Remove the selected favorite by index
    favorites.splice(index, 1);

    // Save the updated favorites back to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Reload the favorites section
    showFavorites();
}

/*Download PDF*/

  function downloadAsPDF() {
    window.print();
  }



  /*CURSOR EFFECT  */


  const canvas = document.getElementById('trailCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;
  let lastMouseMoveTime = 0;
  
  const trail = [];
  const trailLength = 20;
  const maxLineWidth = 3;  
  const lineColor = 'rgba(74, 101, 226, 0.8)';
  
  const mousePositions = [];
  const maxPositions = 100;
  
  ctx.shadowColor = 'rgba(74, 101, 226, 0.8)';
  ctx.shadowBlur = 10;
  
  function drawTrail() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
          const point = trail[i];
          const lineWidth = (i / trail.length) * maxLineWidth;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.strokeStyle = lineColor;
          if (i === 0) {
              ctx.moveTo(point.x, point.y);
          } else {
              ctx.lineTo(point.x, point.y);
          }
      }
      ctx.stroke();
  }
  
  function updateTrail() {
      const currentTime = new Date().getTime();
      if (isMouseMoving) {
          trail.push({ x: mouseX, y: mouseY });
          mousePositions.push({ x: mouseX, y: mouseY, timestamp: currentTime });
          if (mousePositions.length > maxPositions) {
              mousePositions.shift();
          }
          if (trail.length > trailLength) {
              trail.shift();
          }
          lastMouseMoveTime = currentTime;
      }
      if (currentTime - lastMouseMoveTime > 100) {
          trail.length = 0;
      }
      drawTrail();
  }
  
  window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
  });
  
  function animate() {
      updateTrail();
      requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });
  
  function sendData() {
      fetch('http://localhost:3000/track', { // Adjust endpoint as needed
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(mousePositions)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          console.log('Data sent successfully');
      })
      .catch(error => {
          console.error('Error sending data:', error);
      });
  }
  
  setInterval(sendData, 5000);
  
  const heatmapInstance = h337.create({
      container: document.querySelector('#heatmapContainer'),
      radius: 40,
      maxOpacity: 0.5,
      scaleRadius: true,
  });
  
  function updateHeatmap() {
      const points = mousePositions.map(pos => ({
          x: pos.x,
          y: pos.y,
          value: 1,
      }));
      
      heatmapInstance.setData({
          max: 10,
          data: points,
      });
  }
  
  setInterval(updateHeatmap, 5000);
  
  

