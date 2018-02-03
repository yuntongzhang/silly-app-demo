// define global var here
var app = {
    max: {
        x: 0,
        y: 0,
        z:0
    }
};

window.addEventListener('devicemotion', deviceMotionHandler, false);

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

    app.max.x = updateMaxValue(mAcc.x, app.max.x);
    app.max.y = updateMaxValue(mAcc.y, app.max.y);
    app.max.z = updateMaxValue(mAcc.z, app.max.z);

    //display acc readings
    var accReading = "<p>x: " + mAcc.x + "</br>y: " + mAcc.y + "</br>z: " + mAcc.z + "</br> max: ( " + app.max.x + ", " + app.max.y + ", " + app.max.z + " )"; 
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
    return field;
}
