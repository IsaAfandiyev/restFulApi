const express = require("express");
const app = express();
const port = 6606;
require("dotenv").config();
var cors = require("cors");
const Repository = require("./repository");
const Service = require("./service");
const repository = new Repository(process.env.CONNECTAPI);
const service = new Service(repository);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.post("/products", (req, res) => {
  service.newProduct(req.body.name, req.body.description);
  res.send("data created", 201);
});

app.get("/products", (req, res) => {
  service.allProducts().then((r) => {
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
  service.productById(req.params.id).then((r) => {
    res.send({
      id: r._id,
      name: r.name,
      description: r.description,
      date: r.date,
    });
  });
});

app.put("/products/:id", async (req, res) => {
  let p = await service.updateProductById(req.params.id, req.body);
  res.send({
    id: p._id,
    name: p.name,
    description: p.description,
    date: p.date,
  });
});

app.delete("/products/:id", async (req, res) => {
  await service.deleteProductById(req.params.id);
  res.send("", 204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
