let express = require("express");

let expresslayouts = require("express-ejs-layouts");
let server = express();



server.use(express.static("public"));
server.use(expresslayouts);
server.set("view engine","ejs");


server.get("/landingpage",(req,res)=>{
    res.render("landingpage");
});
server.get('/cv.html',(req,res)=>{
    res.render('cv',{layout:false});
});
server.get("/", (req,res)=>{
    res.render("landingpage");
});



server.listen(4000,()=>{
    console.log("server started at localhost:4000");

});