//VARIABLES
var totalRounds = 10; //global
var totalBalls = 15; //global
var totalPins = 10; //changes
var totalScore = 0;
var currentMonth = 0;
var myWealth = 0;

var rectangle = makeRectangle("#DFE4EA", '17px', '5px', 0, true); //day & month rectangle
var wealthRect = makeRectangle("#DFE4EA", '25%', '5px', '5px', false);

var currDay = dayBorder('#5481C1', '1') + rectangle + dayBorder('#C3D0DC', '4') + rectangle + dayBorder('#C3D0DC', '7') +
    rectangle + dayBorder('#C3D0DC', '10') + rectangle + dayBorder('#C3D0DC', '13') + rectangle +
    dayBorder('#C3D0DC', '16') + rectangle + dayBorder('#C3D0DC', '19') + rectangle +
    dayBorder('#C3D0DC', '22') + rectangle + dayBorder('#C3D0DC', '25') + rectangle + dayBorder('#C3D0DC', '28');
var currDayString = currDay.toString();

//motivation conditions
var outcomeCondition = "<b>End Goal</b>: Try to make as much money as possible, and earn up to $13.75!";
var processCondition = "<b>Rules of Thumb</b>: (1) 10 first balls; (2) following ball when &ge; 5 pins; (3) when rounds left &le; following balls left, following ball when &ge; 1 pin";
//var walkHomeFirstCondition = true;
var motivationConditionDiv;

//storage variables for data keeping purposes
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var monthlyWealth = {};
var moneyEarned = {};
var option = "";
var name = "No name";
var IPaddress = "";
var jsonData = {}; //json Data to return 
var uniqueCodeSent;

var commaSepString = "";
var sep = ";";
recordIPAddressData(); //get IP address for each game played

commaSepString = commaSepString + sep + cah_url; //HERE NEED TO UPDATE STRING 9/4

jsonData["start_game"] = timestamp();
jsonData["game_0"] = {};

var margin = {
        top: 50,
        right: 100,
        bottom: 200,
        left: 100
    },
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

function recordIPAddressData() {
    $.getJSON('https://api.ipify.org?format=json', function(data) {
        var IPaddress = data["ip"];
        jsonData["ip"] = IPaddress;
        commaSepString = IPaddress + commaSepString; //add IP address to string to return
    });

}

function setMotivationCondition(conditionString) {
    if (motivationConditions) {
        motivationConditionDiv = document.getElementById("motivationConditions");
        motivationConditionDiv.innerHTML = conditionString;
    }
}

function makeRectangle(color, leftpadding, toppadding, botpadding = 0, inlineBlock) {
    if (inlineBlock) {
        var rect = "<span style='padding-left:" + leftpadding + "; padding-top:" + toppadding + ";padding-bottom:" + botpadding + "; background:" + color + "; display: inline-block;height: 10px;'></span>";
        return rect;
    } else {
        var rect = "<span style='padding-left:" + leftpadding + "; padding-top:" + toppadding + ";padding-bottom:" + botpadding + "; background:" + color + ";height: 10px;'></span>";
        return rect;
    }
}

function dayBorder(color, number) {
    var dayBorder = "<span style='background:" + color + "; padding:5px 8px 5px 8px;'>" + number + "</span>";
    return dayBorder;
}

/*------------get info from form-------------*/
function searchKeyPress(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById('btnGo').click();
        return false;
    }
    return true;
}

function submitData() {
    name = document.getElementById("name").value;

    document.getElementById("name").value = "Successfully submitted";

    console.log(name);

}


function getData() {
    var form = document.getElementById("personalInfo");
    var getdata = document.createElement("input");
    getdata.id = "getData";
    getdata.type = "button";
    getdata.value = "Get data";
    getdata.setAttribute("onclick", "returnData()");
    form.appendChild(getdata);
}

/*---------------------------------------FUNCTIONS--------------------------------------*/

function timestamp() {
    var d = new Date();
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = hr < 12 ? "am" : "pm";
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    var seconds = d.getSeconds();

    var timestamp = day + " " + hr + ":" + min + ":" + seconds + ampm + " " + date + " " + month + " " + year;

    return timestamp;
}


//format money
function format2(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function fontFlash(targetText, color, fontWeight, callback) {
    targetText.style.color = color;
    targetText.style.fontWeight = fontWeight;


    setTimeout(function() {
        targetText.style.color = "white";
        targetText.style.fontWeight = "normal";
        if (callback) {
            callback();
        }
    }, 250);

}

function popitup(url) {
    newwindow = window.open(url, 'name', 'height=200,width=150');
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}


function showButtons() {
    $("#pins").remove();
    drawPins();
    $('#rollBall').show();
    $('#nextRound').show();
    $('#continueAfterBills').hide();
}

function showContinue(round) {
    $("#continueAfterBills").hide();

    console.log("In showContinue");
    var gameUpdates = document.getElementById("gameUpdates");

    if (round == 1 && !start_15) {
        myWealth = myWealth - 8;
        wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
        fontFlash(wealth, "red", "bold", function() {
            gameUpdates.innerHTML = 'You <span style="color:red;"">pay</span> 8 Francs for your bowling membership bill';
            var continueAfterBills = document.getElementById('continueAfterBills');
            continueAfterBills.setAttribute('onclick', 'showContinue(2)');
            $('#continueAfterBills').show();
        });
    } else if (round == 2 || start_15) {
        gameUpdates.innerHTML = "You may begin.";
        var continueAfterBills = document.getElementById('continueAfterBills');
        continueAfterBills.setAttribute('onclick', 'showButtons()');
        $('#continueAfterBills').show();
    }
}

function firstPayments() {
    if (start_15) {
        myWealth = myWealth + 15;
    } else {
        myWealth = myWealth + 23;
    }
    var continueAfterBills = document.getElementById('continueAfterBills');
    continueAfterBills.setAttribute('onclick', 'showContinue(1)');

    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "You <span style='color:green;'>receive </span>" + myWealth.toString() + " Francs in income this month";
    wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
    fontFlash(wealth, "green", "bold", function() {
        $('#continueAfterBills').show();
    });

}


function spendFirstIncome() {
    var continueAfterBills = document.getElementById('continueAfterBills');
    continueAfterBills.setAttribute('onclick', 'showButtons()');
    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "You receive 23 Francs in income this month";

    //createCustomAlert("You receive 23 Francs in income this month");
    myWealth = myWealth + 23;
    wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
    fontFlash(wealth, "green", "bold", function() {
        $('#continueAfterBills').show();
    });


}

var isPayFirst;
var sprite;
var trans = 0;

var rollBall;

function initPlayGame(_isPayFirst) {
    isPayFirst = _isPayFirst;
    document.getElementById("playGame").disabled = true;
    setMotivationCondition(processCondition);
    if (isPayFirst) {
        option = "pay first";
    } else {
        option = "spend first";
    }
    //createUniqueCode(function() {
    //option = option;
    jsonData["condition"] = option;
    commaSepString = commaSepString + sep + option; //ADD THE DATA

    console.log("commaSepString" + commaSepString);

    createInitialDivs();
    firstPayments();

    rollBall = document.getElementById('rollBall');

    rollBall.onclick = function() {
        RollBall();
    }

    var nextRound = document.getElementById('nextRound');
    nextRound.onclick = function() {
        $("#gameUpdates").empty();
        var gameGUI = document.getElementById("gameGUI");
        gameGUI.innerHTML = '<div class="sprite right"></div>'
        if (walkHomeFirstCondition) {
            sprite = document.querySelector('.sprite'),
                key = { left: false, right: false },
                property = getTransformProperty(sprite);
            walkHomeFirst(function() {
                console.log(isPayFirst);
                NextRound(isPayFirst);
            });
        } else {
            NextRound(isPayFirst);
        }
    };
    //});
}

function payFirst() {
    initPlayGame(true);
}

function spendFirst() {
    //disable play game button
    initPlayGame(false);
}

var numWalks;
var stepsRequired = 10;
var stepsLeftText;

function walkHomeFirst(callback) {
    numWalks = 0;
    $("#rollBall").hide();
    $("#nextRound").hide();
    $("#walkHomeButton").show();
    $("#figure1").show();
    var gameButtons = document.getElementById("gameButtons");
    var gameGUI = document.getElementById("gameGUI");

    //gameGUI.innerHTML = '<div class="sprite right"></div>'
    /*
    gameGUI.innerHTML = '<div id="figure1" class="stick" style="top:300px;">' +
        '<div class="head">You</div>' +
        '<div class="body"></div>' +
        '<div class="lefthand part"><div></div></div>' +
        '<div class="righthand part"><div></div></div>' +
        '<div class="leftfoot part"><div></div></div>' +
        '<div class="rightfoot part"><div></div></div>' +
        '</div>';
    */

    //show number of walks
    stepsLeftText = document.createElement("div");
    stepsLeftText.id = "stepsLeft";
    stepsLeftText.innerHTML = "Steps left: " + (stepsRequired - numWalks);
    gameGUI.appendChild(stepsLeftText);

    //walk home button
    var walkHomeButton = document.createElement("button");
    walkHomeButton.id = "walkHomeButton";
    walkHomeButton.innerHTML = "Walk Home";
    gameButtons.appendChild(walkHomeButton);
    walkHomeButton.setAttribute("onclick", "beginWalking(" /* + numWalks + "," */ + callback + ")");


}

function beginWalking( /*numWalks, */ callback) {
    //$(document).ready(function() {
    /*
    var sprite = document.querySelector('.sprite'),
        key = { left: false, right: false },
        trans = 0,
        property = getTransformProperty(sprite);
    */
    console.log("trans: " + trans.toString());
    console.log("property: " + property.toString());
    walk(sprite, trans, property);
    trans += 10;
    numWalks++;
    stepsLeftText.innerHTML = "Steps left: " + (stepsRequired - numWalks);
    //var figure1 = $('#figure1').stick();
    //figure1.walk(1);
    setTimeout(function() {
        stop(sprite);
    }, 1000);
    if (numWalks >= stepsRequired) {
        $("#walkHomeButton").remove();
        $(".sprite").remove();
        callback();
    }
    //});
}


function createUniqueCode(callback) {
    var code = document.getElementById("uniqueCode");
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Your unique code");
    input.setAttribute("class", "focus");
    input.id = "uniqueCodeID";
    var button = document.createElement("input");
    button.id = "uniquecodebutton";
    button.setAttribute("type", "button");
    button.setAttribute("value", "Go");
    button.setAttribute("onclick", "getUniqueCode(" + callback + ")");
    code.appendChild(input);
    code.appendChild(button);

}

function getUniqueCode(callback) {
    var initialDivs = document.getElementById("initial");
    var button = document.getElementById("uniquecodebutton");
    var input = document.getElementById("uniqueCodeID");
    var uniqueCode = input.value;
    jsonData["unique_code"] = uniqueCode;

    commaSepString = commaSepString + sep + uniqueCode;
    if (uniqueCode) {
        initial.parentNode.removeChild(initial);
        callback();
    }

}

function drawPins() { //currently just circles
    var gameGUI = document.getElementById("gameGUI");
    if (document.getElementById("pins") == null) {
        var pins = document.createElement("div");
        pins.id = "pins";
        gameGUI.appendChild(pins);
        var pinsRow1 = document.createElement("div");
        pinsRow1.id = "pinsRow1";
        var pinsRow2 = document.createElement("div");
        pinsRow2.id = "pinsRow2";
        pins.appendChild(pinsRow1);
        pins.appendChild(pinsRow2);
    } else {
        var pinsRow1 = document.getElementById("pinsRow1");
        var pinsRow2 = document.getElementById("pinsRow2");
    }

    for (var i = 0; i < 5; i++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.src = "bowling_pin_solid.png";
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + i.toString();
        bowlingPin.className = "bowlingPins";

        pinsRow1.appendChild(bowlingPin);
    }

    for (var j = 0; j < 5; j++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.src = "bowling_pin_solid.png";
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + (j + 5).toString();
        bowlingPin.className = "bowlingPins";

        pinsRow2.appendChild(bowlingPin);
    }

}

var wealthArray = [];
var moneyEarnedArray = [];
var pinsRemainingArray = [];
var choicesArray = [];
var timesArray = [];

function RollBall() {
    console.log("cuurent month: " + currentMonth.toString());
    var timeHit = timestamp();
    //hide and disable the button
    if (!walkHomeFirstCondition) {
        disableButtons();
    } else {
        document.getElementById("rollBall").disabled=true;

    }
    //$('#rollBall').hide();
    //$('#nextRound').hide();

    var gameUpdates = document.getElementById("gameUpdates");
    if (myWealth <= -15) {
        gameUpdates.innerHTML = "DEBT CAN'T BE MORE THAN 15 FRANCS. Please proceed to next round";
        //$('#rollBall').prop("disabled",true);
        $('#nextRound').prop("disabled", false);
        //$('#nextRound').show();
        return;

    }
    if (currentMonth == 3 && myWealth <= 8) {
        gameUpdates.innerHTML = "You cannot go into debt in the last month. Please proceed to next round";
        //$('#nextRound').show();
        $('#nextRound').prop("disabled", false);
        return;
    }

    //update balls left
    myWealth = myWealth - 1;
    fontFlash(wealth, 'darkblue', 'bold', function() {
        wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth.toString() + " Francs</span>" + wealthRect;
        fontFlash(wealth, 'red', 'bold');
    });

    var remainingPins = generatePinsKnockedDown(totalPins);
    //record data
    wealthArray.push(myWealth);
    moneyEarnedArray.push(totalScore);
    pinsRemainingArray.push(remainingPins);
    choicesArray.push("throw");
    timesArray.push(timeHit);

}

/**
 * returns an array of integers of the starting to ending pins (as pin ids are labeled by number)
 * so all the pins in this array need to be knocked down in the blink function
 */
function createList(start, end, start1, end1, callback) {
    var ints = [];
    for (var i = start; i < end; i++) {
        //console.log(i);
        ints.push(i);
    }

    if (start1 != 0 && end1 !== 0) {

        for (var j = start1; j < end1; j++) {
            console.log(j);
            ints.push(j);
        }
    }
    callback(ints);
}

var allpins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * creates blinks such that it blinks all the pins at once, that takes a pin away and blinks that until
 * it goes through all the options
 */
function blink(start, end, start1 = 0, end1 = 0, knockedDown, callback = function() {}) {
    createList(start, end, start1, end1, function(ints) {
        var originalInts = ints;
        ints.reverse();
        setBlinkInIntervalWithRep(ints, originalInts, knockedDown, callback);
    })
}

function setBlinkInInterval(ints, callback) {
    var tempArr = [];
    var interval = setInterval(function() {
        if (ints.length == 0) {
            clearInterval(interval);
            setTimeout(function() {
                callback();
            }, 50);
        }

        tempArr.push(ints.pop());
        console.log("temparr:");
        console.log(tempArr);
        performBlink(tempArr);

    }, 70);
}

function setPinsBackToNormal() {

}

//also blink to the number of knocked down pins
function setBlinkInIntervalWithRep(ints, originalInts, knockedDown, callback) {
    var original = originalInts.slice();
    var tempArr = [];
    var interval = setInterval(function() {
        if (ints.length == 0) {
            clearInterval(interval);
            setTimeout(function() {

                //console.log("Update GUI pins left: "+ original[0].toString());
                var newArr = addKnockedDownPinsToArr(original, knockedDown);
                updateGUI(original.length); //CHANGE THE 10 TO THE NUM OF PINS CURRENTLY KNOCKED DOWN

                //console.log("Pins left to keep grey: "+newArr.reverse()[0].toString());
                newArr.shift();
                console.log("newArr: ");
                console.log(newArr);
                setBlinkInInterval(newArr, callback);
            }, 50);
        }
        tempArr.push(ints.pop());
        performBlink(tempArr);

    }, 50);
}

function addKnockedDownPinsToArr(originalInts, knockedDown) {
    originalInts.reverse();
    var knockedDownPinsArr = new Array();
    var startPin = originalInts[0];
    knockedDownPinsArr.push(startPin);
    for (var i = 1; i <= knockedDown; i++) {
        knockedDownPinsArr.push(startPin + i);
    }

    return knockedDownPinsArr.reverse();
}


//I think there's something wrong with this function that's causing the animation bug 9/9/16 come back later
function performBlink(tempArr) {
    for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i] == 10) {} else {
            var bowlingPin = document.getElementById('bowlingPin_' + tempArr[i].toString());
            bowlingPin.src = "bowling_pin_transparent.png";
        }
    }
    //uncomment below to get flashing back
    /*
    setTimeout(function() {
        for (var j = 0; j < tempArr.length; j++) {
            //document.getElementById("bowlingPin_" + i.toString()).style.visibility = 'hidden';
            var bowlingPin = document.getElementById('bowlingPin_' + tempArr[j].toString());
            bowlingPin.src = "bowling_pin_solid.png";
        }
    }, 30);
    */
}


