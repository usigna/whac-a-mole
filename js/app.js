function handleFirstTab(e) {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
};

window.addEventListener('keydown', handleFirstTab);

const circles = document.querySelectorAll('.circle');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const btn = document.querySelector('.btn');
let result = 0;
let currentTime = 60;
let timerId = null;
let countDownTimerId;
let hitPosition;

function randomCircle() {
  circles.forEach(circle =>  {
    circle.classList.remove('mole');
  });

  let randomCircle = circles[Math.floor(Math.random() * 9)];
  randomCircle.classList.add('mole');

  hitPosition = randomCircle.id;
}

circles.forEach(circle => {
  circle.addEventListener('mousedown', () => {
    if (circle.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  })
})

function moveMole() {
  timerId = setInterval(randomCircle, 500);
}

// moveMole();

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;


  if(currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result);
    currentTime = 60;
    timeLeft.textContent = currentTime;
    result = 0;
    score.textContent = result;
  }
}

btn.addEventListener('click', () => {
  moveMole();
  countDownTimerId = setInterval(countDown, 1000);
})