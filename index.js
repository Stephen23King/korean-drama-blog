import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/drama1", (req, res) => {
  // Pass the posts array to the template
  res.render("drama1", { posts: posts });
});

app.get("/drama2", (req, res) => {
  res.render("drama2");
});

app.get("/drama3", (req, res) => {
  res.render("drama3");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Handle post creation
app.post("/posts", (req, res) => {
  const { content } = req.body;
  posts.push(content);
  res.redirect("/drama1");
  console.log("New Post Content:", content);
});

// Update an existing comment
app.put("/edit/:index", (req, res) => {
  const index = req.params.index;
  const updatedContent = req.body.content;

  // Update the content of the comment at the specified index
  if (index >= 0 && index < posts.length) {
    posts[index] = updatedContent;
    res.json({ success: true, message: "Comment updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "Comment not found" });
  }
});

// Handle deleting a post
app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect("/drama1");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
