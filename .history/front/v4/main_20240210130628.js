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
    imageContainer.id = 'kissaContainer';
    imageContainer.innerHTML = ''; // Clear previous images

    urlArray.forEach(item => {
      const kissaImg = document.createElement('img');
      kissaImg.src = item;
      kissaImg.alt = 'kissa kuva';
      imageContainer.appendChild(kissaImg)
    })

  } catch (error) {
    console.error('Error fetching and displaying images:', error);
  }
}

// Attach event listener to a button for triggering the fetchAndDisplayImages function
const button = document.querySelector('.kissa');
button.addEventListener('click', giveMeCats);


//////////////////////////////////

async function createDiaryCards() {
  try {
    // Fetch the diary entries JSON file
    const response = await fetch('diary.json');
    if (!response.ok) {
      throw new Error('Failed to fetch diary entries');
    }
    const data = await response.json();
    const diaryEntries = data.diaryEntries;

    // Select the card area container
    const cardArea = document.querySelector('.card-area');

    // Loop through each diary entry
    diaryEntries.forEach((entry, index) => {
      // Create card container
      const card = document.createElement('div');
      card.classList.add('card');

      // Create image container
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('card-img');
      const img = document.createElement('img');
      img.src = 'images/strong.png'; // Assuming the same image for all entries
      img.width = 136;
      img.alt = 'HippoGym';
      imgContainer.appendChild(img);

      // Create diary content container
      const diaryContainer = document.createElement('div');
      diaryContainer.classList.add('card-diary');
      const title = document.createElement('h4');
      title.textContent = `Diary card ${index + 1}`;
      const description = document.createElement('p');
      description.textContent = entry.description;

      // Append elements to the diary content container
      diaryContainer.appendChild(title);
      diaryContainer.appendChild(description);

      // Append image container and diary content container to the card container
      card.appendChild(imgContainer);
      card.appendChild(diaryContainer);

      // Append the card to the card area container
      cardArea.appendChild(card);
    });
  } catch (error) {
    console.error('Error creating diary cards:', error);
  }
}

// Call the function to create diary cards
createDiaryCards();

////////////////////////////////

document.addEventListener('DOMContentLoaded', function() { // DOMContentLoaded is an event that is fired when the initial HTML document has been completely loaded and parsed
  // DOM is fully loaded
  // You can start writing your JavaScript logic here
  console.log('DOM fully loaded');
});