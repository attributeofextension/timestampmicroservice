function isUnixTime(timeStr) {
   var bool = false; 
  
   if( timeStr.length == 10 ) {
     if( !isNaN(parseInt(timeStr))) {
        bool = true;     
     }
   }
  
  return bool;
}
function toNaturalDateStr(time) {
  var str = ""; 
  
  if(isNaN(time.getMonth())) {
    return null;
  }
  
  
  switch(time.getMonth()) { 
    case 0: str += "January";break;
    case 1: str += "February";break;
    case 2: str += "March";break;
    case 3: str += "April";break;
    case 4: str += "May";break;
    case 5: str += "June";break;
    case 6: str += "July";break;
    case 7: str += "August";break;
    case 8: str += "September";break;
    case 9: str += "October";break;
    case 10: str += "November";break;
    case 11: str += "December";break;
  }
  str += " " + time.getDate() + ", ";
  str += time.getFullYear();
  
  return str;
}

var express = require('express');
var app = express();

app.use(express.static('public'));


app.get("/:time", function(req, res ) {
    var time = isUnixTime(req.params.time) ? new Date(Number(req.params.time)*1000) : new Date(req.params.time);
    var parsedTime = {"unix": Number(time.getTime()) / 1000, "natural" : toNaturalDateStr(time) };
    
  
    res.send(JSON.stringify(parsedTime));
});
//http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {

  response.sendFile(__dirname + '/views/index.html');
});



// listen for requests :)
var listener = app.listen(process.env.PORT);
