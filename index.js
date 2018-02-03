// define global var here
var app = {
    max
};

window.addEventListener('devicemotion', deviceMotionHandler, false);
var max = {};

function deviceMotionHandler(eventData) {

    var SCALE = 1000;

    var acc = eventData.acceleration
    var accg = eventData.accelerationIncludingGravity;
    var mAcc = {};

    //scale acc values
    mAcc.x = acc.x * SCALE;
    mAcc.y = acc.y * SCALE;
    mAcc.z = acc.z * SCALE;

    var gy = Math.abs(accg.y - acc.y);
    var rgy = Math.floor(gy);
    
    app.max.x = 0;
    app.max.y = 0;
    app.max.z = 0;

    updateMaxValue(mAcc.x, app.max.x);
    updateMaxValue(mAcc.y, app.max.y);
    updateMaxValue(mAcc.z, app.max.z);

    //display acc readings
    var accReading = "<p>x: " + mAcc.x + "</br>y: " + mAcc.y + "</br>z: " + mAcc.z + "</br> max: ( " + max.x + ", " + max.y + ", " + max.z + " )"; 
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