function flashPins(pinsLeft, knockedDown, callback) {
    //drawPins();
    if (pinsLeft > 5 && pinsLeft != 10) {
        //console.log("Pins left greater than 5");
        blink(10 - pinsLeft, 5, 5, 10, knockedDown, function() {
            callback();
        });
    } else if (pinsLeft < 5) {
        // console.log("Pins left less than 5");
        blink(10 - pinsLeft, 10, 0, 0, knockedDown, function() {
            callback();
        });
    } else if (pinsLeft == 5) {
        blink(5, 10, 0, 0, knockedDown, function() {
            callback();
        });
    } else if (pinsLeft == 10) {
        blink(0, 10, 0, 0, knockedDown, function() {
            //console.log("IN CALLBACK IN FLASHPINS");
            callback();
        });
    }
}

//returns number of pins knocked down
function generatePinsKnockedDown(pinsLeft) {
    var gameUpdates = document.getElementById("gameUpdates");
    //generate random number of pins knocked down
    var knockedDown = Math.floor((Math.random() * (pinsLeft + 1)));

    flashPins(pinsLeft, knockedDown, function() {
        //console.log("IN CALLBACK");
        //console.log("Knocked down: " + knockedDown);
        if (totalPins >= knockedDown) { //can't knock down more pins than are still standing
            totalPins = totalPins - knockedDown; //update total Pins count
            //console.log("Pins left: " + totalPins);

            updateTotalScore(knockedDown);
            updateGUI(totalPins);
        } else { //do it again
            console.log("You did something wrong in your code");
        }
        if (totalPins == 0) {
            gameUpdates.innerHTML = "You've knocked down all the pins, please proceed to the next round";
            document.getElementById("rollBall").disabled=true;
            $("#rollBall").prop("disabled", true);
            $("#nextRound").prop("disabled", false);
            return;

        }

        //show/renable buttons
        setTimeout(function() {
            $('#rollBall').show();
            $('#nextRound').show();
            document.getElementById("rollBall").disabled=false; //jquery doesn't work to enable the button for walkfirstcondition for some reason
            if (!walkHomeFirstCondition) { enableButtons(); }
            $('#gameUpdates').html("");
        }, 250);
    });

    return totalPins;

}

