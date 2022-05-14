const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name").limit(4);
  res.status(200).json({ products });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, field } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    // * --> $regex is better for searching options ig
    queryObject.name = { $regex: name, $options: "i" }; // ->$regex = any value in names with req.params in it || i = case insensitive
  }
  // console.log(queryObject);

  let result = Product.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }

  // Fields
  if (field) {
    const fieldList = field.split(",").join(" ");
    result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 1;
  const skip = (page - 1) * 10;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };
