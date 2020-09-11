// For coffee calculator

const Calculator = {
    listenToButtons: function() {
        let gridElements = document.getElementsByClassName('iteractive-item');

        Array.from(gridElements).forEach(element => {
            let minus = element.getElementsByClassName('minus');
            let plus = element.getElementsByClassName('plus');
            let display = element.getElementsByClassName('display-data');
            minus[0].addEventListener('click', () => {
                display[0].innerHTML = parseInt(display[0].innerHTML) - 1;
                Calculator.checkElementType(minus[0]);
            })
            plus[0].addEventListener('click', () => {
                let newValue = parseInt(display[0]. innerHTML) + 1;
                display[0].innerHTML = newValue;
                Calculator.checkElementType(plus[0]);

            })
        })
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
        console.log(`Water: ${water} Ratio: ${ratio}`);
        let groundsWeight = water / ratio;
        document.getElementById('grounds-weight').innerHTML = Math.round(groundsWeight);
    },
    startFromGrounds: function(grounds, ratio) {
        console.log(`Grounds: ${grounds} Ratio: ${ratio}`);
        let waterWeight = grounds * ratio;
        document.getElementById('water-weight').innerHTML = waterWeight;
    }
}

// For stopwatch

const Timer = {
    // General variables that can be accessed by other functions
    // timerPaused: false,
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
        start.onclick = () => {
            Timer.timer();
            start.setAttribute('hidden', '');
            Array.from(secondaryButtons).forEach(element => {
                element.removeAttribute('hidden');
            })
        }

        /* Pause button */
        pause.onclick = function() {
            if (Timer.timerStopped === true) {
                console.log('Resuming')
                Timer.timer();
                Timer.timerStopped = false;
                // Change button icon to pause
                pause.value = '\u275A\u275A';
            } else {
                // clearTimeout(Timer.t);
                console.log('Pausing')
                clearTimeout(Timer.t)
                Timer.timerStopped = true;
                // Change button icon to play
                pause.value = '\u25B6';
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
            pause.value = '\u275A\u275A';
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
