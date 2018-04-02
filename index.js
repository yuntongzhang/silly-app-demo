// define global var here
var app = {
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


/*ADD AN EVENT LISTENER TO WINDOW*/


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

    //adjust shake threshold here
    var shakyThreshold = 5000;

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
