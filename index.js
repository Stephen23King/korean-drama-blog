import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Log middleware setup
console.log("Body parser middleware:", bodyParser.urlencoded);

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

app.get("/:drama", (req, res) => {
  const { drama } = req.params;
  let posts;

  switch (drama) {
    case "drama1":
      posts = postsStore.drama1;
      break;
    case "drama2":
      posts = postsStore.drama2;
      break;
    case "drama3":
      posts = postsStore.drama3;
      break;
    default:
      posts = [];
  }
  res.render(drama, { posts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Handle post creation
app.post("/:drama/posts", async (req, res) => {
  const { drama } = req.params;
  const { content } = req.body;
  console.log("Received request body:", req.body); // Log the request body
  console.log("Content:", content); // Log the content field

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
      res.status(400).json({ success: false, error: "Invalid drama specified." });
      return;
  }
  posts.push(content);
  res.redirect(`/${drama}`);
  console.log(`New post content for ${drama}:`, content);
});

// Handle deleting a post
app.delete("/delete/:drama/:index", async (req, res) => {
  const { drama, index } = req.params;
  let posts;

  switch (drama) {
    case "drama1":
      posts = postsStore.drama1;
      break;
    case "drama2":
      posts = postsStore.drama2;
      break;
    case "drama3":
      posts = postsStore.drama3;
      break;
    default:
      res.status(400).json({ success: false, error: "Invalid drama specified." });
      return;
  }

  if (index >= 0 && index < posts.length) {
    posts.splice(index, 1);
    console.log("Comment deleted successfully.");
    res.json({ success: true, message: "Comment deleted successfully." });
  } else {
    res.status(404).json({ success: false, error: "Comment not found." });
  }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

// Handle errors
app.use((err, req, res, next) => {
  console.error("Error stack trace:", err.stack);
  res.status(500).send('Something broke!');
});
