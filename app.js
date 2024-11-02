const express = require("express")
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const nocache = require("nocache")

app.set("view engine","ejs")

app.use(nocache())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

const usernameDB = "admin";
const passwordDB = "123";

app.get('/',(req,res)=>{
    if (req.session.loggedIn) {
        return res.render('home');
    }else{
        res.render("login")
    }
})

app.post('/home',(req,res)=>{
    const {username, password}= req.body;
    if(username===usernameDB && password===passwordDB){
        req.session.loggedIn = true;
        res.render("home")
    }else{
        res.redirect('/?error=1');
    }
})

app.post('/logout',(req,res)=>{
    req.session.destroy(() => {
       res.render("login")
    });
})

app.listen(3001,() => {
    console.log("Server running on http://localhost:3001");
});