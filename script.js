let feedback = document.getElementById("feedback");
let heatedDisplay = document.getElementById("heated");
let oven = document.getElementById("oven");

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

function displayHeated() {
    let message = "I've heated ";
    oven.setAttribute("style","background-color:rgb(49, 49, 49)");
    display(feedback,`Done! Now take out your ${foodManager.heatedFood} and enjoy!`, "success");
    foodManager.heated++;
    if (foodManager.heated == 1) {
        display(heatedDisplay, `${message}1 piece of food.`);
    } else {
        display(heatedDisplay, `${message + foodManager.heated} pieces of food.`);
    }
}    

   
var microwave = {
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
            oven.setAttribute("style","background-color:rgb(49, 49, 49)");
        }
    },
    heat: function() {
        if (this.on && this.audio.paused) {
            this.audio.play();
            foodManager.chooseFood();
            oven.setAttribute("style","background-color:#FF8700;");
            display(feedback, `I'm now heating your ${foodManager.heatedFood}.`, "success");
        } else if (!this.audio.paused) {
            display(feedback,`I'm already heating your ${foodManager.heatedFood}!`, "bad");
        }
        this.audio.onended = function() {
            displayHeated();
        }
    },
    tellTime: function() {
        if (this.on) {
            var time = (new Date()).toTimeString().substr(0,5);
            display(feedback, `The time is ${time}.`);
        }
    }
};