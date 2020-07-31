const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', (req, res)=>{
	console.log("Timestamp route called");
	let result = {
		"unix": new Date().getTime(),
		"utc": new Date().toGMTString()
	}
	res.send(result);
});

app.get('/api/timestamp/:date_string', (req, res)=>{
	let date_string = req.params.date_string;
	let date;
	if(date_string.indexOf("-") === -1)
		date = new Date(parseInt(date_string));
	else
		date = new Date(date_string);	
	if(date == "Invalid Date"){
		 console.log("This is a invalid date");
		 return res.json({"error": "Invalid Date"})	
	}
	res.json({
		"unix": date.getTime(),
		"utc": date.toGMTString()
	});
});


app.get("/*", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});