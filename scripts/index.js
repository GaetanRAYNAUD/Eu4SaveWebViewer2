window.onload = function () {
    let mapRef = document.getElementById("mapRef");
    let mapImg = document.getElementById("mapImg");

    /*mapRef.href = './images/sessions/session' + data.nbSessions + '.jpg';
    mapImg.src = './images/sessions/session' + data.nbSessions + '.jpg';*/
};

let addCoutries = function () {
    let countries = document.getElementById("countries");
    let country = document.getElementById("country");
    let currCountry;

    document.getElementById("title").innerText = data.title;

    for(const [i] of data.players.entries()) {
        countries.appendChild(country.cloneNode(true));

        currCountry = countries.lastChild;
        currCountry.id = 'country' + i;

        fillCountry(currCountry, i);
    }

    countries.removeChild(countries.firstChild);
    countries.removeChild(countries.firstChild);
};