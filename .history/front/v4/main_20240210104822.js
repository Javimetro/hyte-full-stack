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

async function giveMeCats() {
  try {  
    const response = await fetch ('pics.json');
    if (!response.ok) {
      throw new Error ('was not possible to fetch pics.json');
    }
    const data = await response.json();

    const urlArray = data.map(item => item.url); // .map goes throgh the array and .url identify and extrach the ob
    
    const imageContainer = document.querySelector('.showKissa');
    imageContainer.innerHTML = ''; // Clear previous images
    const randomKissaSrc= math.floor*(math.randon*urlArray);
    const kissaImg = document.createElement('img');
    kissaImg.src = randomKissaSrc;
    kissaImg.alt = 'random kissa kuva'
    imageContainer.appendChild(kissaImg);

  } catch (error) {
    console.error('Error fetching and displaying images:', error);
  }
}

// Attach event listener to a button for triggering the fetchAndDisplayImages function
const button = document.querySelector('.kissa');
button.addEventListener('click', giveMeCats);


    


//////////////////////////////////

document.addEventListener('DOMContentLoaded', function() { // DOMContentLoaded is an event that is fired when the initial HTML document has been completely loaded and parsed
  // DOM is fully loaded
  // You can start writing your JavaScript logic here
  console.log('DOM fully loaded');
});