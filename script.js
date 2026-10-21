/* ========================================================
   QuoteCraft – Simple & Beginner-Friendly JavaScript
   Using basic variables, arrays, if/else, and DOM methods.
   ======================================================== */

// ==========================================
// 1. QUOTE DATA (Stored in a simple Array)
// ==========================================
var quotes = [
  // --- Love Quotes ---
  {
    text: "In all the world, there is no heart for me like yours.",
    author: "Maya Angelou",
    category: "Love"
  },
  {
    text: "I love you not only for what you are, but for what I am when I am with you.",
    author: "Roy Croft",
    category: "Love"
  },
  {
    text: "Whatever our souls are made of, his and mine are the same.",
    author: "Emily Brontë",
    category: "Love"
  },

  // --- Friendship Quotes ---
  {
    text: "A real friend is one who walks in when the rest of the world walks out.",
    author: "Walter Winchell",
    category: "Friendship"
  },
  {
    text: "True friendship comes when the silence between two people is comfortable.",
    author: "David Tyson",
    category: "Friendship"
  },
  {
    text: "Good friends are like stars; you don't always see them, but you know they're always there.",
    author: "Anonymous",
    category: "Friendship"
  },

  // --- Motivation Quotes ---
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Motivation"
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "Motivation"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Motivation"
  },

  // --- Sad Quotes ---
  {
    text: "Tears come from the heart and not from the brain.",
    author: "Leonardo da Vinci",
    category: "Sad Quotes"
  },
  {
    text: "Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water.",
    author: "Christopher Morley",
    category: "Sad Quotes"
  },
  {
    text: "Silence is often the loudest cry of pain.",
    author: "Anonymous",
    category: "Sad Quotes"
  },

  // --- Attitude Quotes ---
  {
    text: "I am not what happened to me, I am what I choose to become.",
    author: "Carl Jung",
    category: "Attitude"
  },
  {
    text: "Excellence is not an act, but a habit.",
    author: "Aristotle",
    category: "Attitude"
  },
  {
    text: "Don't show me your attitude, you won't be able to handle mine.",
    author: "Anonymous",
    category: "Attitude"
  },

  // --- Life Quotes ---
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life Quotes"
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: "Life Quotes"
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Life Quotes"
  },

  // --- Funny Quotes ---
  {
    text: "I'm not lazy, I'm just on energy saving mode.",
    author: "Anonymous",
    category: "Funny Quotes"
  },
  {
    text: "Life is short. Smile while you still have teeth.",
    author: "Mallory Hopkins",
    category: "Funny Quotes"
  },
  {
    text: "My bed is a magical place where I suddenly remember everything I forgot to do.",
    author: "Anonymous",
    category: "Funny Quotes"
  }
];

// ==========================================
// 2. STATE VARIABLES
// ==========================================
// Tracks currently selected category ("All" by default)
var currentCategory = "All";

// An array to store the filtered list of quotes
var activeQuotes = [];

// Index of the current quote being displayed
var currentIndex = 0;


// ==========================================
// 3. INITIALIZATION FUNCTION
// ==========================================
// This function runs automatically when the page loads
function init() {
  // At first, all quotes are active
  activeQuotes = quotes;
  // Display the first quote
  displayCurrentQuote();
}

// Call init once the script is parsed
init();


// ==========================================
// 4. FUNCTION TO DISPLAY THE CURRENT QUOTE
// ==========================================
function displayCurrentQuote() {
  // Check if we have quotes in activeQuotes
  if (activeQuotes.length === 0) {
    return;
  }

  // Get the quote object from the active list
  var selectedQuote = activeQuotes[currentIndex];

  // Update HTML elements using document.getElementById() and innerText
  document.getElementById("quoteText").innerText = selectedQuote.text;
  document.getElementById("quoteAuthor").innerText = selectedQuote.author;
  document.getElementById("quoteCategoryBadge").innerText = selectedQuote.category;
}


// ==========================================
// 5. NEXT QUOTE BUTTON FUNCTION
// ==========================================
function nextQuote() {
  // Move to the next index
  currentIndex = currentIndex + 1;

  // If we reach the end of the array, loop back to the beginning (0)
  if (currentIndex >= activeQuotes.length) {
    currentIndex = 0;
  }

  // Show the updated quote
  displayCurrentQuote();
}


