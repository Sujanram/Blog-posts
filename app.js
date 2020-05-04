//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "At a time when many brands are pivoting toward more video and social media marketing, is blogging still important? The answer is a resounding “yes!” For businesses just starting to flesh out a marketing strategy, blogging is a marketing tool with a low barrier to entry and a tangible payoff. For more established brands, a blog is an ideal anchor for a multi-faceted marketing strategy.A consistently updated, the high-quality blog remains the ideal way to drive traffic and grow your brand. As our friends at Crazy Egg point out, when a blog is managed well, it boosts your inbound leads in a major way. Google loves a meaty, frequently updated blog, rewarding great content with higher search engine rankings as an overall trend.Blogging is also the perfect way to establish a brand voice, becoming recognizable to customers and growing loyalty. A great blog shows that your brand has its own unique personality, has tons of interesting information to knowledge-drop, and is worth spending time with.";
// const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sujan:mithur17@cluster0-6djav.mongodb.net/blogDB1", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String,
  by:String
  // fname:String
};

const Post = mongoose.model("Post", postSchema);

app.get("/ho",function(req,res){

  res.render("hom", {
    startingContent: homeStartingContent,
    // posts: posts
    });
});

app.get("/home", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    by:req.body.postBy
  });


  post.save(function(err){
    if (!err){
        res.redirect("/home");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content,
      by: post.by
    });
  });

});

app.get("/compose",function(req,res){
  res.redirect("/compose");
})

// app.get("/about", function(req, res){
//   res.render("about", {aboutContent: aboutContent});
// });

// app.get("/contact", function(req, res){
//   res.render("contact", {contactContent: contactContent});
// });






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
  }
  
});

const Login = mongoose.model("Login",loginschema);



app.get("/",function(req,res){
  res.render("signup");
  console.log("success");


});


app.post("/",function(req,res){

  const login = new Login({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email
});

login.save(function(err){
  if (!err){
     
      res.redirect("/ho");
  }
});
});




// app.listen(process.env.PORT|| 3000,function(){
//   console.log("started");

// })


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
