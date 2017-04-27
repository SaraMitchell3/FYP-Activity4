var buttonSax1;
var buttonSax2;
var buttonSax3;
var buttonPiano1;
var buttonPiano2;
var buttonPiano3;
var buttonOboe1;
var buttonOboe2;
var buttonOboe3;
var buttonGuitar1;
var buttonGuitar2;
var buttonGuitar3;
var buttonFlute1;
var buttonFlute2;
var buttonFlute3;
var buttonCello1;
var buttonCello2;
var buttonCello3;
var buttonViolin1;
var buttonViolin2;
var buttonViolin3;
var buttonClarinet1;
var buttonClarinet2;
var buttonClarinet3;
var buttonTrumpet1;
var buttonTrumpet2;
var buttonTrumpet3;
var buttonDrumset1;
var buttonDrumset2;
var buttonDrumset3;
var fft;
var sliderVolume, sliderPan;
var vol, cnv4;

function preload() {
  correct = loadSound('correct.wav');
  wrong = loadSound('wrong.wav');
  cello = loadSound('cello.mp3');
  clarinet = loadSound('clarinet.mp3');
  drumset = loadSound('drumset.wav');
  guitar = loadSound('guitar.wav');
  oboe = loadSound('oboe.mp3');
  piano = loadSound('piano.wav');
  saxophone = loadSound('saxophone.wav');
  flute = loadSound('transverseFlute.wav');
  trumpet = loadSound('trumpet.mp3');
  violin = loadSound('violin.wav');

  icello = loadImage('cello.jpg');
  iclarinet = loadImage('clarinet.jpg');
  idrumset = loadImage('drumset.jpg');
  iguitar = loadImage('guitar.jpg');
  ioboe = loadImage('oboe.jpg');
  ipiano = loadImage('piano.jpg');
  isaxophone = loadImage('saxophone.jpg');
  iflute = loadImage('transverseFlute.jpg');
  itrumpet = loadImage('trumpet.jpg');
  iviolin = loadImage('violin.jpg');
}

