import express from "express";
import { userRouter } from "./routes/user.js";
import { postsRouter } from "./routes/post.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postsRouter);

app.get("/", (req, res, next) => {
  res.send("I am working");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
