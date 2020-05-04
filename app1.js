const express =require("express");
const bodyparser=require("body-parser");
const request =require("request");
const app=express();
const https=require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
const mongoose =require("mongoose");

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sujan:mithur17@cluster0-6djav.mongodb.net/blogDB1",{useNewUrlParser:true});
// /blogDB1
//mongodb://localhost:27017
// mongodb+srv://admin-sujan:mithur17@cluster0-6djav.mongodb.net

const loginschema=new mongoose.Schema({
    fname :{
        type:String,
        required:[true,"Please enter name"]
    },
    lname : {
        type:String
    },
    email:{
        type:String
    },
    
});

const Login = mongoose.model("Login",loginschema);



app.get("/",function(req,res){
    res.render("signup");

});


app.post("/",function(req,res){
    const login = new Login({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email
});

login.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});




app.listen(process.env.PORT|| 3000,function(){
    console.log("started");
})


//5f615b2819ab16bd5b78771be44243ac-us8

//fc64923f86

// app.post("/",function(req,res){
//     const fname=req.body.fname;
//     const lname=req.body.lname;
//     const email=req.body.email;
//     const pass =req.body.pass;
    

//     var data={
//         members:[
//             {
//                 email_address:email,
//                 status:"subscribed",
//                 merge_fields:{
//                     FNAME: fname,
//                     LNAME:lname
//                 }
//             }
//         ]
//     };
//     const jsonData =JSON.stringify(data);

//     const url="https://us8.api.mailchimp.com/3.0/lists/fc64923f86"
    
//     const options={
//         method :"POST",
//         auth:"sujan:5f615b2819ab16bd5b78771be44243ac-us8"
//     }
//     const request=https.request(url,options,function(response){

//         if(response.statusCode ==200){
//             res.sendFile(__dirname+"/success.html");
//         }
//         else{
//             res.sendFile(__dirname+"/failure.html")
//         }
//             response.on("data",function(data){
//                 console.log(JSON.parse(data));
//             })
//     });

//     request.write(jsonData);
//      request.end();
// });




