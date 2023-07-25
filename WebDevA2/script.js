
//target all elements to save to constants
const page1btn = document.querySelector("#HomePg");
const page2btn = document.querySelector("#RulesPg");
const page3btn = document.querySelector("#PlaysPg");
const page4btn = document.querySelector("#LegendsPg");
var allpages = document.querySelectorAll(".page");
//select all subtopic pages


//console.log(allpages);

// hideall();
show(1); //show home page by default

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
    show(2); //show history page
});
page3btn.addEventListener("click", function () {
    show(3); //show rules page
});
page4btn.addEventListener("click", function () {
    show(4); //show legends page
});



