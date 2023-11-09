const products = require('../products.json');

const getProductsJson = ()=>{
    return products.map(product => ({...product }));
};

module.exports = { getProductsJson };