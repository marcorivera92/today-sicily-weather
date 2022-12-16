/* ------ DOM ELEMENTS ------ */
const cardsWrapper = document.querySelector(".city_cards");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const btnSearch = document.querySelector(".btn_search");

//ARRAY
let sicilianCities = [
  "Agrigento",
  "Caltanissetta",
  "Catania",
  "Enna",
  "Messina",
  "Palermo",
  "Ragusa",
  "Siracusa",
  "Trapani",
];

/* ------ FETCH API------ */

/* const allCitiesWeather = () => {
  cardsWrapper.innerHTML = "";
  const apiKey = "f64789bc2ca57c43cbd4b17a82227510";

  sicilianCities.map((i) =>
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${i}&APPID=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => weatherCard(data))
  );
}; */

const singleCityWeather = (cityName) => {
  cardsWrapper.innerHTML = "";
  const apiKey = "f64789bc2ca57c43cbd4b17a82227510";
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => weatherCard(data));
};

// SEARCHBAR
function searchCard(city) {
  if (sicilianCities.includes(city)) {
    singleCityWeather(city);
  } else {
    cardsWrapper.textContent =
      "This city either couldn't be found in Sicily or it doesn't exist!";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let str1 = input.value.charAt(0).toUpperCase();
  let str2 = input.value.slice(1);
  searchCard(str1 + str2);
});

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  let str1 = input.value.charAt(0).toUpperCase();
  let str2 = input.value.slice(1);
  searchCard(str1 + str2);
});

// DISABLE BUTTON if input has less than 3 characters
input.addEventListener("input", function () {
  if (input.value.length <= 3) {
    btnSearch.classList.remove("active");
    btnSearch.disabled = "disabled";
  } else {
    btnSearch.classList.add("active");
    btnSearch.disabled = "";
  }
});

/* ------ WEATHER CARD ------ */
const weatherCard = (data) => {
  const cardElm = document.createElement("div");
  cardElm.className = "card";

  const cardIcon = document.createElement("img");
  cardIcon.className = "card_icon";

  const cardTitle = document.createElement("div");
  cardTitle.className = "card_title";

  const cityName = document.createElement("h3");
  cityName.className = "city_name";

  const cardDescription = document.createElement("div");
  cardDescription.className = "card_description";

  const cardForecast = document.createElement("h6");

  const cardInfo = document.createElement("div");
  cardInfo.className = "card_info";

  const cityDegree = document.createElement("p");
  cityDegree.className = "city_degree";

  const tempRange = document.createElement("div");
  tempRange.className = "city_temprange";

  const minTemperature = document.createElement("p");
  minTemperature.className = "min_temperature";

  const maxTemperature = document.createElement("p");
  maxTemperature.className = "max_temperature";

  // DOM VALUES
  let image_url = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  cardIcon.setAttribute("src", image_url);
  cityName.textContent = data.name;
  cityDegree.textContent = Math.floor(data.main.temp) + "°";
  cardForecast.textContent = data.weather[0].description;
  minTemperature.textContent = "L: " + Math.floor(data.main.temp_min) + "°";
  maxTemperature.textContent = "H: " + Math.floor(data.main.temp_max) + "°";

  // APPEND
  cardTitle.append(cityName, cityDegree);
  tempRange.append(maxTemperature, minTemperature);
  cardDescription.append(cardIcon, cardForecast);
  cardInfo.append(cardDescription, tempRange);
  cardElm.append(cardTitle, cardInfo);
  cardsWrapper.append(cardElm);

  // BACKGROUND CHANGE
  const weatherMain = data.weather[0].main;
  switch (weatherMain) {
    case "Clouds":
      cardElm.style = `background-image:url("./_images/clouds.jpg")`;
      break;
    case "Drizzle":
      cardElm.style = `background-image:url("./_images/rain.jpg")`;
      break;
    case "Rain":
      cardElm.style = `background-image:url("./_images/rain.jpg")`;
      break;
    case "Snow":
      cardElm.style = `background-image:url("./_images/snow.jpg")`;
      break;
    case "Thunderstorm":
      cardElm.style = `background-image:url("./_images/thunderstorm.webp")`;
      break;
    case "Mist":
      cardElm.style = `background-image:url("./_images/mist.jpg")`;
      break;
    case "Smoke":
      cardElm.style = `background-image:url("./_images/mist.jpg")`;
      break;
    case "Haze":
      cardElm.style = `background-image:url("./_images/mist.jpg")`;
      break;
    case "Dust":
      cardElm.style = `background-image:url("./_images/mist.jpg")`;
      break;
    case "Fog":
      cardElm.style = `background-image:url("./_images/mist.jpg")`;
      break;
    case "Ash":
      cardElm.style = `background-image:url("./_images/mist.jpg")`;
      break;
    case "Sand":
      cardElm.style = `background-image:url("./_images/sand.jpg")`;
      break;
    case "Squall":
      cardElm.style = `background-image:url("./_images/squall.jpg")`;
      break;
    case "Tornado":
      cardElm.style = `background-image:url("./_images/tornado.jpg")`;
      break;
    case "Clear":
      cardElm.style = `background-image:url("./_images/clear.webp")`;
      break;
  }
};

/* ------ FUNCTIONS  ------ */
