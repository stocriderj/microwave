let feedback = document.getElementById("feedback");
let heatedDisplay = document.getElementById("heated");

function randint(max) {
    return Math.round(Math.random() * max);
}

function wait() {
    var waste = "waste";
    waste += "this does nothing stop reading this";
}

var setColors = {
    off: function(location) {
        location.setAttribute("style","color:black");

    },
    animate: function(location, color) {
        console.log('before');
        this.off(location);
        setTimeout(function() {
            location.setAttribute("style","color:" + color)
            console.log("after");
        },500);
    },
    success: function(location) {
        this.animate(location, "#00A052");
    },
    bad: function(location) {
        this.animate(location, "red");
    },
    normal: function(location) {
        this.animate(location, "#0095B6");
    }
}

function display(location, message, color = "normal") {
    if (color == "success") {
        setColors.success(location);
    } else if (color == "bad") {
        setColors.bad(location);
    } else if (color == "normal") {
        setColors.normal(location);
    } else if (color == "off") {
        setColors.off(location);
    }
    setTimeout(function() {
        location.innerHTML = message;
    },500);
    
}

var foodManager = {
    foods: ["popcorn", "pizza","instant noodles","leftovers from lunch", "leftovers from dinner","breakfast milk","corn","breakfast","Freshly"],
    heated: 0,
    heatedFood: "",
    chooseFood: function() {
        this.heatedFood = this.foods[randint(this.foods.length - 1)];
    }
};

   
var microwave = {
    errorMessages: ["The microwave does not respond.","You click but nothing happens.","A skulking neighbor taunts you.","Looks like he's taking a nap.","Have you noticed you've put him to sleep?"],
    displayErrorMessage: function() {
        display(feedback, this.errorMessages[randint(this.errorMessages.length - 1)], "bad");
    },
    on: false,
    audio: new Audio("sounds/heating-sound.mp3"),
    toggle: function() {
        this.on = !this.on;
        if (this.on) {
            toggleBtn.setAttribute("style","background-color:#37D600;");
            if (foodManager.heated > 0) {
                setColors.normal(heatedDisplay)
            }
        } else {
            toggleBtn.setAttribute("style","background-color:#8f0101;");
            this.audio.pause();
            this.audio.currentTime = 0;
            setColors.off(heatedDisplay);
            setColors.off(feedback);
        }
    },
    heat: function() {
        if (this.on && this.audio.paused) {
            this.audio.play();
            foodManager.chooseFood();
            display(feedback, `I'm now heating your ${foodManager.heatedFood}.`, "success");
        } else if (!this.audio.paused) {
            display(feedback,`I'm already heating your ${foodManager.heatedFood}!`, "bad");
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
    },
    tellTime: function() {
        if (this.on) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes();
            display(feedback, `The time is ${time}.`);
        }
    }
};