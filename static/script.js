// For coffee calculator

const Calculator = {
    listenToButtons: function() {
        let gridElements = document.getElementsByClassName('iteractive-item');
        // Adds listeners to + and - buttons to change values of calculator
        Array.from(gridElements).forEach(element => {
            let minus = element.getElementsByClassName('minus');
            let plus = element.getElementsByClassName('plus');
            let display = element.getElementsByClassName('display-data');
            // Adds click event to each minus button
            minus[0].addEventListener('click', () => {
                // String value of value display
                let displayedNumber = display[0].innerHTML;
                // Limits displayable number to 0 or greater
                // If display number is at least 1, subtract. Otherwise, do nothing
                if (Calculator.checkIfNumberIsValid(parseInt(displayedNumber), 1) === true) {
                    display[0].innerHTML = parseInt(displayedNumber) - 1;
                    Calculator.checkElementType(minus[0]);
                }
                return;
            })
            // Adds click event to each plus button
            plus[0].addEventListener('click', () => {
                let newValue = parseInt(display[0].innerHTML) + 1;
                display[0].innerHTML = newValue;
                Calculator.checkElementType(plus[0]);

            })
        })

        let iteractiveButtons = document.getElementsByClassName('control-button');
        Array.from(iteractiveButtons).forEach(button => {
            function hover() {
                // Gets background-color property of grandfather element .grid-item
                let grandfatherColor = window.getComputedStyle(button.parentNode.parentNode).getPropertyValue('background-color');
                button.style.color = grandfatherColor;
            }

            function darkenBackground() {
                button.style.color = 'black';
            }
            // Turns text inside button to the same color as grandfather element
            button.onmouseenter= () => {
                // Gets background-color property of grandfather element .grid-item
                let grandfatherColor = window.getComputedStyle(button.parentNode.parentNode).getPropertyValue('background-color');
                button.style.color = grandfatherColor;
            }
            // When mouse is out of element, text of button turn black
            button.onmouseleave = darkenBackground;
            button.onclick = darkenBackground;
        })
    },
    checkIfNumberIsValid: function(number, min) {
        if (number < min) {
            return false
        }
        return true;
    },
    // Calculate values depending on which element the +- buttons were pressed
    checkElementType: function(element) {
        let values = Calculator.getValues();
        let name = element.getAttribute('name');
        switch(name) {
            case "grounds":
                Calculator.startFromGrounds(values.grounds, values.ratio);
                break;
            case "water":
                Calculator.startFromWater(values.water, values.ratio);
                break;
            case "ratio":
                Calculator.startFromGrounds(values.grounds, values.ratio);
                break;
        }
    },
    // Gets values from display elements
    getValues: function() {
        let ratioValue = parseInt(document.getElementById('ratio').innerHTML);
        let waterValue = parseInt(document.getElementById('water-weight').innerHTML);
        let groundsValue = parseInt(document.getElementById('grounds-weight').innerHTML);

        return {
            ratio:ratioValue,
            water:waterValue,
            grounds:groundsValue
        };
    },
    startFromWater: function(water, ratio) {
        // console.log(`Water: ${water} Ratio: ${ratio}`);
        let groundsWeight = water / ratio;
        document.getElementById('grounds-weight').innerHTML = Math.round(groundsWeight);
    },
    startFromGrounds: function(grounds, ratio) {
        // console.log(`Grounds: ${grounds} Ratio: ${ratio}`);
        let waterWeight = grounds * ratio;
        document.getElementById('water-weight').innerHTML = waterWeight;
    }
}

// For stopwatch

const Timer = {
    // General variables that can be accessed by other functions
    timerStopped: true,
    seconds: 0,
    minutes: 0,
    // Initializes event listeners for stopwatch
    init: function() {
        let start = document.getElementById('start-button');
        let stop = document.getElementById('stop');
        let pause = document.getElementById('pause');
        let secondaryButtons = document.getElementsByClassName('stopwatch-button');
        let stopwatch = document.getElementById('timer-display');


        /* Start button */
        start.onclick = function() {
            Timer.timer();
            start.setAttribute('hidden', '');
            // Set timer button icons to prevent Chrome emojifying them
            // stop.value = '\u23F9\uFE0E';
            // pause.value = '\u23F8\uFE0E';
            Array.from(secondaryButtons).forEach(element => {
                element.removeAttribute('hidden');
            })
        }

        /* Pause button */
        pause.onclick = function() {
            if (Timer.timerStopped === true) {
                Timer.timer();
                Timer.timerStopped = false;
                // Change button icon to pause
                // pause.value = '\u23F8\uFE0E';
                pause.innerHTML = '<i class="icon-pause"></i>';
            } else {
                clearTimeout(Timer.t)
                Timer.timerStopped = true;
                // Change button icon to play
                // pause.value = '\u25B6';
                pause.innerHTML = '<i class="icon-play"></i>';
            }
        }

        /* Stop button */
        stop.onclick = function() {
            clearTimeout(Timer.t);
            Timer.timerStopped = true;
            stopwatch.textContent = "00:00";
            Timer.seconds = 0;
            Timer.minutes = 0;
            start.removeAttribute('hidden');
            Array.from(secondaryButtons).forEach(element => {
                element.setAttribute('hidden', '');
            })
            // Change button icon to pause
            pause.innerHTML = '<i class="icon-pause"></i>';
        }
    },
    // Adds one second each time and updates the stopwatch display
    add: function() {
        Timer.seconds += 1;
        if (Timer.seconds >= 60) {
            Timer.seconds = 0;
            Timer.minutes += 1;
            if (Timer.minutes >= 60) {
                Timer.minutes = 0;
            }
        }
        let stopwatch = document.getElementById('timer-display')

        stopwatch.textContent = (
            Timer.minutes ? (Timer.minutes > 9 ? Timer.minutes : "0" + Timer.minutes) : "00") + ":" + (Timer.seconds > 9 ? Timer.seconds : "0" + Timer.seconds
        );

        // Timer.timer();
    },
    // Initiates the stopwatch
    timer: function() {
        // Timer.t = setTimeout(Timer.add, 1000);
        if(Timer.timerStopped) {
            Timer.t = setInterval(Timer.add, 1000);
            Timer.timerStopped = false;
        }
    }
}

// After document is loaded, initiate these functions
document.addEventListener('DOMContentLoaded', () => {
    Calculator.listenToButtons();
    Timer.init();
})
