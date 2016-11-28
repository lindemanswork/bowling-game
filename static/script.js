//VARIABLES
var totalRounds = 10; //global
var totalBalls = 15; //global
var totalPins = 10; //changes
var totalScore = 0;
var currentMonth = 0;
var myWealth = 0;
var red = "#FF0000";
var lightBlue = "#C3D0DC";
var darkBlue = "#5481C1";
var monthColors = { "SEPT": lightBlue, "OCT": lightBlue, "NOV": lightBlue, "DEC": lightBlue };

var rectangle = makeRectangle("#DFE4EA", '17px', '5px', 0, true); //day & month rectangle
var wealthRect = makeRectangle("#DFE4EA", '25%', '5px', '5px', false);

var currDay = dayBorder(darkBlue, '1') + rectangle + dayBorder(lightBlue, '4') + rectangle + dayBorder(lightBlue, '7') +
    rectangle + dayBorder(lightBlue, '10') + rectangle + dayBorder(lightBlue, '13') + rectangle +
    dayBorder(lightBlue, '16') + rectangle + dayBorder(lightBlue, '19') + rectangle +
    dayBorder(lightBlue, '22') + rectangle + dayBorder(lightBlue, '25') + rectangle + dayBorder(lightBlue, '28');
var currDayString = currDay.toString();

//motivation conditions
var outcomeCondition = "<b>End Goal</b>: Try to make as much money as possible, and earn up to $13.75!";
var processCondition = "<b>Rules of Thumb</b>: (1) 10 first balls; (2) following ball when &ge; 5 pins; (3) when rounds left &le; following balls left, following ball when &ge; 1 pin";
//var walkHomeFirstCondition = true;
var motivationConditionDiv;

//storage variables for data keeping purposes
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

//check if user leaves site, record data if they decide to do so

window.onbeforeunload = function(e) {
    console.log(e);
    var dialogText = 'Dialog text here';
    e.returnValue = dialogText;
    sendDataToBackend();
    return dialogText;
}

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
        setWealthText();
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

function setWealthText(color = darkBlue) {
    wealth.innerHTML = wealthRect + "<span class='wealthText' style='background:" + color + ";'>Wealth: " + myWealth + " Francs</span>" + wealthRect;
}

function firstPayments() {
    var amount_received;
    if (start_15) {
        amount_received = 15;
        myWealth = myWealth + 15;
    } else {
        amount_received = 23;
        myWealth = myWealth + 23;
    }
    var continueAfterBills = document.getElementById('continueAfterBills');
    continueAfterBills.setAttribute('onclick', 'showContinue(1)');

    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "You <span style='color:green;'>receive </span>" + amount_received.toString() + " Francs in income this month";
    setWealthText();
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
    setWealthText();
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
    if (_isPayFirst) {
        firstPayments();
    } else {
        spendFirstIncome();
    }

    rollBall = document.getElementById('rollBall');

    rollBall.onclick = function() {
        RollBall();
    }

    var nextRound = document.getElementById('nextRound');
    nextRound.onclick = function() {
        $("#gameUpdates").html("Next day");
        var gameGUI = document.getElementById("gameGUI");
        gameGUI.innerHTML = '<div id="blankspace"></div><div class="sprite right"></div>'
        if (walkHomeFirstCondition) {
            sprite = document.querySelector('.sprite'),
                key = { left: false, right: false },
                property = getTransformProperty(sprite);
            walkHomeFirst(function() {
                NextRound(isPayFirst);
            });
        } else {
            NextRound(isPayFirst);
        }
    };
}

function payFirst() {
    initPlayGame(true);
}

function spendFirst() {
    //disable play game button
    initPlayGame(false);
}

var numWalks; //clicks of walk home button
var stepsRequired = 10;
var stepsLeftText;