function setup() {

  cnv4 = createCanvas(1250, 1500);

  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderVolume.position(350, 350);

  sliderPan = createSlider(-1, 1, 0, 0.01);
  sliderPan.position(350, 450);

  angleMode(DEGREES);

  // Buttons

  buttonGuitar3 = createButton('Guitar');
  buttonGuitar3.position(203, 275);
  buttonGuitar3.mousePressed(no);
  buttonCello1 = createButton('Cello'); // *
  buttonCello1.position(203, 295);
  buttonCello1.mousePressed(yes);
  buttonViolin1 = createButton('Violin');
  buttonViolin1.position(203, 315);
  buttonViolin1.mousePressed(no);

  buttonDrumset1 = createButton('Drum set'); // *
  buttonDrumset1.position(259, 515);
  buttonDrumset1.mousePressed(yes);
  buttonCello3 = createButton('Cello');
  buttonCello3.position(259, 535);
  buttonCello3.mousePressed(no);
  buttonOboe1 = createButton('Oboe');
  buttonOboe1.position(259, 555);
  buttonOboe1.mousePressed(no);

  buttonClarinet2 = createButton('Clarinet');
  buttonClarinet2.position(264, 755);
  buttonClarinet2.mousePressed(no);
  buttonSax1 = createButton('Saxophone');
  buttonSax1.position(264, 775);
  buttonSax1.mousePressed(no);
  buttonOboe2 = createButton('Oboe'); // *
  buttonOboe2.position(264, 795);
  buttonOboe2.mousePressed(yes);

  buttonFlute1 = createButton('Transverse flute');
  buttonFlute1.position(264, 995);
  buttonFlute1.mousePressed(no);
  buttonTrumpet1 = createButton('Trumpet');
  buttonTrumpet1.position(264, 1015);
  buttonTrumpet1.mousePressed(no);
  buttonSax2 = createButton('Saxophone'); // *
  buttonSax2.position(264, 1035);
  buttonSax2.mousePressed(yes);

  buttonTrumpet2 = createButton('Trumpet'); // *
  buttonTrumpet2.position(262, 1235);
  buttonTrumpet2.mousePressed(yes);
  buttonPiano1 = createButton('Piano');
  buttonPiano1.position(262, 1255);
  buttonPiano1.mousePressed(no);
  buttonSax3 = createButton('Saxophone');
  buttonSax3.position(262, 1275);
  buttonSax3.mousePressed(no);

  buttonFlute2 = createButton('Transverse flute');
  buttonFlute2.position(804, 275);
  buttonFlute2.mousePressed(no);
  buttonTrumpet3 = createButton('Trumpet');
  buttonTrumpet3.position(804, 295);
  buttonTrumpet3.mousePressed(no);
  buttonClarinet3 = createButton('Clarinet'); // *
  buttonClarinet3.position(804, 315);
  buttonClarinet3.mousePressed(yes);

  buttonDrumset2 = createButton('Drum set');
  buttonDrumset2.position(709, 515);
  buttonDrumset2.mousePressed(no);
  buttonGuitar1 = createButton('Guitar'); // *
  buttonGuitar1.position(709, 535);
  buttonGuitar1.mousePressed(yes);
  buttonViolin2 = createButton('Violin');
  buttonViolin2.position(709, 555);
  buttonViolin2.mousePressed(no);

  buttonPiano2 = createButton('Piano'); // *
  buttonPiano2.position(777, 755);
  buttonPiano2.mousePressed(yes);
  buttonGuitar2 = createButton('Guitar');
  buttonGuitar2.position(777, 775);
  buttonGuitar2.mousePressed(no);
  buttonOboe3 = createButton('Oboe');
  buttonOboe3.position(777, 795);
  buttonOboe3.mousePressed(no);

  buttonPiano3 = createButton('Piano');
  buttonPiano3.position(795, 995);
  buttonPiano3.mousePressed(no);
  buttonClarinet1 = createButton('Clarinet');
  buttonClarinet1.position(795, 1015);
  buttonClarinet1.mousePressed(no);
  buttonFlute3 = createButton('Transverse flute'); // *
  buttonFlute3.position(795, 1035);
  buttonFlute3.mousePressed(yes);

  buttonDrumset3 = createButton('Drum set');
  buttonDrumset3.position(785, 1235);
  buttonDrumset3.mousePressed(no);
  buttonViolin3 = createButton('Violin'); // *
  buttonViolin3.position(785, 1255);
  buttonViolin3.mousePressed(yes);
  buttonCello2 = createButton('Cello');
  buttonCello2.position(785, 1275);
  buttonCello2.mousePressed(no);

  fft = new p5.FFT();
}

