window.onload = function() {
    var target = document.getElementById('target');
    var lang = navigator.language || navigator.userLanguage;
    target.innerHTML += '<p>Selaimen kieli: ' + lang + '</p>';

    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    target.innerHTML += '<p>Näytön koko: ' + screenWidth + ' x ' + screenHeight + '</p>';


    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    target.innerHTML += '<p> Selaimen ikkunan koko: ' + windowWidth + ' x ' + windowHeight + '</p>';


    var date = new Date();
    var dateString = date.toLocaleDateString('fi-Fi', {day: 'numeric', month: 'long', year: 'numeric'});
    var timeString = date.toLocaleTimeString('fi-Fi', {hour: '2-digit', minute: '2-digit'});
    target.innerHTML += '<p>Tänään on ' + dateString + ' ja kello on ' + timeString + '</p>';
}