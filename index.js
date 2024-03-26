import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let drama1Posts = [];
let drama2Posts = [];
let drama3Posts = [];

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/drama1", (req, res) => {
  res.render("drama1", { posts: drama1Posts });
});

app.get("/drama2", (req, res) => {
  res.render("drama2", { posts: drama2Posts });
});

app.get("/drama3", (req, res) => {
  res.render("drama3", { posts: drama3Posts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Handle post creation for drama1
app.post("/drama1/posts", (req, res) => {
  const { content } = req.body;
  drama1Posts.push(content);
  res.redirect("/drama1");
  console.log("New post content for Drama 1:", content);
});

// Handle post creation for drama2
app.post("/drama2/posts", (req, res) => {
  const { content } = req.body;
  drama2Posts.push(content);
  res.redirect("/drama2");
  console.log("New post content for Drama 2:", content);
});

// Handle post creation for drama3
app.post("/drama3/posts", (req, res) => {
  const { content } = req.body;
  drama3Posts.push(content);
  res.redirect("/drama3");
  console.log("New post content for Drama 3:", content);
});

// Handle updating a post for drama1
app.post("/edit/drama1/:index", (req, res) => {
  const index = parseInt(req.params.index); // Parse index to ensure it's a number
  const updatedContent = req.body.content;

  // Check if the index is valid and within the bounds of the drama1Posts array
  if (!isNaN(index) && index >= 0 && index < drama1Posts.length) {
    drama1Posts[index] = updatedContent;
    console.log("Updated content at index " + index + ":", updatedContent);
    res.status(200).json({ success: true, message: "Post updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "Post not found or invalid index" });
  }
});

// Handle updating a post for drama2
app.post("/edit/drama2/:index", (req, res) => {
  const index = parseInt(req.params.index); // Parse index to ensure it's a number
  const updatedContent = req.body.content;

  // Check if the index is valid and within the bounds of the drama2Posts array
  if (!isNaN(index) && index >= 0 && index < drama2Posts.length) {
    drama2Posts[index] = updatedContent;
    console.log("Updated content at index " + index + ":", updatedContent);
    res.status(200).json({ success: true, message: "Post updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "Post not found or invalid index" });
  }
});

// Handle updating a post for drama3
app.post("/edit/drama3/:index", (req, res) => {
  const index = parseInt(req.params.index); // Parse index to ensure it's a number
  const updatedContent = req.body.content;

  // Check if the index is valid and within the bounds of the drama3Posts array
  if (!isNaN(index) && index >= 0 && index < drama3Posts.length) {
    drama3Posts[index] = updatedContent;
    console.log("Updated content at index " + index + ":", updatedContent);
    res.status(200).json({ success: true, message: "Post updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "Post not found or invalid index" });
  }
});

// Handle deleting a post
app.delete("/delete/:drama/:index", (req, res) => {
  const { drama, index } = req.params;
  let posts;

  switch (drama) {
    case 'drama1':
      posts = drama1Posts;
      break;
    case 'drama2':
      posts = drama2Posts;
      break;
    case 'drama3':
      posts = drama3Posts;
      break;
    default:
      res.status(400).json({ success: false, error: "Invalid drama specified" });
      return;
  }

  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
    res.json({ success: true, message: "Comment deleted successfully" });
  } else {
    res.status(404).json({ success: false, error: "Comment not found" });
  }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
