// Place all code to do with menus here

// First connect to the server
const socket = io('http://localhost:3000');

const user = {
    name: 'Player',
    uid: ''
};

socket.on('handshakeResponse', uid => {
    console.log(`${user.name} uid: ${uid}`);
    user.uid = uid;
});

socket.on('findMatchResponse', response => {
    // {
    //     type: RESULT.WIN,
    //     opponents: [
    //         {
    //             '$uid'?: 'uid',
    //             'food': FOOD.TYPE
    //         }
    //     ],
    //     code: string,
    //     matchId: string
    // }
    console.log('Match response:', response);
    switchToPage('race');
});

socket.emit('handshakeRequest', { name: user.name });

// Loading sequence

// const totalImages = document.images.length;

// let progress = 0;

// let fillerCanvas = document.createElement('canvas');

// const allImg = document.images;

// const preloadImage = new Image();

// preloadImage.onload = () => {
//     // Create a canvas with the same dimensions as the image
//     const WIDTH = preloadImage.naturalWidth;
//     const HEIGHT = preloadImage.naturalHeight;

//     fillerCanvas = canvas = document.createElement('canvas');
//     canvas.width = WIDTH;
//     canvas.height = HEIGHT;

//     const context = canvas.getContext('2d');

//     context.drawImage(preloadImage, 0, 0);

//     document.getElementById('loader-box').appendChild(canvas);

//     document.querySelector('.pages').style.visibility = 'visible';
//     console.log('Done loading image');

//     startLoadingSequence();
// };
// console.warn('Starting to load image');
// preloadImage.src = './img/logo.png';

// function startLoadingSequence() {
//     // 
//     console.log(Array.for(allImg));
// }

// Get reference to all pages
const pages = Array.from(document.querySelectorAll('.pages__page'));
const pagesContainer = document.querySelector('.pages');
const pageCount = pages.length;

// Put all pages in the right position
pages.forEach((page, ix) => {
    page.style.transform = `translateX(${100 * ix}%)`;
});

// UTILS

function switchToPage(id, action = () => {}) {
    const index = pages.findIndex(ele => ele.id === id);

    positionPages(index);

    action();
}

function positionPages(offsetIndex = 0) {
    pagesContainer.style.transform = `translateX(-${100 * offsetIndex}%)`;
}

function connectToMatch() {
    // Connect the player to a match
    socket.emit('findMatchRequest', {
        foodType: FOOD.BURGER_1
    });
}