function walkHomeFirst(callback) {
    console.log("walkHomeFirst button called");
    numWalks = 0;

    $("#rollBall").attr("disabled", "disabled");
    $("#rollBall").css('background-color', 'grey');
    $("#nextRound").prop("disabled", "disabled");
    $("#nextRound").hide();
    $("#walkHomeButton").show();
    $("#figure1").show();
    var gameButtons = document.getElementById("gameButtons");
    var gameGUI = document.getElementById("gameGUI");
    //show number of walks
    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "<div id='stepsLeft'>Steps left: " + (stepsRequired - numWalks) + "</div>";
    //walk home button
    var walkHomeButton = document.createElement("button");
    walkHomeButton.id = "walkHomeButton";
    walkHomeButton.innerHTML = "Walk Home";
    gameButtons.appendChild(walkHomeButton);
    $("#gameGUI").append("<img id='house' src='house.png'>");
    walkHomeButton.setAttribute("onclick", "beginWalking(" + callback + ")");
}

function executeAsync(func) {
    setTimeout(func, 0);
}
var oldNumWalks = 0;

function actualWalking() {
    console.log("Actual walking");
    if (oldNumWalks != numWalks) {
        var diff = numWalks - oldNumWalks;
        console.log("Difference between old and new walk: " + diff);
        for (var i = 0; i < diff; i++) {
            var distanceTraveled = $("#gameGUI").width() / (stepsRequired + 1);
            walk(sprite, trans, property);
            setTimeout(function() {

                trans += distanceTraveled;
                console.log("trans: " + trans);
            }, 1900 * diff);

        }
        oldNumWalks = numWalks;
    }
}

function actualWalking_v2() {
    walk(sprite, trans, property);
    setTimeout(function() {
        clickBuildUp = clickBuildUp - 1;
        console.log("decrement clickBuildUp: " + clickBuildUp);
    }, 1900);
}


//self invoking function, maybe this'll work?
/*
(function() {
    setInterval(function() {
        if (shouldBeWalking) {
            console.log("should be walking");
            actualWalking();
            if (numWalks >= stepsRequired) {
                $("#walkHomeButton").prop("disabled", "disabled");
                timeEndWalking = performance.now();
                if (Math.abs(timeEndWalking - timeFirstClickedBeginWalking) >= totalTimeWalkingShouldTake) {
                    console.log("Stop walking!");
                    stopWalking(walkingCallback);
                }
            }
        }
    }, 500);
})();
*/


var i = 0
var shouldBeWalking = false;
//var doneWalking = false;
var walkingCallback = "";
var totalTimeWalkingShouldTake = stepsRequired * 1900;
var timeFirstClickedBeginWalking = 0;
var timeEndWalking = 0;
var clickBuildUp = 0;
var visibleNumWalks = 0;
selfInvokingOkToStart = false;

function beginWalking(callback) {
    walkingCallback = callback
    if (numWalks < stepsRequired) {
        if (visibleNumWalks < stepsRequired) {
            visibleNumWalks++;
        }
        clickBuildUp++;
        var gameUpdates = document.getElementById("gameUpdates");
        gameUpdates.innerHTML = "<div id='stepsLeft'>Steps left: " + (stepsRequired - visibleNumWalks) + "</div>";
        actualWalking_v2();
        selfInvokingOkToStart = true;
        /*
        if (clickBuildUp <= 1) { //ok to move forward
            console.log("Ok to move forward");
            var distanceTraveled = $("#gameGUI").width() / (stepsRequired + 1);
            trans += distanceTraveled;
            console.log("trans: " + trans);
            console.log("Real numwalks: " + numWalks);
            numWalks++;
        }
        */
    } else {
        stopWalking(callback);
    }


    /*
    if (i == 0) {
        timeFirstClickedBeginWalking = performance.now();
    }
    walkingCallback = callback;
    shouldBeWalking = true;
    if (i >= 20) {
        console.log("num times beginWalking has been called: " + i);
    }
    i++;
    $("#nextRound").prop("disabled", true);

    numWalks++;
    //disable the button so that the guy can complete walking
    //$("#walkHomeButton").prop("disabled", true);
    var gameUpdates = document.getElementById("gameUpdates");
    gameUpdates.innerHTML = "<div id='stepsLeft'>Steps left: " + (stepsRequired - numWalks) + "</div>";

    actualWalking();
    stopWalking(callback);
    */

}


