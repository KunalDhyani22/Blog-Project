//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});
mongoose.set('strictQuery', false);

const postSchema = {
  title: String,
  body: String
}
const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res) => {
  Post.find({}, function (err, posts) {
    res.render("home", {para: homeStartingContent, posts: posts});
    
  });
});
app.get("/about", (req, res) => {
  res.render("about", {para: aboutContent});
})
app.get("/contact", (req, res) => {
  res.render("contact", {para: contactContent});
})
app.get("/compose", (req, res) => {
  res.render("compose");
})
app.get("/posts/:x", (req, res) => {
  let reqTitle = req.params.x;
  Post.findOne({_id: reqTitle}, function (err, result) {
    if(!err){
      res.render("post", {title: result.title, detail: result.body});
    }
  });
})

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    body: req.body.postBody
  });
  post.save(function (err) {
    if(!err){
      res.redirect("/");
    }
  });

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//Older code without Database
// //jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// var lodash = require('lodash');
// const mongoose = require('mongoose');

// mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});
// mongoose.set('strictQuery', false);

// const postSchema = {
//   title: String,
//   detail: String
// }
// const Post = mongoose.model("Post", postSchema);

// const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
// const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
// let posts = [];

// const app = express();

// app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));


// app.get("/", (req, res) => {

//   res.render("home", {para: homeStartingContent, posts: posts});
// })
// app.get("/about", (req, res) => {
//   res.render("about", {para: aboutContent});
// })
// app.get("/contact", (req, res) => {
//   res.render("contact", {para: contactContent});
// })
// app.get("/compose", (req, res) => {
//   res.render("compose");
// })
// app.get("/posts/:x", (req, res) => {
//   let reqTitle = lodash.lowerCase(req.params.x);
//   posts.forEach((post)=>{
//     if(lodash.lowerCase(post.title) === reqTitle){
//       res.render("post", {title: post.title, detail: post.body});
//     }
//   })
// })

// app.post("/compose", (req, res) => {
//   const post = new Post({
//     title: req.body.postTitle,
//     detail:req.body.postBody
//   });
//   post.save();

//   // const post = {
//   //   title: req.body.postTitle,
//   //   body: req.body.postBody
//   //   };
//   //   posts.push(post);
//     res.redirect("/");
// })








// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
