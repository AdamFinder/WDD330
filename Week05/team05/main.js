import Hikes from './hikes.js';
const myHike = new Hikes('hikes');

//on load grab the array and insert it into the page on load
window.addEventListener("load", () => {
    myHike.showHikeList();
});