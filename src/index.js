import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  res.json({
    message: "Hello World"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});