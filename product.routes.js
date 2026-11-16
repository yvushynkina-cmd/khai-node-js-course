const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');
const router = express.Router();

router.get('/products', (request, response) => {
   return response.json(products);
});

router.get('/products/id/:id', (request, response) => {
   const productId = parseInt(request.params.id, 10);
   const product = products.find(p => p.id === productId);

   if (!product) {
      return response.status(404).json({ message: 'Product not found' });
   }

   return response.json(product);
});

router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params;
   const filteredProducts = products.filter(product => product.brand === brand);

   return response.json(filteredProducts);
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ");
   err.statusCode = 400;
   throw err;
});

module.exports = router;