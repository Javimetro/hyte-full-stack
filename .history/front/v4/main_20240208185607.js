import './style.css'

async function fetchJoke() { //async starts
  const response = await fetch('https://api.chucknorris.io/jokes/random');
  if (!response.ok) { // if vastaus ei ole 200-299 sitten on error
    throw new Error('Failed to fetch joke'); // throw lopeta koodin toiminta
  }
  return await response.json(); // Return the joke data
}

async function handleButtonClick() {
  try {
    const joke = await fetchJoke(); // Fetch the joke
    document.querySelector('.show_joke').textContent = joke; // Display the joke
  } catch (error) {
    console.error('Error:', error); // Handle the error
  }
}

document.querySelector('.chuck').addEventListener('click', handleButtonClick);




document.addEventListener('DOMContentLoaded', function() { // DOMContentLoaded is an event that is fired when the initial HTML document has been completely loaded and parsed
  // DOM is fully loaded
  // You can start writing your JavaScript logic here
  console.log('DOM fully loaded');
});