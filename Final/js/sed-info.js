// import Comments from './week07-comment.js';

//create an array of hikes
const hikeList = [
    {
        name: 'Devil Bridge Trail',
        imgSrc: 'devils.jpg',
        imgAlt: 'Image of Bechler Falls',
        distance: '1.8 Miles',
        difficulty: 'Easy',
        description:
            'A 1.8 mile roundtrip hike with magnificent views.',
        directions:
            'Drive 27 miles south from Flagstaff to Sedona on US 89A. Continue through Sedona to Dry Creek Road (FR152) at the west end of town. Turn right on Dry Creek Road and drive for two miles to where FR152 forks and take the right fork (leaving the paved road). This road is rough; high-clearance vehicles required. It is not recommended during wet weather. About 1.3 miles up this road, turn right to Devils Bridge Trailhead and parking lot. '
    },
    {
        name: 'Cathedral Rock',
        imgSrc: 'cathedral.jpg',
        imgAlt: 'Image of Bechler Falls',
        distance: '0.7 miles (1.5 roundtrip)',
        difficulty: 'Moderate',
        description: 'A rock climbing hike with a great view.',
        directions:
            'From the junction of Routes 89A and 179, take 179 south 3.5 miles to Back O Beyond Road on the right. Go 0.6 miles to the trailhead parking turnout on the left.'
    },
    {
        name: 'Boynton Canyon Trail',
        imgSrc: 'boynton.jpg',
        imgAlt: 'Image of Bechler Falls',
        distance: '7.3 miles',
        difficulty: 'Easy - Moderate',
        description:
            'One of the most scenic box canyons that make Arizona Red Rock Country.',
        directions:
            'Drive 27 miles south from Flagstaff to Sedona on US 89A. Continue through Sedona to Dry Creek Road at the southwest end of town. Turn north (right) on Dry Creek Road and follow the signs to Boynton Canyon. You will find a parking lot and the trailhead just outside the entrance to the Enchantment Resort.'
    }
];

const imgBasePath = './images/';

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
        backButton.innerHTML = '🢀 All Hikes';
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