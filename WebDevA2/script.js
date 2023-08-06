
//target all elements to save to constants
const page1btn = document.querySelector("#HomePg");
const page2btn = document.querySelector("#RulesPg");
const page3btn = document.querySelector("#PlayPg");
const page4btn = document.querySelector("#LegendsPg");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages

show(4); //show home page by default

function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) { //function to show selected page no
    hideall(); // hide all pages
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    //show the page
    onepage.style.display = "block";
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1); //show home page
});
page2btn.addEventListener("click", function () {
    show(2); //show rules page
});
page3btn.addEventListener("click", function () {
    show(3); //show plays page
});
page4btn.addEventListener("click", function () {
    show(4); //show legends page
});


// HISTORY SLIDESHOW
const buttons = document.querySelectorAll("[data-carousel-button]"); //use data as it does not overlap between classes and js

buttons.forEach(button => {
    button.addEventListener("click", () => { //on click, swap to next image
        const offset = button.dataset.carouselButton === "next" ? 1 : -1; // if button = next, return 1, else return -1
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]"); //get active slide, slide with data-active attribute
        let newIndex = [...slides.children].indexOf(activeSlide) + offset; //get new index

        //loop around the images
        if (newIndex < 0) newIndex = slides.children.length - 1; //if it's the first image, go to last image on next slide
        if (newIndex >= slides.children.length) newIndex = 0; //if it's the last image, go to first image on next slide

        slides.children[newIndex].dataset.active = true; //add data-active attribute to current index
        delete activeSlide.dataset.active; //removes prev active slide
    });
});

//slide out text for offense and defense
const ODclickableText = document.querySelector('.offense-defense-clickable-text');
const slideOutODText = document.querySelector('.offense-defense-slide-out-text');

ODclickableText.addEventListener('click', () => {
    slideOutODText.classList.toggle('active'); //toggle active on click
});

//slide out text for violations
const violationclickableText = document.querySelector('.violation-clickable-text');
const slideOutViolationText = document.querySelector('.violation-slide-out-text');

violationclickableText.addEventListener('click', () => {
    slideOutViolationText.classList.toggle('active'); //toggle active on click
});

//slide out text for positions
const positionsClickableText = document.querySelector('.positions-clickable-text');
const positionsSlideOutText = document.querySelector('.positions-slide-out-text');

positionsClickableText.addEventListener('click', () => {
    positionsSlideOutText.classList.toggle('active'); //toggle active on click
});


