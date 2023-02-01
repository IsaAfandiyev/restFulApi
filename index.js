const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 6606;
require("dotenv").config();
var cors = require("cors");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

mongoose
  .connect(process.env.CONNECTAPI)
  .then(() => console.log("connected to Mongoose!"));

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
});

const productModel = mongoose.model("products", productSchema);

app.post("/products", (req, res) => {
  console.log("console", req.body);

  const newProductSchema = new productModel({
    name: req.body.name,
    description: req.body.description,
    date: new Date(),
  });

  newProductSchema.save((err, doc) => {
    console.log("err", err);
    console.log("doc", doc);
  });
  res.send("data created", 201);
});

app.get("/products", (req, res) => {
  productModel.find().then((r) =>
    res.send(
      r.map((q) => {
        return {
          id: q._id,
          name: q.name,
          description: q.description,
          date: q.date,
        };
      })
    )
  );
});

app.get("/products/:id", (req, res) => {
  productModel.findById(req.params.id).then((r) =>
    res.send({
      id: r._id,
      name: r.name,
      description: r.description,
      date: r.date,
    })
  );
});

app.put("/products/:id", async (req, res) => {
  let p = await productModel.findById(req.params.id);
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
  await productModel.findByIdAndDelete(req.params.id);
  res.send("", 204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
