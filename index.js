// INDEX
const { get } = require("http");
const path = require("path");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const CSS_COLOR_NAMES = [
  "AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen",
];

const cursorArr = [];
const userArr = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  userArr.push({
    userID: socket.id,
    color: CSS_COLOR_NAMES[getRndInteger(0, CSS_COLOR_NAMES.length)],
    xPos: 0,
    yPos: 0,
  });

  console.log(`a user with the id ${socket.id} connected. users online: ${userArr.length}`);
  // console.log(`the new user has the color: ${userArr[userArr.length-1].color}`);

  // console.log(userArr);

  socket.on('disconnect', () => {
    console.log(`user with id ${socket.id} disconnected`);
    
    for(let i=0; i<userArr.length; i++) {
      if(userArr[i].userID === socket.id) {
        userArr.splice(i, 1);
      }
    }

    io.emit('render portraits', userArr);
  
  });

  io.emit('render portraits', userArr);

  socket.on('mouse move', (xPos, yPos) => {

    for(let i=0; i<userArr.length; i++) {
      if(userArr[i].userID === socket.id) {
        userArr[i].xPos = xPos;
        userArr[i].yPos = yPos;
      }
    }

    io.emit('render cursors', userArr);
  }) 


});

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});




function showUserCount() {
  console.log(`theres now ${userArr.length} users online`);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

