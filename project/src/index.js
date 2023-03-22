import vert from './shaders/basic.vert';
import frag from './shaders/basic.frag';

var colorList = [
  "#00a98f",
  "#11862f",
  "#002663",
  //"#fff9ea",
  "#ff6908",
  "#000000",
  "#ed1b2e",
  "#ecb731",
  "#0433ff",  
  "#00c7fd",
  //"#dbebfa",
  "#e01f3d",
  "#fff200",
  "#ffb900",
  "#e4002b",
  "#a51890",

  ];

var colorList0 = [
    "#00a98f",
    "#11862f",
    "#002663",
    //"#fff9ea",
    "#ff6908",
    //"#000000",
    "#ed1b2e",
    "#ecb731",
    "#0433ff",
    "#00c7fd",
    //"#dbebfa",
    "#e01f3d",
    "#fff200",
    "#ffb900",
    "#a51890",
    ];

var colorList1 = [
    "00a98f",
    "11862f",
    "002663",
    //"#fff9ea",
    "ff6908",
    //"#000000",
    "ed1b2e",
    "ecb731",
    "0433ff",
    "00c7fd",
    //"#dbebfa",
    "e01f3d",
    "fff200",
    "ffb900",
    "a51890",
    ];


let pg;

let simpleShader;

let img;
let rand0;
let rand1;
let rand2;
let rand3;
let rand4;
let rand5;
let rand6;
let rand7;
let rand8;
let rand9;
let randValue;
let escalaOndas;
let escalaNoise;
let selecCol = ["combined", "one color"];
let usoColor;
let escalaRand;
let movimiento;
let velFinal;

let mode = 0.8; // falta nombrar


function genR(min, mx) { let result = 0; if (!mx) { result = fxrand() * (min - 0) + 0; } else { result = fxrand() * (mx - min) + min; } return result; }


let W, H;
resdim();

function resdim() {
    let ratio = 0.8333;
    if (window.innerWidth < window.innerHeight) {
        W = window.innerWidth;
        H = window.innerWidth / ratio;
    } else {
        W = window.innerHeight * ratio;
        H = window.innerHeight;
    }
}


//-------FEATURES
usoColor = selecCol[Math.round(genR(selecCol.length-1))];
let coll0 = colorList1[Math.round(genR(0,colorList1.length-1))];

