const apiURL="https://api.openweathermap.org/data/2.5/weather?id=5294810&APPID=9b126e46803265f6948561627ab0b85b&units=imperial";
fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.getElementById('currently').textContent = jsObject.weather[0].main;
    document.getElementById('hightemp').textContent = jsObject.main.temp_max.toFixed(0);
    document.getElementById('humidity').textContent = jsObject.main.humidity;
    document.getElementById('windspeed').textContent = jsObject.wind.speed.toFixed(0);

    const temperature = jsObject.main.temp;
    const windSpeed = jsObject.wind.speed;
    const windChill = 35.74 + 0.6215 * temperature 
    - 35.75 * Math.pow(windSpeed, 0.16) 
    + 0.4275 * temperature * Math.pow(windSpeed, 0.16);

    if (temperature <= 50 && windSpeed > 3.0)
    {
        document.getElementById("windchill").innerHTML = windChill.toFixed(0) + "&deg; F";
    }
    else {
        document.getElementById("windchill").textContent = "N/A"
    }
  });