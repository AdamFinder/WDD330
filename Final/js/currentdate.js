let current = new Date();
let day = current.getDay();
let month = current.getMonth();
let date = current.getDate();
let year = current.getFullYear();

let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = weekdays[day] + ", " + date + " " + months[month] + ", " + year;

document.getElementById("currentdate").textContent = currentDate;