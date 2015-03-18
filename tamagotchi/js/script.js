var Tamagotchi = {
    name:"",
    sleepLevel:10,
    foodLevel:10,
    activityLevel:10,
    initialize:function(name){
        this.name = name;
    },

    isAlive:function(){
        if (this.activityLevel > 0 && this.sleepLevel > 0 && this.foodLevel > 0){
            $("div#health").css("background-color", "#008000");
            return true
        } else {
            $("div#health").css("background-color", "#ee0000");
            return false
        }
    },

    timePasses:function(){
        this.foodLevel = this.foodLevel- Math.round(Math.random() * 3); //можно ли писать спецификации с учётом рандома?
        this.sleepLevel = this.sleepLevel- Math.round(Math.random() * 3);
        this.activityLevel = this.activityLevel- Math.round(Math.random() * 3);
    },

    feed:function(){
        this.foodLevel = this.foodLevel+(10-this.foodLevel);
    },
    sleep:function(){
        this.sleepLevel = this.sleepLevel+(10-this.sleepLevel);
    },
    play:function(){
        this.activityLevel = this.activityLevel+(10-this.activityLevel);
    },
    updatehtml:function(){
        $("#sleep").html(this.sleepLevel);
        $("#food").html(this.foodLevel);
        $("#activity").html(this.activityLevel);
    }

};

$(document).ready(function() {
    $("form#for-new").submit(function(event) {
        event.preventDefault();
        var myPet = Object.create(Tamagotchi);
        myPet.initialize($("input#name").val());
        $("#new").hide();
        $("#health").show();
        $("#name-status").append(myPet.name);
        myPet.timePasses();
        myPet.updatehtml();
        myPet.isAlive();

        $("#get-sleep").click(function(){
            myPet.sleep();
            myPet.timePasses();
            myPet.updatehtml();
            myPet.isAlive();
        });

        $("#feed").click(function(){
            myPet.feed();
            myPet.timePasses();
            myPet.updatehtml();
            myPet.isAlive();
        });

        $("#play").click(function(){
            myPet.play();
            myPet.timePasses();
            myPet.updatehtml();
            myPet.isAlive();
        });
    });

});