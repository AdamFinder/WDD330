const forecastURL="https://api.openweathermap.org/data/2.5/forecast?id=5308655&APPID=9b126e46803265f6948561627ab0b85b&units=imperial"
fetch(forecastURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const forecast = jsObject.list.filter(x => x.dt_txt.includes('18:00:00'));

    for (let i = 0; i < 5; i++ ) {
        let divDay = document.createElement('div');
        let spanDay = document.createElement('span');
        let image = document.createElement('img');
        let spanTemp = document.createElement('span');

        const temp = forecast[i].main.temp.toFixed(0);
        const dayString = forecast[i].dt_txt;
        const dayOfWeek = new Date(dayString).getDay();
        const dayName = dayNames[dayOfWeek];
        const imagesrc = 'https://openweathermap.org/img/wn/' + forecast[i].weather[0].icon + '@2x.png';
        const desc = forecast[i].weather[0].description;

        divDay.setAttribute('class', 'segment');
        spanDay.setAttribute('class', 'day-label');
        spanDay.textContent = dayName;
        image.setAttribute('src', imagesrc);
        image.setAttribute('alt', desc);
        spanTemp.setAttribute('class', 'temp-label');
        spanTemp.innerHTML = temp + '&deg; F';
               
        divDay.appendChild(spanDay);
        divDay.appendChild(image);
        divDay.appendChild(spanTemp);
        
        document.getElementById('liveforecast').appendChild(divDay);
    } 

  });