let A = 0;
let fr = 60;
let loopTime = 60;
let offset = (360 / loopTime) / fr;

let s = 10;
let halfW;
let halfH;

let halfMin;

let stepX;
let stepY;
let theta = 0;
let r;

let history = [];
let historySize = 300;
let st = 0;
let aRad;

function setup() {

    for (let i = 0; i < historySize; i++) {
        history[i] = {cos: 0, sin: 0, theta: 0};
    }

    A = map(new Date().getSeconds(), 0, 60, 0, 360);
    angleMode(DEGREES); // Change the mode to DEGREES

    frameRate(fr);

    stepX = (360 / windowWidth);
    stepY = (5 / windowHeight);

    createCanvas(windowWidth, windowHeight);

}

function draw() {

    halfW = windowWidth / 2;
    halfH = windowHeight / 2;
    halfMin = Math.min(halfW, halfH);
    r = halfMin / 2;

    A += offset;
    // A=(mouseX * stepX + mouseY * stepY);
    if (A >= 360) {
        A -= 360;
    }

    aRad = (Math.PI / 180) * A;

    background(200);
    drawBoard();


    drawScale();
    drawChart(A);
    drawTrig(A);
    drawHistory(A);
}


function drawTrig(A) {
    push();

    translate(halfW, halfH);

    strokeWeight(2);
    let sin = Math.sin(aRad);
    let cos = Math.cos(aRad);

    stroke(255, 100, 100);
    line(cos * r, 0, cos * r, -sin * r);
    let sinText = sin.toFixed(3);
    fill(255, 100, 100);
    noStroke();
    text("sin(θ): " + sinText, cos * r + 5, -sin * r / 2);


    stroke(100, 225, 100);
    fill(100, 225, 100);
    line(0, 0, cos * r, 0);
    let cosText = cos.toFixed(3);
    noStroke();
    text("cos(θ): " + cosText, cos * r / 2 - 50, 20);

    noStroke();

    pop();
}

function drawEvent(e, t, s) {

    let h=s;
    push();

    let posT = historySize + t;

    stroke('rgba(100%,0%,0%,0.5)');
    line(posT, h, posT, h - e.sin * s/4);

    h+=s;


    stroke('rgba(0%,100%,0%,0.5)');
    line(posT, h, posT, h - e.cos * s/4);

    h+=s;
    stroke('rgba(50%,50%,80%,0.5)');
    let theta = map(e.theta,0,360,0,s/4);
    line(posT, h, posT, h - theta);

    pop();

}


function drawHistory(A) {

    let height = 100;
    let s = height / 2;

    let event = {
        sin: Math.sin(aRad),
        cos: Math.cos(aRad),
        theta: A
    };

    history[st] = event;

    push();
    translate(10, 10);

    drawEvent(event, 0, height);

    let j = -1;
    let i = st;
    for (; i > 0; i--, j--) {
        drawEvent(history[i], j, height);
    }


    i = historySize-1;
    for (; i > st; i--, j--) {
        drawEvent(history[i],j,height);
    }

    st++;
    if (st > historySize) {
        st = 0;
    }

    // for(let i=0;i<historySize;i++){
    //     historySin[i]=historySin[i+1];
    //     point(r+i,-historySin[i]*50);
    // }

    pop();

}


function drawChart(A) {

    let theta = -A;
    let angle = (A).toFixed(0);
    let pirad = (angle / 180).toFixed(2);

    push();
    translate(halfW, halfH);

    fill(50);
    ellipse(0, 0, 10, 10);

    push();
    fill('rgba(50%,50%,80%,0.5)');
    arc(0, 0, r / 3, r / 3, theta, 0);
    pop();

    push();
    rotate(theta);
    text("r : 1", r / 2, -5);

    push();

    fill('rgba(0%,0%,0%,0.5)');
    noStroke();
    rect(r + 20, -10, 140, 20);
    fill(255);
    text("θ: " + angle + "º (" + pirad + "π×rad)", r + 25, +5);
    pop();
    stroke(128, 128, 200);
    strokeWeight(2);

    ellipse(r, 0, 5, 5);
    line(0, 0, r, 0);
    pop();

    pop();
}


function drawBoard() {
    push();

    stroke(150);
    ellipse(halfW, halfH, halfMin, halfMin);
    line(0, halfH, windowWidth, halfH);
    line(halfW, 0, halfW, windowHeight);

    fill(0);
    stroke(200);

    text("X", windowWidth - 50, halfH - s);
    text("Y", halfW + s, 50);

    translate(halfW, halfH);

    let steps = 10;
    let stepSize = r / steps;

    stroke(210, 210, 210);

    for (let i = -steps; i < steps; i++) {
        line(stepSize * i, -10, stepSize * i, 10);
        line(-10, stepSize * i, 10, stepSize * i);
    }

    text("1", r - s, -s);
    ellipse(r, 0, 5, 5);

    text("-1", -r, -s);
    ellipse(-r, 0, 5, 5);

    text("1", s, -r + 2 * s);
    ellipse(0, -r, 5, 5);

    text("-1", s, +r - s);
    ellipse(0, r, 5, 5);

    pop();
}

function drawScale() {
    push();
    translate(halfW, halfH);

    fill(0);
    stroke(0);

    for (let i = 0; i < 360; i += 1) {
        let size = 5;

        push();
        noStroke();
        if (i % 5 === 0 && !(i % 10 === 0)) {
            size = 10;
        }

        if (i % 10 === 0) {
            size = 20;
            text(i, r + size * 2, s / 2);
        }
        pop();

        line(r + 5, 0, r + 5 + size, 0);

        rotate(-1);
    }

    pop();
}

