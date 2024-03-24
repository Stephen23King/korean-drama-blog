import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let drama1Posts = [];
let drama2Posts = [];
let drama3Posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

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
  console.log("New Post Content for Drama 1:", content);
});

// Handle post creation for drama2
app.post("/drama2/posts", (req, res) => {
  const { content } = req.body;
  drama2Posts.push(content);
  res.redirect("/drama2");
  console.log("New Post Content for Drama 2:", content);
});

// Handle post creation for drama3
app.post("/drama3/posts", (req, res) => {
  const { content } = req.body;
  drama3Posts.push(content);
  res.redirect("/drama3");
  console.log("New Post Content for Drama 3:", content);
});

// Update an existing comment
app.put("/edit/:drama/:index", (req, res) => {
  const { drama, index } = req.params;
  const updatedContent = req.body.content;
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
    posts[index] = updatedContent;
    res.json({ success: true, message: "Comment updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "Comment not found" });
  }
});

// Handle deleting a post
app.post("/delete/:drama/:index", (req, res) => {
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
    res.redirect(`/${drama}`);
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
