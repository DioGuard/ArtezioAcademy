var cvs = document.getElementById("gameScene")
var ctx = cvs.getContext("2d");

var card_W = 160;
var card_H = 240;

var shiftL = 30;
var shiftT = 30;
var offset = 10;

var show = false;

var amountOriginal = 5,
    amountRepeat = 2,
    amountPlace = amountOriginal * amountRepeat;

var amountCol = 5, 
    amountRow = 2;

var places = [];

var pair = [-1, -1];

var delay = 1000;

var shirt = new Image();
shirt.src = "images/memory_card0.png";

initCardPlaces();
draw();

cvs.addEventListener("mousedown", function(e) {

    var rect = this.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
    
        for(var row = 0; row < amountRow; row++) {
            for(var col = 0; col < amountCol; col++) {
                if(x >= shiftL + col * (card_W + offset) && x <= shiftL + (col + 1) * (card_W + offset) 
                && y >= shiftT + row * (card_H + offset) && y <= shiftT + (row + 1) * (card_H + offset)
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
                                console.log("Cards: " + pair[0] + " = " + pair[1]);
                                places[pair[0]][2] = false;
                                places[pair[1]][2] = false;
                                places[pair[0]][1] = false;
                                places[pair[1]][1] = false;
                                console.log(places);
                            } else {
                                places[pair[0]][2] = true;
                                places[pair[1]][2] = true;
                            }

                            pair[0] = -1;
                            pair[1] = -1;
                        }, delay);
                    }
                }
                    
            }
        }
})



function rotateCards() {

}

function initCardPlaces() {
    var cards = [];
    
    for(var i = 1; i <= amountOriginal; i++) {
        var img = new Image();
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
            
            //console.log(places[place][0]);
        }
    }

    console.log(places);
}

function draw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    for(var row = 0; row < amountRow; row++) {
        for(var col = 0; col < amountCol; col++) {
            if(places[row * amountCol + col][1] == true) {
                ctx.drawImage(places[row * amountCol + col][0], shiftL + col * (card_W + offset), shiftT + row * (card_H + offset));
    
                if(places[row * amountCol + col][2] == true)
                    ctx.drawImage(shirt, shiftL + col * (card_W + offset), shiftT + row * (card_H + offset));
            }
        }
    }

    requestAnimationFrame(draw);
}