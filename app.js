const https = require("https")
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res)=>{

    res.sendFile(__dirname +"/index.html");
});

app.post("/", (req, res)=>{

     const query = req.body.cityName;
    const apiKey = "12bc564a933705b5fcf528d988701f0e&units=metric";
    const units ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on("data", (data)=>{
            const weather= JSON.parse(data);
            const temp = weather.main.temp;
            const desc = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+icon +"@2x.png"
            res.write("<h1>The Weather in "+query+" is" + desc +"<p></p></h1>");
            res.write("<h3>The temperature in "+query+" is" + temp + "degrees Celcius.</h3>");
            res.write("<img src="+imageURL+">");
            res.send();
            console.log(temp, desc, icon);
           
        });
    });
});
    
app.listen(3000, (req, res)  =>{
    console.log("server successfully runnig at HTMLOutputElement://localhost:3000");
});