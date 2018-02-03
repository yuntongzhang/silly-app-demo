window.addEventListener('devicemotion', deviceMotionHandler, false);

function deviceMotionHandler(eventData) {

    var acc = eventData.acceleration
    var accg = eventData.accelerationIncludingGravity;
    var gy = Math.abs(accg.y - acc.y);
    var rgy = Math.floor(gy);
    var max = {};
    max.x = 0;
    max.y = 0;
    max.z = 0;

    updateMaxValue(acc.x, max.x);
    updateMaxValue(acc.y, max.y);
    updateMaxValue(acc.z, max.z);

    //display acc readings
    var accReading = "<p>x: " + acc.x + "</br>y: " + acc.y + "</br>z: " + acc.z + "</br> max: ( " + max.x + ", " + max.y + ", " + max.z + " )"; 
    document.getElementById('acc-readings').innerHTML = accReading;

    //do silly stuff
    /*if (rgy < 9) {
        alert("not straight");
    }*/
}

function updateMaxValue(val, field) {
    if (Math.abs(val) > field) {
        field = val;
    }
}