function recordArraysData() {
    //record data
    commaSepString = commaSepString + sep + "[" + wealthArray.toString() + "]";
    commaSepString = commaSepString + sep + "[" + moneyEarnedArray.toString() + "]";
    commaSepString = commaSepString + sep + "[" + pinsRemainingArray.toString() + "]";
    commaSepString = commaSepString + sep + "[" + choicesArray.toString() + "]";
    commaSepString = commaSepString + sep + "[" + timesArray.toString() + "]";
    console.log(commaSepString);

    //reset the arrays for next round
    wealthArray = [];
    moneyEarnedArray = [];
    pinsRemainingArray = [];
    choicesArray = [];
    timesArray = [];
}

function setCurrentDay() {
    //set current day
    currDay = 1;
    currDayString = dayBorder('#C3D0DC', currDay.toString());
    for (var j = 1; j <= 10; j++) {
        if (j == 10 - totalRounds) {
            currDay = currDay + 3;
            var tempString = dayBorder('#5481C1', currDay.toString());
        } else {
            currDay = currDay + 3;
            var tempString = dayBorder('#C3D0DC', currDay.toString());
        }
        console.log("currDay string: " + currDay.toString());
        if (currDay != 31) {
            currDayString = currDayString + rectangle + tempString;
        }
    }
}
var gameUpdates;

