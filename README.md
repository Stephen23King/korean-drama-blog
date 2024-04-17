# korean-drama-blog
W.I.P. - EJS and JS version w/ Bootstrap

* HOW TO RUN CODE: clone to your VSCode, cd into the correct directory, and use nodemon index.js to run code locally on localhost:3000 (or preferred port) in your web browser.

Description:
Blog website more of a top 3 personal favorite kdramas site with descriptions of each kdrama and a comment section. Can add comment, edit comment, and delete comment. Footer links can be replaced with personal or other webpages/social media links.

NOTES:
- Some functionality not ready/working:
  * No authorization needed since running locally
  * Contact page not fully functional.
- BUG/ERROR: adding and deleting comments work. BUT, when editing and then confirming your edited comment, THEN adding a new comment, any previous comments that were edited disappear. Needs a fix when it 
  comes to the comments stored inside the indexes, or some way of storing the edited comments so the newly edited comments don't dissapear whenever a new comment is added.
