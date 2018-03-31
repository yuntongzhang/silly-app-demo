// define global var here
var app = {
    max: {
        x: 0,
        y: 0,
        z: 0
    }
};

window.addEventListener("DOMContentLoaded", function () {

}, false);


//new generic sensor api
let sensor = new LinearAccelerationSensor();
sensor.start();

sensor.onreading = () => {
    var event = new CustomEvent('devicemotion', {
        detail: {
            acceleration: {
                x: sensor.x,
                y: sensor.y,
                z: sensor.z
            }
        }
    });
    window.dispatchEvent(event);
}

sensor.onerror = event => console.log(event.error.name, event.error.message);

window.addEventListener('devicemotion', deviceMotionHandler, false);

function deviceMotionHandler(eventData) {

    var SCALE = 1000;
    var acc = eventData.detail.acceleration;
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
        app.catAudio = new Audio("audio/cat.mp3");
        app.catAudio.play();
        sleep(500);
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

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