// catch ball mini game
document.addEventListener('DOMContentLoaded', function() { //exec after DOM has loaded

    const gameContainer = document.querySelector('.game-container'); //target game container
    const player = document.querySelector('.player'); //target player
    const leftBtn = document.querySelector('#left-game-btn'); //target left button control
    const rightBtn = document.querySelector('#right-game-btn'); //target right button control
    const scoreElement = document.querySelector('.score'); //target score
    
    let playerPosition = gameContainer.clientWidth / 2; //spawn player on the middle
    let balls = []; //array to store balls
    let score = 0; //init score

    function createBall() {
        const ball = document.createElement('div'); //create div element to store "ball"
        ball.classList.add('ball'); //add ball with .ball properties
        ball.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px'; //spawn ball randomly within the container
        gameContainer.appendChild(ball);
        balls.push(ball); //add ball at the end of balls[]
    }

    function updatePositions() { //update pos of player and balls + check collision

        player.style.left = `${playerPosition}px`; //get player pos and updates it

        balls.forEach((ball, index) => {
            const ballTop = parseInt(ball.style.top || 0); //retrieve top value of ball
            ball.style.top = ballTop + 5 + 'px'; //move ball downwards by 5px every frame

            if (ballTop >= gameContainer.clientHeight) { //if ball does not get collected by player and hits the ground
                gameContainer.removeChild(ball); 
                balls.splice(index, 1); //remove ball from array
            }

            if (
                ballTop + 30 >= gameContainer.clientHeight - 50 && //check if the bottom of the ball is touching the top of player
                ballTop + 30 <= gameContainer.clientHeight && // check if ball is above the bottom of game container, ensures that ball is within bounds
                parseInt(ball.style.left) >= playerPosition - 50 && //checks if the ball is to the left edge of player
                parseInt(ball.style.left) <= playerPosition + 30  //checks if the ball is to the right edge of player
            ) {
                gameContainer.removeChild(ball);
                balls.splice(index, 1);  //remove ball
                score++; //add score by 1
            }
        });
    }

    //CONTROLS FOR ARROW KEYS
    document.addEventListener('keydown', (event) => { //add event for keydown
        if (event.key === 'ArrowLeft') { // if key pressed is left arrow
            playerPosition -= 10; //move player to left
            if (playerPosition - 25 < 0) {
                playerPosition = 25; // prevent player from moving out of bounds
            }
        } else if (event.key === 'ArrowRight') { // if key pressed is right arrow
            playerPosition += 10; //move player right
            if (playerPosition > gameContainer.clientWidth - 25) { //check if player exceeds boundary - player width
                playerPosition = gameContainer.clientWidth - 25; //prevent player from moving out
            }
        }
    });


    //CONTROLS FOR BUTTONS
    leftBtn.addEventListener('click', () => { // if left arrow button is clicked
        playerPosition -= 10; //move player to left
        if (playerPosition -25 < 0) {
            playerPosition = 25; // prevent player from moving out of bounds
        } 
    });

    rightBtn.addEventListener('click', () => { // if right arrow button is clicked
        playerPosition += 10; //move player right
        if (playerPosition > gameContainer.clientWidth - 25) { //check if player exceeds boundary - player width
            playerPosition = gameContainer.clientWidth - 25; //prevent player from moving out
        }
    });

    setInterval(() => { //create a ball every 1 second
        createBall();
    }, 1000);

    setInterval(() => { //call these 2 functions every 20ms
        updatePositions(); //update player and ball pos, check collison
        updateScore(); // update score
    }, 20);

    function updateScore() { //show + update score
        scoreElement.textContent = 'Score: ' + score;
    }
});



//kobe bryant expandable section
const kobeClickableText = document.querySelector('#kobe-bryant-clickable-text');
const kobeExpandableSection = document.querySelector('#kobe-bryant-expandable-section');

kobeClickableText.addEventListener('click', () => {
    if (kobeExpandableSection.style.height === '0px') {
        kobeExpandableSection.style.height = kobeExpandableSection.scrollHeight + 'px';
        kobeExpandableSection.style.opacity = 1;
    } else {
        kobeExpandableSection.style.height = '0px';
        kobeExpandableSection.style.opacity = 0;
    }
});


//michael jordan expandable section
const mikeClickableText = document.querySelector('#michael-jordan-clickable-text');
const mikeExpandableSection = document.querySelector('#michael-jordan-expandable-section');

mikeClickableText.addEventListener('click', () => {
    if (mikeExpandableSection.style.height === '0px') {
        mikeExpandableSection.style.height = mikeExpandableSection.scrollHeight + 'px';
        mikeExpandableSection.style.opacity = 1;
    } else {
        mikeExpandableSection.style.height = '0px';
        mikeExpandableSection.style.opacity = 0;
    }
});

//kareem expandable section
const kareemClickableText = document.querySelector('#kareem-clickable-text');
const kareemExpandableSection = document.querySelector('#kareem-expandable-section');

kareemClickableText.addEventListener('click', () => {
    if (kareemExpandableSection.style.height === '0px') {
        kareemExpandableSection.style.height = kareemExpandableSection.scrollHeight + 'px';
        kareemExpandableSection.style.opacity = 1;
    } else {
        kareemExpandableSection.style.height = '0px';
        kareemExpandableSection.style.opacity = 0;
    }
});