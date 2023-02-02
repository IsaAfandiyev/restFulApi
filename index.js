const express = require("express");
const app = express();
const port = 6606;
require("dotenv").config();
var cors = require("cors");
const Repository = require("./repository");
const repository = new Repository(process.env.CONNECTAPI);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.post("/products", (req, res) => {
  console.log("console", req.body);
  repository.newProduct(req.body.name, req.body.description);
  res.send("data created", 201);
});

app.get("/products", (req, res) => {
  repository.allProducts().then((r) => {
    res.send(
      r.map((q) => {
        return {
          id: q._id,
          name: q.name,
          description: q.description,
          date: q.date,
        };
      })
    );
  });
});

app.get("/products/:id", (req, res) => {
  repository.productById(req.params.id).then((r) => {
    res.send({
      id: r._id,
      name: r.name,
      description: r.description,
      date: r.date,
    });
  });
});

app.put("/products/:id", async (req, res) => {
  let p = await repository.productById(req.params.id);
  p.name = req.body.name ? req.body.name : p.name;
  p.description = req.body.description ? req.body.description : p.description;
  p.date = req.body.date ? req.body.date : p.date;
  p.save();
  res.send({
    id: p._id,
    name: p.name,
    description: p.description,
    date: p.date,
  });
});

app.delete("/products/:id", async (req, res) => {
  await repository.deleteProductById(req.params.id);
  res.send("", 204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