let rand03 = fxrand();
    if (rand03 <= 0.2) {  //0.2
        escalaOndas = 2.0;
    } else {
        escalaOndas = 3.0;
    }

    let rand04 = fxrand();
    if (rand04 <= 0.1) {
        escalaRand = 2.0;
    } else {
        escalaRand = 1.0;
    }


    window.setup = () => {
        createCanvas(W, H, WEBGL);
        background(lerpColor(color(colorList0[int(genR(colorList0.length))]), color(250), genR(0.4, 0.7)));

        simpleShader = createShader(vert, frag);

        pg = createGraphics(width, height, WEBGL);
        pg.pixelDensity(2);


        let value0 = 0.8;
        let value00 = 0.1;
        rand0 = genR(value00, value0);
        rand1 = genR(value00, value0);
        rand2 = genR(value00, value0);
        rand3 = genR(value00, value0);
        rand4 = genR(value00, value0);
        rand5 = genR(value00, value0);
        rand6 = genR(value00, value0);
        rand7 = genR(value00, value0);
        rand8 = genR(value00, value0);
        rand9 = genR(value00, value0);
        randValue = genR(0, 1000);


        movimiento = width * 0.0001;

        var colo0 = random(colorList);
        var colo1 = random(colorList);


        pg.background(lerpColor(color(colorList0[int(genR(colorList0.length))]), color(250), genR(0.4, 0.7)));
        pixelDensity(2);

        for (let i = 0;i < 4;i++) {
            let col = colorList[int(genR(colorList.length))];

            let r = red(col);
            let g = green(col);
            let b = blue(col);
            pg.pointLight(
                255,
                155,
                155,
                genR(-width / 2, width / 2),
                genR(-height / 2, height / 2),
                genR(width / 4, width)
                );
        }

        let coll = "#1769ff";
        let coll2 = colorList0[int(genR(0,colorList0.length))];
        pg.push();
        pg.translate(0, 0, -width * 2);
        pg.fill(colorList0[int(genR(colorList0.length))]);
        pg.fill(coll);
        pg.box(width * 20, width * 20, 2);
        pg.pop();

        let col2 = colorList[int(genR(colorList.length))];
        for (let i = 0;i < 400;i++) {
            let x = genR(-width / 2, width / 2);
            let y = genR(-height / 2, height / 2);
            let z = genR(-width / 2, 0);
            let sz = genR(0, width / 4);

            pg.push();
            pg.translate(x, y, z);
            pg.rotateX(genR(0, TWO_PI));
            pg.rotateY(genR(0, TWO_PI));
            pg.rotateZ(genR(0, TWO_PI));
            let col1 = colorList[int(genR(colorList.length))];
            let col0 = colorList[int(genR(colorList.length))];
            let refCol = abs(int(noise(x / 50, y / 50) * colorList.length));

            let col = lerpColor(color(col0), color(col1), fxrand());
            let r = red(col);
            let g = green(col);
            let b = blue(col);
            
            let rand02 = fxrand();
            let coll1 = colorList[int(genR(colorList.length))];

            if ( $fx.getRawParam("select_id0") == "combined") {
                pg.fill(lerpColor(color(coll1), color(colorList[int(genR(0,colorList.length))]), fxrand()));
                pg.specularMaterial(lerpColor(color(coll1), color(colorList[int(genR(0,colorList.length))]), fxrand()));
                
            }
            if ( $fx.getRawParam("select_id0") == "one color") {
                pg.fill(lerpColor(color("#" + $fx.getRawParam("color_id")), color(colorList[int(genR(0,colorList.length))]), fxrand()));
                pg.specularMaterial(lerpColor(color("#" + $fx.getRawParam("color_id")), color(colorList[int(genR(0,colorList.length))]), fxrand()));
            }
            if (usoColor == "two colors") {
                pg.fill(lerpColor(color(colo0), color(colo1), fxrand()));
            }

            pg.shininess(genR(75, 200));
            pg.noStroke();
            let rand01 = fxrand();

            var finalOut;
            if($fx.getRawParam("boolean_id") == true){
                finalOut = 0.8;
            }
            if($fx.getRawParam("boolean_id") == false){
                finalOut = 0;
            }

            if (rand01 <= finalOut) {
                pg.torus(sz, sz / 3, 120, 120);
            } else {
                pg.box(sz);
            }
            pg.pop();
        }


        if($fx.getRawParam("select_id") == "low"){
            velFinal = 0.3;
        }
        if($fx.getRawParam("select_id") == "mid"){
            velFinal = 1.0;
        }
        if($fx.getRawParam("select_id") == "high"){
            velFinal = 3.0;
        }
    };



    window.draw = () => {


        shader(simpleShader);

        //console.log("#" + $fx.getRawParam("color_id"));
        //console.log($fx.getRawParam("select_id"))


    // Send the image to the shader
        simpleShader.setUniform("uTexture", pg);
        simpleShader.setUniform("time", frameCount*velFinal);
        simpleShader.setUniform("value0", rand0);
        simpleShader.setUniform("value1", rand1);
        simpleShader.setUniform("value2", rand2);
        simpleShader.setUniform("value3", rand3);
        simpleShader.setUniform("value4", rand4);
        simpleShader.setUniform("value5", rand5);
        simpleShader.setUniform("value6", rand6);
        simpleShader.setUniform("value7", rand7);
        simpleShader.setUniform("value8", rand8);
        simpleShader.setUniform("value9", rand9);
        simpleShader.setUniform("tt", randValue);
        simpleShader.setUniform("escalaOndas", $fx.getRawParam("number_id"));
        simpleShader.setUniform("escalaRand", $fx.getRawParam("number_id0"));
        simpleShader.setUniform("movimiento", movimiento);

        noStroke();
        rect(0, 0, width, height);

    // noLoop();

        //image(pg,-width/2,-height/2);



    }


    window.mousePressed = () => {
     noLoop(); 
 }

 window.mouseReleased = () => {
     loop(); 
 }



 window.$fx.features({
    //"color mode": usoColor,
  //"weave scale": escalaOndas,
  //"noise scale": escalaRand,
 })



 window.$fx.params([

 {
    id: "select_id0",
    name: "color mode",
    type: "select",
    default: usoColor,
    options: {
        options: ["combined","one color"],
    }
},



{
    id: "select_id",
    name: "tide",
    type: "select",
default: "mid",
    options: {
        options: ["low", "mid", "high"],
    }
},

{
    id: "number_id",
    name: "wave intensity",
    type: "number",
default: escalaOndas,
    options: {
      min: 1,
      max: 4,
      step: 1,
  },
},

{
    id: "number_id0",
    name: "noise intensity",
    type: "number",
default: escalaRand,
    options: {
      min: 1,
      max: 3,
      step: 1,
  },
},



{
    id: "boolean_id",
    name: "acrilyc / flat",
    type: "boolean",
default: true,
},

{
    id: "color_id",
    name: "color - only in mode: one color",
    type: "color",
default: coll0,
},



]);