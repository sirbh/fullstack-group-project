const { getProductsJson } = require("../utils/product");
const responseUtils = require("../utils/responseUtils");

/**
 * Send all products as JSON
 *
 * @param {http.ServerResponse} response
 */
const getAllProducts = async response => {
  // TODO: 10.2 Implement this
  const products = getProductsJson();
  return responseUtils.sendJson(response, products);
};

module.exports = { getAllProducts };