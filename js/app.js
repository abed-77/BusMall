'use strict';

//-------------------
// Global Variables //
//-------------------

var imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg',
  'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
  'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg',
  'wine-glass.jpg'];

var productsArray = [];

var leftImg = document.getElementById('left_img');
var midImg = document.getElementById('mid_img');
var rightImg = document.getElementById('right_img');

var leftImgText = document.getElementById('left_h2');
var midImgText = document.getElementById('mid_h2');
var rightImgText = document.getElementById('right_h2');

var imgSection = document.getElementById('imageSection');

var trialsleft = 25;

var btn = document.getElementById('viewButton');

//-------------
//Constructor//
//-------------

function Img(image) {
  this.name = image.split('.')[0];
  this.url = 'images/' + image;
  this.counter = 0;
  this.views = 0;

  productsArray.push(this);
}

//----------------
//RenderFunction//
//----------------

function renderImg(leftImage, midImage, rightImage) {

  leftImg.setAttribute('src', productsArray[leftImage].url);
  midImg.setAttribute('src', productsArray[midImage].url);
  rightImg.setAttribute('src', productsArray[rightImage].url);

  leftImgText.textContent = productsArray[leftImage].name;
  midImgText.textContent = productsArray[midImage].name;
  rightImgText.textContent = productsArray[rightImage].name;

  productsArray[leftImage].views++;
  productsArray[midImage].views++;
  productsArray[rightImage].views++;

}

//---------------------------------
//picking an image to be rendered//
//---------------------------------

function pickImg() {
  var leftImageRnd = Math.round(Math.random() * (productsArray.length - 1));

  do {
    var rightImageRnd = Math.round(Math.random() * (productsArray.length - 1));
    var midImageRnd = Math.round(Math.random() * (productsArray.length - 1));
  }
  while (leftImageRnd === rightImageRnd || leftImageRnd === midImageRnd || midImageRnd === rightImageRnd);

  // console.log(leftImageRnd);
  // console.log(midImageRnd);
  // console.log(rightImageRnd);

  renderImg(leftImageRnd, midImageRnd, rightImageRnd);
}

//------------------------
// Counting event times
//------------------------

function counts(event) {

  var targetId = event.target.id;
  // console.log(targetId);

  if (trialsleft !== 0) { // we are checking if the user has trials left
    if (targetId === 'left_img' || targetId === 'mid_img' || targetId === 'right_img') { // we are checking if the user clicked on the correct image
      var objectIndicator = event.target.getAttribute('src');
      console.log(objectIndicator);
      checkTrials(objectIndicator);
      pickImg();
    }

  } else {
    imgSection.removeEventListener('click', counts);
    // console.log(ImgArray);
  }
}


function checkTrials(objectIndicator) {
  for (var index = 0; index < productsArray.length; index++) {
    if (productsArray[index].url === objectIndicator) {
      productsArray[index].counter++;
      trialsleft--;
    }
  }
}

//-----------------------------
// Constructor & Function Calls
//-----------------------------

// new Img('bag.jpg');
// new Img('banana.jpg');
// new Img('bathroom.jpg');
// new Img('boots.jpg');
// new Img('breakfast.jpg');
// new Img('bubblegum.jpg');
// new Img('chair.jpg');
// new Img('cthulhu.jpg');
// new Img('dog-duck');
// new Img('dragon.jpg');
// new Img('pen.jpg');
// new Img('pet-sweep.jpg');
// new Img('scissors.jpg');
// new Img('shark.jpg');
// new Img('sweep', 'sweep.png');
// new Img('tauntaun', 'tauntaun.jpg');
// new Img('unicorn', 'unicorn.jpg');
// new Img('usb', 'usb.gif');
// new Img('water-can', 'water-can.jpg');
// new Img('wine-glass', 'wine-glass.jpg');

// consol.log(productsArray)


for (let index = 0; index < imgArray.length; index++) {
  new Img(imgArray[index]);

}

pickImg();

imgSection.addEventListener('click', counts);


btn.addEventListener('click', viewResult);


var resultList = document.getElementById('resultList');

function viewResult(event) {
  resultList.innerHTML = '';
  for (let index = 0; index < productsArray.length; index++) {
    var li = document.createElement('li');

    li.textContent = `${productsArray[index].name} has been clicked ${productsArray[index].counter} times,
    and hass been veiwed ${productsArray[index].views} times`;

    resultList.appendChild(li);
  }

}


// can't hear you!