// ==========================================
// 6. RANDOM QUOTE FUNCTION
// ==========================================
function randomQuote() {
  // Generate a random index between 0 and activeQuotes.length - 1
  var randomIndex = Math.floor(Math.random() * activeQuotes.length);

  // Set current index to the random number
  currentIndex = randomIndex;

  // Show the quote
  displayCurrentQuote();
}


// ==========================================
// 7. CATEGORY FILTER FUNCTION
// ==========================================
function selectCategory(categoryName, clickedButton) {
  currentCategory = categoryName;

  // Simple loop to filter quotes matching the chosen category
  if (categoryName === "All") {
    activeQuotes = quotes;
  } else {
    // Create an empty array to collect matching quotes
    var filtered = [];
    for (var i = 0; i < quotes.length; i++) {
      if (quotes[i].category === categoryName) {
        filtered.push(quotes[i]);
      }
    }
    activeQuotes = filtered;
  }

  // Reset index to the first quote in the new category
  currentIndex = 0;
  displayCurrentQuote();

  // Update button active style
  // 1. Remove 'active' class from all category buttons
  var buttons = document.getElementsByClassName("cat-btn");
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].className = "cat-btn";
  }

  // 2. Add 'active' class to the clicked button
  if (clickedButton) {
    clickedButton.className = "cat-btn active";
  }

  // Smoothly scroll up to the quotes section so user sees the change
  scrollToSection("quotes");
}


// ==========================================
// 8. COPY QUOTE TO CLIPBOARD FUNCTION
// ==========================================
function copyQuote() {
  var quoteText = document.getElementById("quoteText").innerText;
  var quoteAuthor = document.getElementById("quoteAuthor").innerText;

  // Combine quote and author into a single message
  var fullTextToCopy = '"' + quoteText + '" — ' + quoteAuthor;

  // Copy to clipboard using navigator.clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullTextToCopy);
  } else {
    // Fallback for older browsers
    var tempInput = document.createElement("textarea");
    tempInput.value = fullTextToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  // Show the copy alert message
  var alertBox = document.getElementById("copyAlert");
  alertBox.style.display = "block";

  // Hide the alert message after 2.5 seconds (2500ms)
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 2500);
}


// ==========================================
// 9. CUSTOM STATUS GENERATOR FUNCTIONS
// ==========================================

// Triggered when user types in the textarea (oninput)
function updateCustomStatus() {
  var userInput = document.getElementById("customInput").value;
  var previewText = document.getElementById("customPreviewText");

  // If input is empty, show default placeholder text
  if (userInput.trim() === "") {
    previewText.innerText = "Your beautiful status preview will appear here in real time as you type...";
  } else {
    previewText.innerText = userInput;
  }
}

// Change the background color of the preview card
function changeCustomBg(newBg) {
  var previewCard = document.getElementById("customCardPreview");
  previewCard.style.background = newBg;
}

// Change text color of the preview card
function changeCustomTextColor(newColor) {
  var previewCard = document.getElementById("customCardPreview");
  previewCard.style.color = newColor;
}

// Copy the custom status text
function copyCustomStatus() {
  var textToCopy = document.getElementById("customPreviewText").innerText;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy);
  } else {
    var tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  // Show custom status copy notification
  var alertBox = document.getElementById("customCopyAlert");
  alertBox.style.display = "block";

  // Hide notification after 2.5 seconds
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 2500);
}

// Reset Customizer to default styles
function resetCustomizer() {
  document.getElementById("customInput").value = "";
  document.getElementById("customPreviewText").innerText =
    "Your beautiful status preview will appear here in real time as you type...";

  var previewCard = document.getElementById("customCardPreview");
  // Default purple-pink gradient
  previewCard.style.background = "linear-gradient(135deg, #6b21a8, #ec4899)";
  previewCard.style.color = "#ffffff";
}


// ==========================================
// 10. HELPER FUNCTION: SMOOTH SCROLL
// ==========================================
function scrollToSection(sectionId) {
  var targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}
