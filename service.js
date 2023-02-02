module.exports = class Service {
  constructor(repository) {
    this.repository = repository;
  }

  newProduct(name, description) {
    this.repository.newProduct(name, description);
  }

  allProducts() {
    return this.repository.allProducts();
  }
  async deleteProductById(id) {
    await this.repository.deleteProductById(id);
  }
  productById(id) {
    return this.repository.productById(id);
  }
  async updateProductById(id, body) {
    let p = await this.repository.productById(id);
    p.name = body.name ? body.name : p.name;
    p.description = body.description ? body.description : p.description;
    p.date = body.date ? body.date : p.date;
    p.save();
    return p;
  }
};
