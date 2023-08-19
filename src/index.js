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

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let units = "metric";
  let apiDomain = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiDomain}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(receiveTemp);
}
searchCity("Washington D.C.");

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", submitCity);

function showCurrentCity() {
  document.querySelector("#city-input").innerHTML = `Searching...`;
}

let clickCurrentCity = document.querySelector("#current-city-button");
clickCurrentCity.addEventListener("click", showCurrentCity);

//temp change
function showFahrTemp(event) {
  event.preventDefault();
  let formatFahr = document.querySelector("#current-temp");
  CelTemp.classList.remove("active");
  FahrTemp.classList.add("active");
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  formatFahr.innerHTML = `${fahrenheitTemp}`;
}
let FahrTemp = document.querySelector("#fahrenheit");
FahrTemp.addEventListener("click", showFahrTemp);

function showCelTemp(event) {
  event.preventDefault();
  let formatCel = document.querySelector("#current-temp");
  CelTemp.classList.add("active");
  FahrTemp.classList.remove("active");
  formatCel.innerHTML = Math.round(celsiusTemperature);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="card col-md-2 mx-auto shadow">
          <header class="forecast-date">${formatDay(forecastDay.dt)}</header>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="forecast-temperature">
            <span class="forecast-temp-high">${Math.round(
              forecastDay.temp.max
            )}° /</span>
            <span class="forecast-temp-low">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
          <div class="forecast-description">${forecastDay.weather[0].main}</div>
        </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function receiveTemp(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city-input").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
let celsiusTemperature = null;

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(receivePosition);
}
document
  .querySelector("#current-city-button")
  .addEventListener("click", getPosition);
