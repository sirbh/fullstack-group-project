const {getProductsJson} = require('../../utils/product');
const { expect } = require("chai");

const productsData = require('../../products.json').map(product => ({ ...product }));

describe('Products Utils', () => {
    describe('getProductsJson()', () => {
         it("should return all products as JSON", async () => {
               const products = getProductsJson();
               expect(products).to.not.be.null;
               expect(products.length).to.equal(5);
               expect(products).to.be.deep.equal(productsData);
         });
    });
  });