function showOnly2Buttons() {
    $('#nextRound').show();
    $('#rollBall').show();
}

function enableButtons() {
    $('#nextRound').prop("disabled", false);
    $('#rollBall').prop("disabled", false);
}

function disableButtons() {
    $('#nextRound').prop("disabled", true);
    $('#rollBall').prop("disabled", true);
}

function NextRound(payFirst) {
    var timeHit = timestamp();
    wealthArray.push(myWealth);
    moneyEarnedArray.push(totalScore);
    pinsRemainingArray.push(totalPins);
    choicesArray.push("next");
    timesArray.push(timeHit);

    //$('#rollBall').hide();
    //$('#nextRound').hide();

    var gameUpdates = document.getElementById("gameUpdates");
    totalRounds = totalRounds - 1;
    totalPins = 10; //reset total number of pins

    recordArraysData();
    //reset GUI
    circlePositions = [];
    for (var i = 0; i < 10; i++) {
        circlePositions.push(i);
    }

    if (!walkHomeFirstCondition) {
        console.log("in !walkHomeFirstCondition");
        //console.log(document.getElementById("pins"));
        //document.getElementById("pins").remove();
    }
    drawPins();
    setCurrentDay();

    $('#day').html(currDayString);

    if (totalRounds != 0) {
        setTimeout(function() {
            if (!walkHomeFirstCondition) {
                enableButtons();
            } else {
                showOnly2Buttons();
                document.getElementById("rollBall").disabled=false;
            }
        }, 250);
    } else {
        $('#pins').hide();
        //out of rounds for the month
        if (payFirst) {
            //createCustomAlert("You have reached 10 games. The month is now over");
            gameUpdates.innerHTML = "You have reached 10 games. The month is now over";
            console.log(myWealth);

            currentMonth = currentMonth + 1;

        } else if (!payFirst) { //spend first option
            gameUpdates.innerHTML = 'You pay 8 Francs for your bowling membership bill';
            myWealth = myWealth - 8;
            wealth.innerHTML = wealthRect + "<span style='background:#5481C1; padding:5px 8px 5px 8px;'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
            fontFlash(wealth, "red", "bold", function() {
                //createCustomAlert("You have reached 10 games. The month is now over");
                gameUpdates.innerHTML = "You have reached 10 games. The month is now over";

                currentMonth = currentMonth + 1;

            });
        }
    }

    if (totalRounds == 0) {

        NextMonthButton();
        $("#nextMonth").click(function() {
            //reset to months
            totalRounds = 10;
            setCurrentDay();
            $('#day').html(currDayString);


            var current_month = document.getElementById("month");

            console.log(currentMonth);
            if (currentMonth == 1) {
                jsonData["game_1"] = {};
                monthlyWealth[timestamp()] = myWealth; //store the data
                moneyEarned[timestamp()] = totalScore;


                current_month.innerHTML = "<span style='background:#C3D0DC;'>SEPT</span> <span style='background:#5481C1;'>OCT</span> <span style='background:#C3D0DC;'>NOV</span> <span style='background:#C3D0DC;'>DEC</span>";
                if (payFirst) {
                    firstPayments();
                } else {
                    spendFirstIncome();
                }
            } else if (currentMonth == 2) {
                jsonData["game_2"] = {};
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;
                current_month.innerHTML = "<span style='background:#C3D0DC;'>SEPT</span> <span style='background:#C3D0DC;'>OCT</span> <span style='background:#5481C1;'>NOV</span> <span style='background:#C3D0DC;'>DEC</span>";
                if (payFirst) {
                    firstPayments();
                } else {
                    spendFirstIncome();
                };
            } else if (currentMonth == 3) {
                jsonData["game_3"] = {};
                monthlyWealth[timestamp()] = myWealth;
                moneyEarned[timestamp()] = totalScore;
                current_month.innerHTML = "<span style='background:#C3D0DC;'>SEPT</span> <span style='background:#C3D0DC;'>OCT</span> <span style='background:#C3D0DC;'>NOV</span> <span style='background:#5481C1;'>DEC</span>";
                if (payFirst) {
                    firstPayments();
                } else {
                    spendFirstIncome();
                };
            } else if (currentMonth >= 4) {
                //createCustomAlert("GAME OVER");
                gameUpdates.innerHTML = "<b>GAME OVER</b>";
                sendDataToBackend();
                killGame();
                //getData();

            }

            //reset total balls and rounds
            totalBalls = 15;

            $("#nextMonth").remove();

            setTimeout(function() {
                $('#pins').show();
            }, 1700);


        });

    }
}