function draw() {

  background(map(sliderPan.value(), -1, 1, 255, 0));

  var vol = sliderVolume.value();
  masterVolume(vol);

  if (cello.currentTime > 30.6) {
    cello.stop();
    playing = false;
  }
  if (clarinet.currentTime > 29.77) {
    clarinet.stop();
    playing = false;
  }
  if (drumset.currentTime > 15.85) {
    drumset.stop();
    playing = false;
  }
  if (guitar.currentTime > 65.14) {
    guitar.stop();
    playing = false;
  }
  if (oboe.currentTime > 32.75) {
    oboe.stop();
    playing = false;
  }
  if (piano.currentTime > 36.19) {
    piano.stop();
    playing = false;
  }
  if (saxophone.currentTime > 32.22) {
    saxophone.stop();
    playing = false;
  }
  if (flute.currentTime > 22.06) {
    flute.stop();
    playing = false;
  }
  if (trumpet.currentTime > 52.23) {
    trumpet.stop();
    playing = false;
  }
  if (violin.currentTime > 48.99) {
    violin.stop();
    playing = false;
  }

  textSize(50);
  textStyle(BOLD);
  fill(255, 125, 0);
  text("Activity 1: The Instruments", 250, 100);

  textSize(20);
  textStyle(NORMAL);
  fill(0);
  text("In this activity we will learn to recognise the sounds of different instruments.", 50, 200);
  text("Click on the images to hear these instruments, then choose their correct names by clicking on the buttons:", 50, 230);
  textSize(15);
  text("1.", 50, 270);
  text("2.", 590, 270);
  text("3.", 50, 510);
  text("4.", 590, 510);
  text("5.", 50, 750);
  text("6.", 590, 750);
  text("7.", 50, 990);
  text("8.", 590, 990);
  text("9.", 50, 1230);
  text("10.", 580, 1230);

  textStyle(BOLD);
  fill(255, 125, 0);
  text("Volume", 390, 335);
  text("Pan", 400, 435);

  // Image display
  image(icello, 70, 270);
  image(iclarinet, 610, 270);
  image(idrumset, 70, 510);
  image(iguitar, 610, 510);
  image(ioboe, 70, 750);
  image(ipiano, 610, 750);
  image(isaxophone, 70, 990);
  image(iflute, 610, 990);
  image(itrumpet, 70, 1230);
  image(iviolin, 610, 1230);

  // Image borders
  noFill();
  strokeWeight(2);
  rect(70, 270, icello.width, icello.height);
  rect(610, 270, iclarinet.width, iclarinet.height);
  rect(70, 510, idrumset.width, idrumset.height);
  rect(610, 510, iguitar.width, iguitar.height);
  rect(70, 750, ioboe.width, ioboe.height);
  rect(610, 750, ipiano.width, ipiano.height);
  rect(70, 990, isaxophone.width, isaxophone.height);
  rect(610, 990, iflute.width, iflute.height);
  rect(70, 1230, itrumpet.width, itrumpet.height);
  rect(610, 1230, iviolin.width, iviolin.height);

  // Graph
  push();
  var waveform = fft.waveform();
  translate(width / 2 - 100, height / 2 - 20);
  fill(random(255), random(255), random(255));
  beginShape();
  stroke(random(255), random(255), random(255));
  strokeWeight(1);
  for (var i = 0; i < 360; i++) {
    r = map(waveform[i] * 10, 0, 1, 10, 200);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  pop();
}

//
//
//
//FUNCTIONS
//
//
//

function mousePressed() {
  // images of instruments
  if (mouseX > 70 && mouseX < 70 + icello.width && mouseY > 270 && mouseY < 270 + icello.height) {
    if (!cello.isPlaying()) {
      cello.play();
    } else {
      cello.stop();
    }
  }
  if (mouseX > 70 && mouseX < 70 + idrumset.width && mouseY > 510 && mouseY < 510 + idrumset.height) {
    if (!drumset.isPlaying()) {
      drumset.play();
    } else {
      drumset.stop();
    }
  }
  if (mouseX > 70 && mouseX < 70 + ioboe.width && mouseY > 750 && mouseY < 750 + ioboe.height) {
    if (!oboe.isPlaying()) {
      oboe.play();
    } else {
      oboe.stop();
    }
  }
  if (mouseX > 70 && mouseX < 70 + isaxophone.width && mouseY > 990 && mouseY < 990 + isaxophone.height) {
    if (!saxophone.isPlaying()) {
      saxophone.play();
    } else {
      saxophone.stop();
    }
  }
  if (mouseX > 70 && mouseX < 70 + itrumpet.width && mouseY > 1230 && mouseY < 1230 + itrumpet.height) {
    if (!trumpet.isPlaying()) {
      trumpet.play();
    } else {
      trumpet.stop();
    }
  }
  if (mouseX > 610 && mouseX < 610 + iclarinet.width && mouseY > 270 && mouseY < 270 + iclarinet.height) {
    if (!clarinet.isPlaying()) {
      clarinet.play();
    } else {
      clarinet.stop();
    }
  }
  if (mouseX > 610 && mouseX < 610 + iguitar.width && mouseY > 510 && mouseY < 510 + iguitar.height) {
    if (!guitar.isPlaying()) {
      guitar.play();
    } else {
      guitar.stop();
    }
  }
  if (mouseX > 610 && mouseX < 610 + ipiano.width && mouseY > 750 && mouseY < 750 + ipiano.height) {
    if (!piano.isPlaying()) {
      piano.play();
    } else {
      piano.stop();
    }
  }
  if (mouseX > 610 && mouseX < 610 + iflute.width && mouseY > 990 && mouseY < 990 + iflute.height) {
    if (!flute.isPlaying()) {
      flute.play();
    } else {
      flute.stop();
    }
  }
  if (mouseX > 610 && mouseX < 610 + iviolin.width && mouseY > 1230 && mouseY < 1230 + iviolin.height) {
    if (!violin.isPlaying()) {
      violin.play();
    } else {
      violin.stop();
    }
  }
}

function yes() {
  correct.play();
}

function no() {
  wrong.play();
}