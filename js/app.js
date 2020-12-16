'use strict';

// var imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg',
//  'bubblegumjpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg',
// 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg','unicorn.jpg', 'usb.gif', 'water-can.jpg',
// 'wine-glass.jpg'];


//-------------------
// Global Variable
//-------------------

var imgArray = [];

var leftImg = document.getElementById('left_img');
var midImg = document.getElementById('mid_img');
var righImg = document.getElementById('right_img');

var leftImgText = document.getElementById('left_h2');
var midImgText = document.getElementById('mid_h2');
var rightImgText = document.getElementById('right_h2');

var imgSection = document.getElementById('imageSection');

var trialsleft = 5;

//-------------------
//Constructor//
//-------------------

function Img(name, image) {
  this.name = name;
  this.image = image;
  this.url = 'images/' + image;
  this.counter = 0;

  imgArray.push(this);
}
//-------------------
//RenderFunction//
//-------------------

function renderImg(leftImage, midImg, rightImage) {
  leftImg.setAttribute('src', imgArray[leftImg].url);
  midImg.setAttribute('src', imgArray[midImg].url);
  rightImg.setAttribute('src', imgArray[rightImg].url);

  leftImgText.textContent = imgArray[leftImage].name;
  midImgText.textContent = imgArray[midImg].name;
  rightImgText.textContent = imgArray[rightImage].name;

}

//---------------------------------
//picking an image to be rendered//
//---------------------------------

function pickImg() {
  var leftImg = Math.round(Math.random() * (imgArray.length - 1))

  do {
    var rightImg = Math.round(Math.random() * (imgArray.length - 1))
    var midImg = Math.round(Math.random() * (imgArray.length - 1))
  } while (leftImg === rightImg || leftImg === midImg || midImg === rightImg);

  // console.log(leftImg);
  // console.log(midImg);
  // console.log(rightImg);

  renderImg(leftImage, midImg, rightImage)
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
      checkTrials(objectIndicator);
      pickImg();
    }

  } else {
    imgSection.removeEventListener('click', counts);
    console.log(ImgArray);
  }
}


function checkTrials(objectIndicator) {
  for (var index = 0; index < imgArray.length; index++) {
    if (ImgArray[index].url === objectIndicator) {
      imgArray[index].counter++;
      trialsleft--;
    }
  }
}

//-----------------------------
// Constructor & Function Calls
//-----------------------------

new Img('bag', 'bag.jpg');
new Img('banana', 'banana.jpg');
new Img('bathroom', 'bathroom.jpg');
new Img('boots', 'boots.jpg');
new Img('breakfast', 'breakfast.jpg');
new Img('bubblegum', 'bubblegum.jpg');
new Img('chair', 'chair.jpg');
new Img('cthulhu', 'cthulhu.jpg');
new Img('dog-duck', 'dog-duck');
new Img('dragon', 'dragon.jpg');
new Img('pen', 'pen.jpg');
new Img('pet-sweep', 'pet-sweep.jpg');
new Img('scissors', 'scissors.jpg');
new Img('shark', 'shark.jpg');
new Img('sweep', 'sweep.png');
new Img('tauntaun', 'tauntaun.jpg');
new Img('unicorn', 'unicorn.jpg');
new Img('usb', 'usb.gif');
new Img('water-can', 'water-can.jpg',);
new Img('wine-glass', 'wine-glass.jpg');

consol.log(imgArray)

pickImg();
imgSection.addEventListener('click', counts);