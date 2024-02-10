import './style.css'

async function getVitsi() {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const vitsi = await response.json();
    console.log(vitsi);
    return vitsi;
  } catch (error) {
    console.error('Virhe:', error);
    throw error;
  }
}

function showVitsi(vitsi) {
  const vitsiContainer = document.querySelector('.show_joke');
  vitsiContainer.textContent = vitsi.value;
}

function handleButtonClick() {
  getVitsi()
    .then(vitsi => { showVitsi(vitsi);})
    .catch (error => { console.error('virhe', error)});
}

document.querySelector('.chuck').addEventListener('click', handleButtonClick);



document.addEventListener('DOMContentLoaded', function() { // DOMContentLoaded is an event that is fired when the initial HTML document has been completely loaded and parsed
  // DOM is fully loaded
  // You can start writing your JavaScript logic here
  console.log('DOM fully loaded');
});