(function() {
    setInterval(function() {
        if (selfInvokingOkToStart) {
            console.log("Self invoking");
            if (clickBuildUp <= 1) { //ok to move forward
                console.log("Ok to move forward");
                var distanceTraveled = $("#gameGUI").width() / (stepsRequired + 1);
                trans += distanceTraveled;
                console.log("trans: " + trans);
                console.log("Real numwalks: " + numWalks);
                numWalks++;
                walk(sprite, trans, property);
            }
            stopWalking(walkingCallback);
        }
    }, 500);
})();

function stopWalking(callback) {

    console.log("Time to stop walking");
    if (numWalks >= stepsRequired) {
        console.log("Num walks: " + numWalks);
        console.log("stepsRequired: " + stepsRequired);
        shouldBeWalking = false;
        var walkHomeButton = document.getElementById("walkHomeButton");
        walkHomeButton.setAttribute("onclick", "");
        $("#nextRound").prop("disabled", "disabled");
        $("#walkHomeButton").remove();
        $("#house").hide();
        $(".sprite").hide();

        console.log('END WALKING');
        trans = 0; //reset trans
        //$("#gameUpdates").html("<span style='color:red;font-weight:bold;font-size:30px;'>New day</span>");
        console.log("Ready to show next round button");
        selfInvokingOkToStart = false;
        callback();

    }
}