function sendDataToBackend() {
    $.ajax({
        type: 'GET', // added,
        url: '/sendDataToBackend',
        data: commaSepString,
        contentType: "application/json; charset=utf-8",
        //jsonpCallback: 'callback' - removed
        success: function(data) {
            console.log("success on client side");
        }
    });
}

function updateTotalScore(knockedDown) {
    totalScore = totalScore + knockedDown * .05;
    var score = document.getElementById("TotalScore");
    score.innerHTML = "Money earned: $" + totalScore.toFixed(2);
    //"Money earned: " + format2(totalScore / 100.0, "$");
    fontFlash(score, 'green', 'bold');
}


function updateGUI(pinsLeft) {

    var gameGUI = document.getElementById("gameGUI");
    $("#pinsRow1").empty();
    $("#pinsRow2").empty();
    var pinsRow1 = document.getElementById("pinsRow1");
    var pinsRow2 = document.getElementById("pinsRow2");

    //create all the pin divs and their ids
    for (var a = 0; a < 5; a++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + a.toString();
        bowlingPin.className = "bowlingPins";
        pinsRow1.appendChild(bowlingPin);
    }

    for (var b = 0; b < 5; b++) {
        var bowlingPin = document.createElement("img");
        bowlingPin.style = "width:25px;height:60px";
        bowlingPin.id = "bowlingPin_" + (b + 5).toString();
        bowlingPin.className = "bowlingPins";
        pinsRow2.appendChild(bowlingPin);
    }

    if (pinsLeft >= 5) {
        var knockedOver = 10 - pinsLeft;

        //if number of knocked down pins is less than 5
        for (var j = knockedOver; j < 5; j++) {
            var bowlingPin = document.getElementById('bowlingPin_' + j.toString());
            bowlingPin.src = "bowling_pin_solid.png";
        }

        for (var k = 5; k < 10; k++) {
            var bowlingPin = document.getElementById('bowlingPin_' + k.toString());
            bowlingPin.src = "bowling_pin_solid.png";
        }

        //knocked down pins
        for (var i = 0; i < knockedOver; i++) {
            var bowlingPinGrey = document.getElementById("bowlingPin_" + i.toString());
            bowlingPinGrey.src = "bowling_pin_transparent.png";
        }

    } else { //if number of pinsleft is less than 5, knocked over pins greater than 5
        var knockedOver = 10 - pinsLeft;
        for (var i = 0; i < 5; i++) {
            var bowlingPinGrey = document.getElementById("bowlingPin_" + i.toString());
            bowlingPinGrey.src = "bowling_pin_transparent.png";
        }

        for (var j = 5; j < knockedOver; j++) {
            //console.log("bowlingPin_" + j.toString());
            var bowlingPinGrey = document.getElementById("bowlingPin_" + j.toString());
            bowlingPinGrey.src = "bowling_pin_transparent.png";

        }

        for (var k = knockedOver; k < 10; k++) {
            var bowlingPin = document.getElementById("bowlingPin_" + k.toString());
            bowlingPin.src = "bowling_pin_solid.png";
        }
    }
}



