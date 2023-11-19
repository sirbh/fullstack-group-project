const Product = require("../models/product");
const { getProductsJson } = require("../utils/product");
const responseUtils = require("../utils/responseUtils");

/**
 * Send all products as JSON
 *
 * @param {http.ServerResponse} response - Takes the servers response as an parameter
 * @returns {void} - returns all products as JSON
 */
const getAllProducts = async response => {
  // TODO: 10.2 Implement this
  const products = await Product.find({});
  return responseUtils.sendJson(response, products);
};

module.exports = { getAllProducts };