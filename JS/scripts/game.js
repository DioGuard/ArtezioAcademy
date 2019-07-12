var cvs = document.getElementById("gameScene")
var ctx = cvs.getContext("2d");

var card_W = 160;
var card_H = 240;

var leftCvs = 30;
var topCvs = 30;
var offset = 10;

var amountOriginal = 5;
var amountRepeat = 2;
var amountPlace = amountOriginal * amountRepeat;

var amountCol = 5; 
var amountRow = 2;

var places = [];

var pair = [-1, -1];

var delay = 1000;

var shirt = new Image();
shirt.src = "images/memory_card0.png";

var counter = document.getElementById("counter");
var totalPoints = 0;
var points = amountOriginal;
var penalty = 0;


initCardPlaces();
draw();

cvs.addEventListener("mousedown", function(e) {

    var rect = this.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    
        for(var row = 0; row < amountRow; row++) {
            for(var col = 0; col < amountCol; col++) {
                if(x >= leftCvs + col * (card_W + offset) && x <= leftCvs + (col + 1) * (card_W + offset) 
                && y >= topCvs + row * (card_H + offset) && y <= topCvs + (row + 1) * (card_H + offset)
                && places[row * amountCol + col][1] != false) {
                        

                    if(pair[0] == -1) {
                        places[row * amountCol + col][2] = false;
                        pair[0] = row * amountCol + col;
                        console.log("1: " + pair[0]);
                    }
                    else if (pair[1] == -1 && pair[0] != row * amountCol + col) {
                        places[row * amountCol + col][2] = false;
                        pair[1] = row * amountCol + col;
                        console.log("2: " + pair[1]);
                        
                        setTimeout(function() {
                            if(places[pair[0]][0] == places[pair[1]][0]) {
                                places[pair[0]][2] = false;
                                places[pair[1]][2] = false;
                                
                                places[pair[0]][1] = false;
                                places[pair[1]][1] = false;

                                totalPoints += points - penalty;
                                counter.innerHTML = "Очки: " + totalPoints;
                                penalty = 0;
                            } else {
                                places[pair[0]][2] = true;
                                places[pair[1]][2] = true;

                                penalty++;
                            }

                            pair[0] = -1;
                            pair[1] = -1;
                        }, delay);
                    }
                }
                    
            }
        }
});

function initCardPlaces() {
    var cards = [];
    var img;

    for(var i = 1; i <= amountOriginal; i++) {
        img = new Image();
        img.src = "images/memory_card" + i + ".png";
        cards.push(img);
    }

    var place;
        
    for(var repeat = 0; repeat < amountRepeat; repeat++) {
        for(var card = 0; card < amountOriginal; card++) {
    
            do {
                place = Math.floor(Math.random() * amountPlace);
            } while(places[place]);
    
            places[place] = [cards[card], true, true];
            
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    for(var row = 0; row < amountRow; row++) {
        for(var col = 0; col < amountCol; col++) {
            if(places[row * amountCol + col][1] == true) {
                ctx.drawImage(places[row * amountCol + col][0], leftCvs + col * (card_W + offset), topCvs + row * (card_H + offset));
    
                if(places[row * amountCol + col][2] == true)
                    ctx.drawImage(shirt, leftCvs + col * (card_W + offset), topCvs + row * (card_H + offset));
            }
        }
    }

    requestAnimationFrame(draw);
}
