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
    document.querySelector('.showJoke').textContent = joke.value; // .value important. otherwhise output: [object object]
  } catch (error) {
    console.error('Error:', error); // Handle the error
  }
}

document.querySelector('.chuck').addEventListener('click', handleButtonClick);

////////////////////////

async function fetchAndDisplayImages() {
  try {
    // Step 1: Fetch the JSON data from "pics.json"
    const response = await fetch('pics.json');
    if (!response.ok) {
      throw new Error('Failed to fetch pics.json');
    }
    const data = await response.json(); // Parse the JSON data

    // Step 2: Parse the JSON data to extract the image URLs
    const imageUrls = data.map(item => item.url);

    // Step 3: Display images on the webpage
    const imageContainer = document.querySelector('.showKissa');
    imageContainer.innerHTML = ''; // Clear previous images
    imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Cat Image'; // Set alt attribute for accessibility
      imageContainer.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching and displaying images:', error);
  }
}

// Attach event listener to a button for triggering the fetchAndDisplayImages function
const button = document.querySelector('.fetch-button');
button.addEventListener('click', fetchAndDisplayImages);


    


//////////////////////////////////

document.addEventListener('DOMContentLoaded', function() { // DOMContentLoaded is an event that is fired when the initial HTML document has been completely loaded and parsed
  // DOM is fully loaded
  // You can start writing your JavaScript logic here
  console.log('DOM fully loaded');
});