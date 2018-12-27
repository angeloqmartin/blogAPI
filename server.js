const express = require("express");
const app = express();
const blogRouter = require("./blogRouter");

app.use(express.json());
app.use("/blog-post", blogRouter)

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});