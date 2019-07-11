//======================================================
// Task 1.0 and 1.1

var total = 0;

for (var i = 10; i <= 20; i++) {
    console.log("i: " + i + "\ti^2: " + (i * i));
    total += i;
}

console.log("\nTotal: " + total); // Task 1.2

//======================================================

function buttonClick() {
    var x1 = parseInt(document.getElementById('x1').value);
    var x2 = parseInt(document.getElementById('x2').value);
    
    if(document.getElementById('x1').value == "" || document.getElementById('x2').value == "") {
        alert("Поля x1 и x2 должны быть заполнены."); // Task 2.2
    
    } else if(Number.isNaN(x1) || Number.isNaN(x2)) {
        alert("В полях x1 и x2 должны быть введены числовые значения."); // Task 2.0
        
    } else {
        var resultDiv = document.getElementById('result');
        var mode = document.getElementsByName('fun'); // Task 2.5
        
        // Task 2.1
        CleanOutput();
        
        resultDiv.append(mathAction(x1, x2, mode));
    }
}

function CleanOutput() {
    document.getElementById('result').innerHTML = "";
}
// Task 2.4
function CleanInput() {
    document.getElementById('x1').value = "";
    document.getElementById('x2').value = "";
}

function mathAction(x1, x2, mode) {
    
    for(var i = 0; i < mode.length; i++) {
        if(mode[i].type == "radio" && mode[i].checked) {
            
            switch(mode[i].value) {
                case "add": 
                    return "x1 + x2 = " + (x1 + x2);
                case "addRange": // Task 2.3
                    var total = 0;
                    for(var j = x1; j <= x2; j++)
                        total += j;
                    return "СУММ(" + x1 + ":" + x2 + ") = " + total;
                case 'multiplyRange':
                    var total = 1;
                    for(var j = x1; j <= x2; j++)
                        total *= j;
                    return "ПРОИЗВ(" + x1 + ":" + x2 + ") = " + total;
                case 'simpleNumbers': // Task 2.6
                    var total = "";
                    
                    notSimple:
                    for(var j = x1; j <= x2; j++) {
                        
                        for(var k = 2; k < j; k++)
                            if(j % k == 0)
                                continue notSimple;
                        
                        total += "\t" + j;
                    }
            }
        }
    }
}