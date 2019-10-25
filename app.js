window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temp-description");
  let tempDegree = document.querySelector(".temp-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationTime = document.querySelector(".current-time");
  let tempSection = document.querySelector(".temp");
  const tempSpan = document.querySelector(".temp span");

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
        locationTime.textContent = time; // need to convert from timestamp
        locationTimezone.textContent = data.timezone;

        // Set Icon
        setIcons(icon, document.querySelector(".icon"));

        // Set Temp Conversion
        let celsius = (temperature - 32) * (5/9);
        // Change Temp C - F
        tempSection.addEventListener('click', () => {
          if(tempSpan.textContent === "F"){
            tempSpan.textContent = "C";
            tempDegree.textContent = Math.round(celsius);
          } else {
            tempSpan.textContent = "F";
            tempDegree.textContent = Math.round(temperature);
          }
        });
      });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons ({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});