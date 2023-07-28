function formatDate() {
  let now = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = months[now.getMonth()];
  let weekDay = days[now.getDay()];
  let day = now.getDate();

  return `${weekDay}, ${month} ${day}`;
}
function formatTime() {
  let now = new Date();
  let am_pm = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${am_pm}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(currentDate);

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(currentTime);

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#enter-city-form");
  let changeCity = document.querySelector("#city-input");
  changeCity.innerHTML = searchCity.value;

  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let units = "metric";
  let apiDomain = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiDomain}?q=${searchCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(receiveTemp);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", search);

function showCurrentCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input");
  currentCity.innerHTML = `Searching...`;
}

let clickCurrentCity = document.querySelector("#current-city-button");
clickCurrentCity.addEventListener("click", showCurrentCity);

//temp change
function showFahrTemp(event) {
  event.preventDefault();
  let formatFahr = document.querySelector("#current-temp");
  let fahrenheitTemp = Math.round((32 * 9) / 5 + 32);
  formatFahr.innerHTML = `${fahrenheitTemp}`;
}
let FahrTemp = document.querySelector("#fahrenheit");
FahrTemp.addEventListener("click", showFahrTemp);

function showCelTemp(event) {
  event.preventDefault();
  let formatCel = document.querySelector("#current-temp");
  let celsiusTemp = Math.round(((89 - 32) * 5) / 9);
  formatCel.innerHTML = `${celsiusTemp}`;
}
let CelTemp = document.querySelector("#celsius");
CelTemp.addEventListener("click", showCelTemp);

//API

function receivePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let units = "metric";
  let apiDomain = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiDomain}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(receiveTemp);
}
function receiveTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentHeading = document.querySelector("#current-temp");
  currentHeading.innerHTML = temperature;
  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("#precip").innerHTML = response.data.main.humidity;
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#feel-temp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(receivePosition);
}
document
  .querySelector("#current-city-button")
  .addEventListener("click", getPosition);
