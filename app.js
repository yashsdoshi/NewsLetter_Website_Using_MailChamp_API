//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/signup.html")
})

app.post('/', (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: 
        {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };
  const jsondata = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/06ef24c1ab"
  
  const options = {
    method: "POST",
    auth: "harsh1:0cda2c76c3f6fa197de6f2c1a3790cb6-us21"
  };
    const request = https.request(url, options, function(response){
      
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
      } 
      else{
        res.sendFile(__dirname+"/failure.html");
      }
      
      response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
});

//Unique ID for Audience -- 06ef24c1ab
//API Key -- 0cda2c76c3f6fa197de6f2c1a3790cb6-us21