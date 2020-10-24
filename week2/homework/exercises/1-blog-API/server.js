const express = require('express')
const app = express();
const fs = require("fs");
 

// YOUR CODE GOES IN HERE

//Body Parser Middleware
app.use(express.json());//recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({ extended: false }));//*******recognize the incoming Request Object as strings


app.get('/', function (req, res) {
  res.send('Hello World')
})

//POST    
app.post('/blogs', (req, res) => {
  //new post
  const newBlogPost = {
    title: req.body.title, 
    content: req.body.content
}
  //title and content must be send with the request
  if(!newBlogPost.title || !newBlogPost.content) {
    return res.status(400).json({ msg: 'Please include title and content' });
  }
  // get the title and content from the request
  fs.writeFileSync(newBlogPost.title, newBlogPost.content);
  res.end('ok, post');
})

//PUT
app.put('/posts/:title', (req, res) => {
  // How to get the title and content from the request?
  // What if the request does not have a title and/or content?
  if (fs.existsSync(req.params.title)) {
    fs.writeFileSync(req.params.title, req.body.content);
    res.end('ok, put')
  }
  else {
    // Send response with error message
    res.status(404);
    res.end('This post does not exist!');
  }
})

//DELETING
app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  if (fs.existsSync(req.params.title)) { // Add condition here
    fs.unlinkSync(req.params.title);
    res.end('ok');
  } else {
    // Respond with message here
    res.status(404);
    res.end('This post does not exist!');
  }
})

//READING
app.get('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  // check if post exists
  if(fs.existsSync(req.params.title)){
    const post = fs.readFileSync(req.params.title);
    res.send(post);
  } else{
    // Respond 
    res.status(404);
    res.end('Sorry, this post does not exist!');
  }

})

// set the port number
const PORT = process.env.PORT || 3000;
//listen on a port
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));

