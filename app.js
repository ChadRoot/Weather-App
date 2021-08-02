// Start OpenWeather API Update //
let weather = {
  apiKey: "cfb987ff7db0c82a42e58895cc0ceb2d",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
      + city
      + "&units=metric&appid="
      + this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".weather-icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = (Math.round(temp)) + "°C";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " + (Math.round(speed)) + "km/hr";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Los Angeles");





// End OpenWeather API Update //



// ** //
// Depreciated DarkSky API JS
// ** //

// window.addEventListener("load", () => {
//   let long;
//   let lat;
//   let tempDescription = document.querySelector(".temp-description");
//   let tempDegree = document.querySelector(".temp-degree");
//   let locationTimezone = document.querySelector(".location-timezone");
//   let locationTime = document.querySelector(".date")
//   let tempSection = document.querySelector(".temp");
//   const tempSpan = document.querySelector(".temp span");
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     long = position.coords.longitude;
  //     lat = position.coords.latitude;

      // const proxy = 'https://cors-anywhere.herokuapp.com/'
      // const api = `${proxy}https://api.darksky.net/forecast/e5e484579310fa7a649e56e31a062395/${lat},${long}`;

//       fetch(api)
//         .then(response => {
//           return response.json();
//       })
//         .then(data => {
//         const {temperature, time, summary, icon} = data.currently;
//         console.log(data);
//         // Set DOM elements from API
//         tempDegree.textContent = Math.round(temperature);
//         tempDescription.textContent = summary;
//         locationTimezone.textContent = data.timezone;

//         // Set Icon
//         setIcons(icon, document.querySelector(".icon"));

//         // Set Temp Conversion
//         let celsius = (temperature - 32) * (5/9);
//         // Change Temp C - F
//         tempSection.addEventListener('click', () => {
//           if(tempSpan.textContent === "F"){
//             tempSpan.textContent = "C";
//             tempDegree.textContent = Math.round(celsius);
//           } else {
//             tempSpan.textContent = "F";
//             tempDegree.textContent = Math.round(temperature);
//           }
//         });

//         // Set Time
//         locationTime.textContent = moment().format("dddd MMMM Do"); // need to convert from timestamp
 
//       });
//     });
//   }

//   function setIcons(icon, iconID) {
//     const skycons = new Skycons ({color: "white"});
//     const currentIcon = icon.replace(/-/g, "_").toUpperCase();
//     skycons.play();
//     return skycons.set(iconID, Skycons[currentIcon]);
//   }