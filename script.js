function randint(max) {
    return Math.round(Math.random() * max);
}
   
var toggleBtn = document.getElementById("toggleBtn");
var feedback = document.getElementById("feedback");
var heatBtn = document.getElementById("heatBtn");
var heatedDisplay = document.getElementById("heated");

var heated = 0;
   
var microwave = {
    foods: ["someone's pillow, what a psycho", "popcorn", "pizza","instant noodles","yesterday's lunch", "leftovers from dinner","the milk you forgot to drink at breakfast","corn","your breakfast","Freshly"],
    on: false,
    toggle: function() {
        this.on = !this.on;
    },
    heat: function() {
        if (this.on) {
            new Audio("sounds/Microwave-sound.mp3").play();
            feedback.setAttribute("style", "color:green;");
            feedback.innerHTML = "Heating " + this.foods[randint(this.foods.length - 1)] + ".";
            heated++;
            heatedDisplay.innerHTML = "Foods Heated: " + heated;
        } else {
            let errorMessages = ["You click the button but nothing happens.","Looks like the microwave is taking a nap.","Nothing happens.","The microwave does not respond.","'You can't heat anything if the microwave is off, you idiot!' says a disrespectful, skulking neighbor.","Are you trying to use the microwave when it's not turned on?","Crickets chirp in the background."];
            feedback.setAttribute("style", "color:red;");
            feedback.innerHTML = errorMessages[randint(errorMessages.length - 1)];
        }
    }
};
   
toggleBtn.onclick = function() {
    microwave.toggle();
    if (microwave.on) {
        toggleBtn.setAttribute("style","background-color:#37D600;")
    } else {
        toggleBtn.setAttribute("style","background-color:#8f0101;")
    }
}
   
heatBtn.onclick = function() {
    microwave.heat();
}
   