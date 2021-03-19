function randint(max) {
    return Math.round(Math.random() * max);
}

var setColors = {
    success: function(location) {
        location.setAttribute("style","color: green");
    },
    bad: function(location) {
        location.setAttribute("style","color:red");
    },
    normal: function(location) {
        location.setAttribute("style","color:black");
    }
}

function display(location, message, color = "normal") {
    if (color == "success") {
        setColors.success(location);
    } else if (color == "bad") {
        setColors.bad(location);
    } else if (color == "normal") {
        setColors.normal(location);
    }
    location.innerHTML = message;
}

var foodManager = {
    foods: ["popcorn", "pizza","instant noodles","leftovers from lunch", "leftovers from dinner","breakfast milk that you forgot to drink","corn","breakfast","Freshly"],
    heated: 0,
    heatedFood: "",
    chooseFood: function() {
        this.heatedFood = this.foods[randint(this.foods.length - 1)];
    }
};
   
var toggleBtn = document.getElementById("toggleBtn");
var feedback = document.getElementById("feedback");
var heatBtn = document.getElementById("heatBtn");
var heatedDisplay = document.getElementById("heated");
   
var microwave = {
    on: false,
    audio: new Audio("sounds/heating-sound.mp3"),
    toggle: function() {
        this.on = !this.on;
        if (this.on) {
            toggleBtn.setAttribute("style","background-color:#37D600;")
        } else {
            toggleBtn.setAttribute("style","background-color:#8f0101;")
            if (!this.audio.paused) {
                display(feedback,"The microwave was heating something up!", "bad");
            }
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    },
    heat: function() {
        if (this.on && this.audio.paused) {
            this.audio.play();
            foodManager.chooseFood();
            display(feedback, `I'm now heating your ${foodManager.heatedFood}.`, "success");
        } else if (!this.audio.paused) {
            display(feedback,`I'm heating your ${foodManager.heatedFood} right now!`, "bad");
        } else {
            let errorMessages = ["You click the button but nothing happens.","Looks like the microwave is taking a nap.","Nothing happens.","The microwave does not respond.","'You can't heat anything if the microwave is off, you idiot!' says a disrespectful, skulking neighbor.","Are you trying to use the microwave when it's not turned on?","Crickets chirp in the background."];
            display(feedback, errorMessages[randint(errorMessages.length - 1)], "bad");
        }
        this.audio.onended = function() {
            let message = "I've heated ";
            display(feedback,`Done! Now take out your ${foodManager.heatedFood} and enjoy!`, "success");
            foodManager.heated++;
            if (foodManager.heated == 1) {
                display(heatedDisplay, `${message}1 piece of food.`);
            } else {
                display(heatedDisplay, `${message + foodManager.heated} pieces of food.`);
            }
        }
    }
};