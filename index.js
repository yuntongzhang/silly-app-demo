// define global var here
var app = {
    usingGenericSensor: true,
    max: {
        x: 0,
        y: 0,
        z: 0
    },
    busy: false,

    //media paths collection
    audio: [
    "audio/cat.mp3",
    "audio/nonono.mp3"
    ]
};

/*INSERT ACCELEROMETER HERE*/




if (window.DeviceMotionEvent || 'LinearAccelerationSensor' in window) {
    /*ADD AN EVENT LISTENER TO WINDOW*/
    
}
else {
    console.log("Sensors not supported");
}

function deviceMotionHandler(eventData) {
    var SCALE = 1000;
    if (app.usingGenericSensor) {
        var acc = eventData.detail.acceleration;
    }
    else {
        if (eventData.acceleration.x) {
            var acc = eventData.acceleration;
        }
        else {
            //deep clone
            var acc = {};
            acc.x = eventData.accelerationIncludingGravity.x;
            acc.y = eventData.accelerationIncludingGravity.y;
            acc.z = eventData.accelerationIncludingGravity.z;
            if (acc.x > 8) {
                acc.x = acc.x - 8;
            }
            if (acc.y > 8) {
                acc.y = acc.y - 8;
            }
            if (acc.z > 8) {
                acc.z = acc.z - 8;
            }
        }
    }

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

    //adjust shake threshold here
    var shakyThreshold = 5000;

    //do silly stuff
    var shakyThreshold = 11000;
    console.log(app.busy);
    if (!app.busy) {
        if (Math.abs(mAcc.x) > shakyThreshold || Math.abs(mAcc.y) > shakyThreshold || Math.abs(mAcc.z) > shakyThreshold) {
            app.busy = true;
            /*DO SILLY STUFF*/

            app.busy = false;
        }
    }
}

/*UTILS*/

function updateMaxValue(val, field) {
    if (Math.abs(val) > Math.abs(field)) {
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

function randomPicker(array) {
    let i = Math.floor(Math.random() * array.length);
    return array[i];
}

/* INSERT SCREAM FOR BUTTON CLICK FUNCTION HERE*/ 