//--------------------------------------------------
function NextMonthButton() {
    var nextMonth = document.createElement("button");
    nextMonth.id = "nextMonth";
    nextMonth.className = "btn";
    nextMonth.innerHTML = "Next month";
    $("#gameButtons").append(nextMonth);
}

function createInitialDivs() {
    commaSepString = commaSepString + sep + jsonData["start_game"]; //add time in which page is open to string of data to send

    var game = document.getElementById("game");
    var upperStuff = document.getElementById("upperStuff");

    var updateArea = document.createElement("div");
    updateArea.id = "updateArea";
    upperStuff.appendChild(updateArea);

    var month = document.createElement("div");
    month.id = "month";
    month.innerHTML = "<span style='background:#5481C1;'>SEPT</span> <span style='background:#C3D0DC;'>OCT</span> <span style='background:#C3D0DC;'>NOV</span> <span style='background:#C3D0DC;'>DEC</span>";
    updateArea.appendChild(month);

    var day = document.createElement("div");
    day.id = "day";
    day.innerHTML = currDayString;
    updateArea.appendChild(day);

    wealth = document.createElement("div");
    wealth.id = "wealth";
    wealth.innerHTML = "Wealth: ";
    updateArea.appendChild(wealth);

    var middleStuff = document.createElement("div");
    middleStuff.id = "middleStuff"
    game.appendChild(middleStuff);

    //middleStuff.appendChild(document.getElementById("gameGUI"));

    var gameUpdates = document.createElement("div");
    gameUpdates.id = "gameUpdates";
    middleStuff.appendChild(gameUpdates);

    var roundsleft = document.createElement("div");
    roundsleft.id = "RoundsLeft";
    middleStuff.appendChild(roundsleft);

    var ballsleft = document.createElement("div");
    ballsleft.id = "BallsLeft";
    middleStuff.appendChild(ballsleft);

    var gameButtons = document.createElement("div")
    gameButtons.id = "gameButtons";
    middleStuff.appendChild(gameButtons);

    var rollBall = document.createElement("button");
    rollBall.id = "rollBall";
    rollBall.className = "btn";
    rollBall.innerHTML = 'Throw ball'
    gameButtons.appendChild(rollBall);

    var nextRound = document.createElement("button");
    nextRound.id = "nextRound";
    nextRound.className = "btn";
    nextRound.innerHTML = "Play another day";
    gameButtons.appendChild(nextRound);

    var continueAfterBills = document.createElement("button");
    continueAfterBills.id = "continueAfterBills";
    continueAfterBills.className = "btn";
    continueAfterBills.innerHTML = "Continue";
    gameButtons.appendChild(continueAfterBills);

    var totalScore = document.createElement("div");
    totalScore.id = "TotalScore";
    totalScore.innerHTML = "Money earned: ";
    game.appendChild(totalScore);


    $('#rollBall').hide();
    $('#nextRound').hide();
    $('#continueAfterBills').hide();

}

