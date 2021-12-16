// import Comments from './week07-comment.js';

//create an array of hikes
const hikeList = [
    {
        name: 'Humphreys Peak Trail',
        imgSrc: 'falls.jpg',
        imgAlt: 'Image of Bechler Falls',
        distance: '5 - 5.5 miles',
        difficulty: 'Moderate',
        description:
            'Steep mountain trail that leads to the highest point in Arizona.',
        directions:
            'From Flagstaff, take Highway 180 north for 6.5 miles (180 begins in downtown from Route 66 as Humphreys Street, turn left on W Columbus Avenue from Humphreys Street to follow 180). Six or seven miles out of Flagstaff, near mile post 223, turn right on the signed N Snowbowl Road. Follow the paved Snowbowl Road steeply up the mountain for 6.5 miles where you will see the signed parking area on the left. Entering “Arizona Snowbowl” on your GPS will also get you there.'
    },
    {
        name: 'Fatemans Loop Trail',
        imgSrc: 'falls.jpg',
        imgAlt: 'Image of Bechler Falls',
        distance: '2 miles',
        difficulty: 'Moderate',
        description: 'A nice walk with scenic overlooks of Flagstaff.',
        directions:
            'Follow Route 66 (which becomes Highway 89) past the Flagstaff Mall and the Flagstaff Ranger District Office to a trailhead parking lot just off the northwest side of the street.'
    },
    {
        name: 'Elden Lookout Trail',
        imgSrc: 'falls.jpg',
        imgAlt: 'Image of Bechler Falls',
        distance: '3 miles',
        difficulty: 'Moderate',
        description:
            'A steep trail that leads up a staircase of petrified lava.',
        directions:
            'Follow Highway 89 past the entrance to the Flagstaff Mall and the Flagstaff Ranger District Office to a trailhead parking lot just off the north side of the street.'
    }
];

const imgBasePath = '//byui-cit.github.io/cit261/examples/';

export default class Hikes {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
        // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
        this.backButton = this.buildBackButton();
        // this.comments = new Comments('hikes', 'comments');
    }
    // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
    getAllHikes() {
        return hikeList;
    }
    // For the first stretch we will need to get just one hike.
    getHikeByName(hikeName) {
        return this.getAllHikes().find(hike => hike.name === hikeName);
    }
    //show a list of hikes in the parentElement
    showHikeList() {
        this.parentElement.innerHTML = '';
        // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
        renderHikeList(this.parentElement, this.getAllHikes());
        this.addHikeListener();
        // make sure the back button is hidden
        this.backButton.classList.add('hidden');
        this.comments.showCommentList();
    }
    // show one hike with full details in the parentElement
    showOneHike(hikeName) {
        const hike = this.getHikeByName(hikeName);
        this.parentElement.innerHTML = '';
        this.parentElement.appendChild(renderOneHikeFull(hike));
        // show the back button
        this.backButton.classList.remove('hidden');
        this.comments.showCommentList(hikeName);
    }
    // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
    addHikeListener() {
        // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
        const childrenArray = Array.from(this.parentElement.children);
        childrenArray.forEach(child => {
            child.addEventListener('click', e => {
                // why currentTarget instead of target?
                this.showOneHike(e.currentTarget.dataset.name);
            });
        });
    }
    buildBackButton() {
        const backButton = document.createElement('button');
        backButton.innerHTML = '&lt;- All Hikes';
        backButton.addEventListener('click', () => {
            this.showHikeList();
        });
        backButton.classList.add('hidden');
        this.parentElement.before(backButton);
        return backButton;
    }
}
// End of Hikes class
// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(parent, hikes) {
    hikes.forEach(hike => {
        parent.appendChild(renderOneHikeLight(hike));
    });
}
function renderOneHikeLight(hike) {
    const item = document.createElement('li');
    item.classList.add('light');
    // setting this to make getting the details for a specific hike easier later.
    item.setAttribute('data-name', hike.name);
    item.innerHTML = ` <h2>${hike.name}</h2>
<div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
<div>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
</div>`;

    return item;
}
function renderOneHikeFull(hike) {
    const item = document.createElement('li');
    item.classList.add('full');
    item.innerHTML = ` 
        <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
        <h2>${hike.name}</h2>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
        <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
        </div>
        <div>
            <h3>How to get there</h3>
            <p>${hike.directions}</p>
        </div>
    `;
    return item;
}