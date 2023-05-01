import express from "express";
import categories from "./data/categories.json" assert { type: "json" };
import news from "./data/news.json" assert { type: "json" };
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Home page on server side");
});

app.get("/category", (req, res) => {
  res.send(categories);
});

app.get("/category/:id", (req, res) => {
  const id = req.params.id;

  const findCategoryById = news.filter(
    (category) => category.category_id === id
  );

  if (id == 0) {
    res.send(news);
  } else {
    if (findCategoryById.length == 0) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID parameter",
      });
    }
  }

  res.send(findCategoryById);
});

// NEWS -----------<<<<<<<<>
app.get("/news", (req, res) => {
  res.send(news);
});

app.get("/news/:id", (req, res) => {
  const id = req.params.id;

  const findNewsById = news.find((news) => news._id === id);
  if (!findNewsById) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID parameter",
    });
  }

  res.send(findNewsById);
});

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
