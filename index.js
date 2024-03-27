import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Define an in-memory store for posts
const postsStore = {
  drama1: [],
  drama2: [],
  drama3: []
};

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/drama1", (req, res) => {
  res.render("drama1", { posts: postsStore.drama1 });
});

app.get("/drama2", (req, res) => {
  res.render("drama2", { posts: postsStore.drama2 });
});

app.get("/drama3", (req, res) => {
  res.render("drama3", { posts: postsStore.drama3 });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Handle post creation for drama1
app.post("/drama1/posts", async (req, res) => {
  const { content } = req.body;
  postsStore.drama1.push(content);
  res.redirect("/drama1");
  console.log("New post content for Drama 1:", content);
});

// Handle post creation for drama2
app.post("/drama2/posts", async (req, res) => {
  const { content } = req.body;
  postsStore.drama2.push(content);
  res.redirect("/drama2");
  console.log("New post content for Drama 2:", content);
});

// Handle post creation for drama3
app.post("/drama3/posts", async (req, res) => {
  const { content } = req.body;
  postsStore.drama3.push(content);
  res.redirect("/drama3");
  console.log("New post content for Drama 3:", content);
});

// Handle updating a post
app.post("/edit/:drama/:index", async (req, res) => {
  const { drama, index } = req.params;
  const updatedContent = req.body.content;

  let posts;
  switch (drama) {
    case 'drama1':
      posts = postsStore.drama1;
      break;
    case 'drama2':
      posts = postsStore.drama2;
      break;
    case 'drama3':
      posts = postsStore.drama3;
      break;
    default:
      res.status(400).json({ success: false, error: "Invalid drama specified" });
      return;
  }

  if (!isNaN(index) && index >= 0 && index < posts.length) {
    // Store the updated content back into the same index
    posts[index] = updatedContent;
    console.log("Updated content at index " + index + ":", updatedContent);
    res.status(200).json({ success: true, message: "Post updated successfully" });
  } else {
    res.status(404).json({ success: false, error: "Post not found or invalid index" });
  }
});

// Handle deleting a post
app.delete("/delete/:drama/:index", async (req, res) => {
  const { drama, index } = req.params;
  let posts;

  switch (drama) {
    case 'drama1':
      posts = postsStore.drama1;
      break;
    case 'drama2':
      posts = postsStore.drama2;
      break;
    case 'drama3':
      posts = postsStore.drama3;
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
