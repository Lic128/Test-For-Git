const express= require("express");
const hbs= require("hbs");
const fs= require("fs");

const port=process.env.PORT || 3000;


var app=express();
hbs.registerPartials(__dirname+'/views/partials')
app.use(express.static(__dirname+'/public'));
app.set("view engine", "hbs");


app.use((req, res, next)=>{
    var now= new Date().toString();
    var log=`${now}; ${req.method}; ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});



hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
})






app.get('/', (req, res)=>{
   // res.send("Hello Express!");
    res.render('home.hbs',{
        pageTitle:"Home Page",
        welcomeMessage:"Welcone to my website",
    });
});
app.get("/about", (req, res)=>{
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});
app.get("/projects", (req, res)=>{
    res.render("projects.hbs",{
        pageTitle:"Projects"
    });
})


app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});