function killGame() {
    $(":button").on('click', function() {
        $(this).prop("disabled", true);
    })
}
/*------------------Write results---------------------*/
function createFile(text) {

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(text);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'bowlingInfo.txt';
    hiddenElement.click();

}

function writeEmail() {
    var addresses = "spothorse9.lucy@gmail.com"; //between the speech mark goes the receptient. Seperate addresses with a ;
    var body = option + ":" + JSON.stringify(monthlyWealth) + JSON.stringify(moneyEarned) //write the message text between the speech marks or put a variable in the place of the speech marks
    var subject = "Bowling game results" //between the speech marks goes the subject of the message
    var href = "mailto:" + addresses + "?" + "subject=" + subject + "&" + "body=" + body;
    var wndMail;
    wndMail = window.open(href, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
    if (wndMail) {
        wndMail.close();
    }
}

function testEmail() {
    var addresses = "spothorse9.lucy@gmail.com"; //between the speech mark goes the receptient. Seperate addresses with a ;
    var body = "HIHIHI" //write the message text between the speech marks or put a variable in the place of the speech marks
    var subject = "Bowling game results" //between the speech marks goes the subject of the message
    var href = "mailto:" + addresses + "?" + "subject=" + subject + "&" + "body=" + body;
    var wndMail;
    wndMail = window.open(href, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
    console.log("in testing email");
    if (wndMail) {
        wndMail.close();
    }
}

//testEmail();
/*---------------------Custom alert box------------------------*/
var ALERT_TITLE = "Wealth update!";
var ALERT_BUTTON_TEXT = "Ok";

function createCustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() {
        removeCustomAlert();
        return false;
    }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
