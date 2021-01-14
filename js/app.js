
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

var trialsleft = 10;

var btn = document.getElementById('viewButton');

var resultList = document.getElementById('resultList');

var chartCanvas = document.getElementById('myChart').getContext('2d');
// ctx.fillStyle = 'green';
// ctx.fillRect = (10, 10, 150, 100);

var shownImages = [];

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
  do {
    var leftImageRnd = Math.round(Math.random() * (productsArray.length - 1));
    var leftImageName = productsArray[leftImageRnd].name;
  } while (checkAvl(leftImageName));

  do {
    var rightImageRnd = Math.round(Math.random() * (productsArray.length - 1));
    var rightImageName = productsArray[rightImageRnd].name;
  } while ((leftImageRnd === rightImageRnd) || checkAvl(rightImageName));


  do {
    var midImageRnd = Math.round(Math.random() * (productsArray.length - 1));
    var midImageName = productsArray[midImageRnd].name;
  } while (leftImageRnd === midImageRnd || midImageRnd === rightImageRnd ||
    checkAvl(midImageName));


  // console.log(leftImageRnd);
  // console.log(midImageRnd);
  // console.log(rightImageRnd);

  shownImages = [];
  shownImages.push(
    productsArray[leftImageRnd],
    productsArray[midImageRnd],
    productsArray[rightImageRnd]
  );

  renderImg(leftImageRnd, midImageRnd, rightImageRnd);
}


function checkAvl(selectedImageName) {
  for (let index = 0; index < shownImages.length; index++) {
    if (shownImages[index].name === selectedImageName) {
      return true;
    }
    return false;
  }
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
    renderChart(); // <<==  ===============================================   <<== chartRender
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


function viewResult() { // should we define a parameter (event)??
  resultList.innerHTML = '';
  for (let index = 0; index < productsArray.length; index++) {
    var li = document.createElement('li');

    li.textContent = `${productsArray[index].name} has been clicked ${productsArray[index].counter} times,
    and hass been veiwed ${productsArray[index].views} times`;

    resultList.appendChild(li);
  }

}

//---------------------------------------------
// Chart Rendering
//---------------------------------------------
function renderChart() {
  var labelArray = [];
  var countArry = [];
  var viewsArray = [];

  for (var index = 0; index < productsArray.length; index++) {
    labelArray.push(productsArray[index].name);
    countArry.push(productsArray[index].counter);
    viewsArray.push(productsArray[index].views);

  }

  var myChart = new Chart(chartCanvas, {

    type: 'bar',
    data: {
      labels: labelArray,// <============
      datasets: [{
        label: '# of Counts',
        data: countArry,// <============
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },

      {
        label: '# of Views',
        data: viewsArray,// <============
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }

      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}


//-----------------------------
// Constructor & Function Calls
//-----------------------------

for (let index = 0; index < imgArray.length; index++) {
  new Img(imgArray[index]);

}

pickImg();

imgSection.addEventListener('click', counts);

btn.addEventListener('click', viewResult);
