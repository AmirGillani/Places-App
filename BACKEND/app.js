const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cors = require("cors");

const placeRoute = require("./routes/place-routes.js");

const userRoute = require("./routes/user-routes.js");

const HttpsErrors = require("./models/https-errors");

const fs = require("fs");

const path = require("path");

const app= express();

// CALL BODYPARSER API

app.use(bodyParser.json());

// THIS WILL BE CALLED WHEN FRONT END SEARCH FOR /UPLOADS/IMAGES IN IMAGE TAGS

app.use("/uploads/images", express.static(path.join('uploads','images')));

// CALL API TO HANDLE RESPONCE GOING OUT TO REACT

app.use(cors());

app.use(express.json());

// app.use((req,res)=>{

//   //ALLOW RESPONCE TO EVERY SERVER 
//   res.setHeader("Access-Control-Allow-Origion","*");

//   //ALLOW HEADERS
//   res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

//   //ALLOW REQUESTS
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();

// })

// CALL ROUTES MIDDLE WARE

app.use("/api/places/",placeRoute);

// CALL PLACE ROUTER
app.use("/api/user/", userRoute);

// THIS WILL BE CALLED WHEN NO RESPONCE IS ACHIVED FROM ROUTE
app.use(()=>{
  const error = new HttpsErrors("route not found !!", 404)
  throw error;
})

// CALL ERROR HANDLING MIDDLE WARE
app.use(function(error, req, res, next){

  // IF ANY ERROR OCCOURS THEN UNLINK THAT FILE FROM SERVER
  if(req.file)
  {
    fs.unlink(req.file.path, (err)=>{console.log(err)})
  }
    if(res.headerSent)
    {
      return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect("mongodb://127.0.0.1:27017/PLACES").then(()=>{app.listen(5000, function(){console.log("Server is running !!!")})}).catch((error)=>{
  throw new HttpsErrors("Databse error",5001)
})
