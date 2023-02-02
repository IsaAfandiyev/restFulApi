const mongoose = require("mongoose");

module.exports = class Repository {
  constructor(connectionString) {
    mongoose
      .connect(connectionString)
      .then(() => console.log("connected to Mongoose!"));

    const productSchema = new mongoose.Schema({
      name: String,
      description: String,
      date: Date,
    });

    const productModel = mongoose.model("products", productSchema);

    this.mongoose = mongoose;
    this.productModel = productModel;
  }
  newProduct(name, description) {
    const np = new this.productModel({
      name: name,
      description: description,
      date: new Date(),
    });

    np.save((err, doc) => {
      console.log("err", err);
      console.log("doc", doc);
    });
  }

  allProducts() {
    return this.productModel.find();
  }

  productById(id) {
    return this.productModel.findById(id);
  }

  deleteProductById(id) {
    return this.productModel.findByIdAndDelete(id);
  }
};
