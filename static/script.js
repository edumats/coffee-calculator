var lastSet = "";

function startFromGrounds() {
    lastSet = "grounds";
    getValuesAndCalculate();
}

function startFromWater() {
    lastSet = "water";
    getValuesAndCalculate();
}

function startFromBrew() {
    lastSet = "brew";
    getValuesAndCalculate();
}

function getValues() {
    var ratioValue = parseFloat(document.getElementById('ratio').value);
    var waterValue = parseFloat(document.getElementById('water').value);
    var brewValue = parseFloat(document.getElementById('brew').value);
    var groundsValue = parseFloat(document.getElementById('grounds').value);
    var groundsWeightValue = parseFloat(document.getElementById('groundsUnit').value);
    var brewWeightValue = parseFloat(document.getElementById('brewUnit').value);
    var waterWeightValue = parseFloat(document.getElementById('waterUnit').value);
    return {ratio:ratioValue, water:waterValue, brew:brewValue, grounds:groundsValue,
            groundsWeight:groundsWeightValue, waterWeight:waterWeightValue,
            brewWeight:brewWeightValue};
}

function getValuesAndCalculate() {
    var calc = getValues();

    switch (lastSet) {
        case "grounds":
            calc.water = calculateWaterRatio(calc.grounds, calc.groundsWeight, calc.waterWeight, calc.ratio);
            calculateBrewRatio(calc.water, calc.waterWeight, calc.grounds, calc.groundsWeight, calc.brewWeight);
            break;
        case "water":
            calc.grounds = calculateGroundsRatio(calc.water, calc.waterWeight, calc.ratio, calc.groundsWeight);
            calculateBrewRatio(calc.water, calc.waterWeight, calc.grounds, calc.groundsWeight, calc.brewWeight);
            break
        case "brew":
            calc.grounds = calculateGroundsFromBrew(calc.brew, calc.brewWeight, calc.groundsWeight, calc.ratio);
            calculateWaterRatio(calc.grounds, calc.groundsWeight, calc.waterWeight, calc.ratio);
            break;
    }


}

function calculateBrewRatio(w, ww, g, gw, bw) {
    b = ((w*ww - 2*g*gw)/bw).toFixed(0);
    console.log(b)
    document.getElementById('brew').value = b;
}

function calculateGroundsFromBrew(b, bw, gw, r) {
    g = (((b*bw)/(r - 2))/gw).toFixed(1);
    document.getElementById('grounds').value = g;
    return g;
}

function calculateWaterRatio(g, gw, ww, r) {

   //document.form.water.value = ((grounds * groundsWeight) * (16000 * waterWeight));
    w = ((g * gw * r) / ww).toFixed(1);
    document.getElementById('water').value = w;
    return w;
}

function calculateGroundsRatio(w, ww, r, gw) {
    g = (((w * ww) / (r * gw))).toFixed(1);
    document.getElementById('grounds').value = g;
    return g
}

function startTimer() {
    let stopwatch = document.getElementById('stopwatch');
    let start = document.getElementById('start-button');
    let seconds = 0;
    start.onclick = addTime;
}

function addTime() {
    seconds++;

}

document.addEventListerner('DOMContentLoaded', () => {

})
