//state
let currCity = "Toronto";
let units = "metric";

// selectors
let city = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_datetime");
let weather_forecast = document.querySelector(".weather_forecast");
let weather_icon = document.querySelector(".weather_icon");
let weather_temperature = document.querySelector(".weather_temperature");
let weather_minmax = document.querySelector(".weather_minmax");
let weather_realfeel = document.querySelector(".weather_realfeel");
let weather_humidity = document.querySelector(".weather_humidity");
let weather_wind = document.querySelector(".weather_wind");
let weather_pressure = document.querySelector(".weather_pressure");

//search
let weather_search = document.querySelector(".weather_search");
weather_search.addEventListener("keyup", (e) => {
  //prevent default action
  e.preventDefault();
  //change current city
  currCity = e.target.value;
  //get weather forcast
  getWeather();
  //clear search value
  search.value = "";
});

//units
document
  .querySelector(".weather_unit_celsius")
  .addEventListener("click", () => {
    units = "metric";
    getWeather();
  });

document
  .querySelector(".weather_unit_fahrenheit")
  .addEventListener("click", () => {
    units = "imperial";
    getWeather();
  });

function convertTimeStamp(timestamp, timezone) {
  const convertTimeZone = timezone / 3600; //convert to hours
  const date = new Date(timestamp * 1000);

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timezone: `ETC/GMT/${convertTimeZone >= 0 ? "-" : "+"}${convertTimeZone}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}
//conevrt country code to name
function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
}
function getWeather() {
  const API_KEY = `919a77eb7a899a7bf7c554d5dbdcf16b`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`
  )
    .then((res) => res.json())
    .then((data) => {
      let unitIcon = units == "metric" ? "°C" : "°F";
      let unitSpeed = units == "metric" ? "m/s" : "mph";

      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weather_forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
      weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather icon">`;
      weather_temperature.innerHTML = `${data.main.temp.toFixed()} ${unitIcon}`;
      weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()} ${unitIcon}</p>
       <p>Max: ${data.main.temp_max.toFixed()} ${unitIcon}</p>`;
      weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()} ${unitIcon}`;
      weather_humidity.innerHTML = `${data.main.humidity}%`;
      weather_wind.innerHTML = `${data.wind.speed} ${unitSpeed}`;
      weather_pressure.innerHTML = `${data.main.pressure}hPa`;
    });
}
// .catch(error => {
//     console.log(error)
// })

document.body.addEventListener("load", getWeather());

// $(document).ready(function () {
//   $("#sidebarCollapse").on("click", function () {
//     $("#sidebar").toggleClass("active");
//     $(this).toggleClass("active");
//   });
// });
