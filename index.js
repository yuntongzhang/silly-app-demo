// define global var here
var app = {
    max: {
        x: 0,
        y: 0,
        z: 0
    }
};

//media paths collection
var audio = [
    "audio/cat.mp3",
    "audio/nonono.mp3"
];

var img = [
    "img/broken.png",
    "img/cry.jpg"
];

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
    var shakyUpper = 6000;
    var shakyLower = 2000;

    if (Math.abs(mAcc.x) > shakyUpper || Math.abs(mAcc.y) > shakyUpper || Math.abs(mAcc.z) > shakyUpper) {
        document.body.style.backgroundImage = "url(img/lolguy.png)";
        var scream = new Audio(randomPicker(audio));
        scream.play();
        document.body.style.backgroundImage = "url(" + randomPicker(img) + ")";
        sleep(800);
        document.body.style.backgroundImage = "url(img/poker.png)";
        sleep(800);
    }
    else {
        if (Math.abs(mAcc.x) > shakyLower || Math.abs(mAcc.y) > shakyLower || Math.abs(mAcc.z) > shakyLower) {
            document.body.style.backgroundImage = "url(img/poker.png)";
            sleep(1000);
        }
        else {
            document.body.style.backgroundImage = "url(img/happy.jpg)";
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
