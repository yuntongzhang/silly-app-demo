window.addEventListener('devicemotion', deviceMotionHandler, false);

function deviceMotionHandler(eventData) {

    var acc = eventData.acceleration
    var accg = eventData.accelerationIncludingGravity;
    var gy = Math.abs(accg.y - acc.y);
    var rgy = Math.floor(gy);

    //display acc readings
    var accReading = "<p>x: " + acc.x + "</br>y: " + acc.y + "</br>z:" + acc.z; 
    document.getElementById('acc-readings').innerHTML = accReading;

    //do silly stuff
    /*if (rgy < 9) {
        alert("not straight");
    }*/

    
}