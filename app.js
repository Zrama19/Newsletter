const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");




const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post ("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const emailName = req.body.eName;

    const data = {
      members: [
        {
          email_address: emailName,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/2f42078e47";

    const options = {
      method: "POST",
      auth: "zrama19:c5ee0f371a4c699b38768b0ef3974994-us6"
    }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
      response.on("data", function(data){

      });
    });

    request.write(jsonData);
    request.end();


});

app.post("/failure", function (req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});


// API KEY : c5ee0f371a4c699b38768b0ef3974994-us6

// List ID : 2f42078e47