function tempGreyOutThenEnableButtons() {
    showOnly2Buttons();
    $("#nextRound").css("background-color", "grey");
    setTimeout(function() {
        console.log("in setTimeout of beginWalking");
        $("#gameUpdates").html("");
        $("#rollBall").css('background-color', '');
        $("#nextRound").css("background-color", "");
        enableButtons();
    }, 1000);
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
        document.getElementById("rollBall").disabled = true;

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

    //flash background of wealth box
    setWealthText(red);
    setTimeout(function() {
        setWealthText();
    }, 500);
    /*
    fontFlash(wealth, darkBlue, 'bold', function() {
        wealth.innerHTML = wealthRect + "<span style='background:" + darkBlue + "; padding:5px 8px 5px 8px;'>Wealth: " + myWealth.toString() + " Francs</span>" + wealthRect;
        fontFlash(wealth, 'red', 'bold');
    });
*/
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
    //$('#gameUpdates').html("Roll ball");
    var gameUpdates = document.getElementById("gameUpdates");
    //generate random number of pins knocked down
    var knockedDown = Math.floor((Math.random() * (pinsLeft + 1)));

    flashPins(pinsLeft, knockedDown, function() {
        //console.log("IN CALLBACK");
        //console.log("Knocked down: " + knockedDown);
        if (totalPins >= knockedDown) { //can't knock down more pins than are still standing
            totalPins = totalPins - knockedDown; //update total Pins count
            updateTotalScore(knockedDown);
            updateGUI(totalPins);
        } else { //do it again
            console.log("You did something wrong in your code");
        }
        if (totalPins == 0) {
            gameUpdates.innerHTML = "You've knocked down all the pins, please proceed to the next round";
            document.getElementById("rollBall").disabled = true;
            $("#rollBall").prop("disabled", true);
            $("#nextRound").prop("disabled", false);
            return;
        }

        //show/renable buttons
        setTimeout(function() {
            $('#rollBall').show();
            $('#nextRound').show();
            document.getElementById("rollBall").disabled = false; //jquery doesn't work to enable the button for walkfirstcondition for some reason
            if (!walkHomeFirstCondition) { enableButtons(); }

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
    currDayString = dayBorder(lightBlue, currDay.toString());
    currDayStringRed = dayBorder(lightBlue, currDay.toString());
    for (var j = 1; j <= 10; j++) {
        if (j == 10 - totalRounds) {
            currDay = currDay + 3;
            var tempString = dayBorder(darkBlue, currDay.toString()); //the current day that's a darker blue
            var tempStringRed = dayBorder(red, currDay.toString());
        } else {
            currDay = currDay + 3;
            var tempString = dayBorder(lightBlue, currDay.toString());
            var tempStringRed = dayBorder(lightBlue, currDay.toString());
        }
        if (currDay != 31) {
            currDayString = currDayString + rectangle + tempString;
            currDayStringRed = currDayStringRed + rectangle + tempStringRed;
        }
    }
    $('#day').html(currDayStringRed);
    setTimeout(function() {
        $('#day').html(currDayString);
    }, 500);
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
    console.log("next round clicked")
    var timeHit = timestamp();
    wealthArray.push(myWealth);
    moneyEarnedArray.push(totalScore);
    pinsRemainingArray.push(totalPins);
    choicesArray.push("next");
    timesArray.push(timeHit);

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
        //console.log("in !walkHomeFirstCondition");
    }
    drawPins();
    setCurrentDay();

    //$('#day').html(currDayString);

    if (totalRounds != 0) {
        setTimeout(function() {
            if (!walkHomeFirstCondition) {
                enableButtons();
            } else {
                tempGreyOutThenEnableButtons();
                document.getElementById("rollBall").disabled = false;
            }
        }, 250);
    } else {
        $('#pins').html("");
        $("#rollBall").hide();
        $("#nextRound").hide();
        if (payFirst) {
            gameUpdates.innerHTML = "You have reached 10 games. The month is now over";
            currentMonth = currentMonth + 1;

        } else if (!payFirst) { //spend first option
            gameUpdates.innerHTML = 'You pay 8 Francs for your bowling membership bill';
            myWealth = myWealth - 8;
            setWealthText();
            fontFlash(wealth, "red", "bold", function() {
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
            var current_month = document.getElementById("month");
            if (currentMonth == 1) {
                jsonData["game_1"] = {};
                setUpNewMonth(current_month, "OCT", payFirst);
            } else if (currentMonth == 2) {
                jsonData["game_2"] = {};
                setUpNewMonth(current_month, "NOV", payFirst);
            } else if (currentMonth == 3) {
                jsonData["game_3"] = {};
                setUpNewMonth(current_month, "DEC", payFirst);
            } else if (currentMonth >= 4) {
                gameUpdates.innerHTML = "<b>GAME OVER</b>";
                sendDataToBackend();
                killGame();
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

function setUpNewMonth(currentMonthDiv, monthString, payFirst) {
    //store the data
    monthlyWealth[timestamp()] = myWealth; //store the data
    moneyEarned[timestamp()] = totalScore;

    // prepare this month's color in dictionary
    monthColors[monthString] = red; //red
    currentMonthDiv.innerHTML = createMonthsDivHTML();

    setTimeout(function() {
        monthColors[monthString] = darkBlue;
        currentMonthDiv.innerHTML = createMonthsDivHTML();
    }, 500);

    if (payFirst) {
        firstPayments();
    } else {
        spendFirstIncome();
    }
}

function createMonthDivHTML(monthString, hexColor) {
    return "<span style='background:" + hexColor + ";'>" + monthString + "</span>"
}

function createMonthsDivHTML() {
    var html = "";
    for (var month in monthColors) {
        html = html + " " + createMonthDivHTML(month, monthColors[month]);
    }
    return html;
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
    score.innerHTML = "<font color='red'>Money earned: $" + totalScore.toFixed(2) + "</font>";
    setTimeout(function() {
        score.innerHTML = "Money earned: $" + totalScore.toFixed(2);
    }, 500);
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
    monthColors["SEPT"] = darkBlue;
    month.innerHTML = createMonthsDivHTML();
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

    var gameUpdates = document.createElement("div");
    gameUpdates.id = "gameUpdates";
    middleStuff.appendChild(gameUpdates);

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
    if (walkHomeFirstCondition) {
        nextRound.innerHTML = "Walk Home";
    } else {
        nextRound.innerHTML = "Play another day";
    }
    gameButtons.appendChild(nextRound);

    var continueAfterBills = document.createElement("button");
    continueAfterBills.id = "continueAfterBills";
    continueAfterBills.className = "btn";
    continueAfterBills.innerHTML = "Continue";
    gameButtons.appendChild(continueAfterBills);

    var totalScore = document.createElement("div");
    totalScore.id = "TotalScore";
    totalScore.innerHTML = "Money earned: $0";
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
