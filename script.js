function randint(max) {
    return Math.round(Math.random() * max);
}
   
   
var toggleBtn = document.getElementById("toggleBtn");
var feedback = document.getElementById("feedback");
var heatBtn = document.getElementById("heatBtn");
   
var microwave = {
    foods: ["nothing, oops", "popcorn", "pizza","instant noodles","yesterday's lunch", "leftovers from dinner","the milk you forgot to drink at breakfast"],
    on: false,
    toggle: function() {
        this.on = !this.on;
    },
    heat: function() {
        if (this.on) {
            feedback.setAttribute("style", "color:green;");
            feedback.innerHTML = "Now heating " + this.foods[randint(this.foods.length - 1)] + ".";
        } else {
            feedback.setAttribute("style", "color:red;");
            feedback.innerHTML = "You click the button but nothing happens.";
        }
    }
};
   
toggleBtn.onclick = function() {
    microwave.toggle();
    if (microwave.on) {
        toggleBtn.innerHTML = "Turn off";
    } else {
        toggleBtn.innerHTML = "Turn on";
    }
}
   
heatBtn.onclick = function() {
    microwave.heat();
}
   