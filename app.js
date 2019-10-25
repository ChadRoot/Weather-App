window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationTime = document.querySelector(".current-time");
  let weatherIcon = document.querySelector(".weather-icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/e5e484579310fa7a649e56e31a062395/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
      })
        .then(data => {
          const {temperature, time, summary, icon} = data.currently;
          console.log(data);
          // Set DOM elements from API
          tempDegree.textContent = Math.round(temperature);
          tempDescription.textContent = summary;
          weatherIcon.textContent = icon;
          
          locationTime.textContent = time; // need to convert from timestamp

          const {timezone} = data;
          locationTimezone.textContent = timezone;
      });
    });
  }
});