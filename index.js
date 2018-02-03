// define global var here
var app = {
    max: {
        x: 0,
        y: 0,
        z:0
    },
    catAudio: document.getElementById("catAudio")
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

    app.max.x = updateMaxValue(mAcc.x, app.max.x);
    app.max.y = updateMaxValue(mAcc.y, app.max.y);
    app.max.z = updateMaxValue(mAcc.z, app.max.z);

    //display acc readings
    var accReading = "<p>x: " + mAcc.x + "</br>y: " + mAcc.y + "</br>z: " + mAcc.z + "</br> max: ( " + app.max.x + ", " + app.max.y + ", " + app.max.z + " )"; 
    document.getElementById('acc-readings').innerHTML = accReading;

    //do silly stuff
    if (Math.abs(mAcc.x) > 3000 || Math.abs(mAcc.y) > 3000 || Math.abs(mAcc.z) > 3000) {
        document.body.style.backgroundColor = "red";
        document.getElementById("catAudio").play();
    }
    else {
        document.body.style.backgroundColor = "yellow";
    }
}

function updateMaxValue(val, field) {
    if (Math.abs(val) > field) {
        field = val;
    }
    return field;
}
