// Định nghĩa tầng router

    const express = require('express');
    const productController = require('../controllers/product.controller');

    const productRouter = express.Router();

    productRouter.get('/', productController.getAll);
    productRouter.get('/:id' , productController.getById);
    productRouter.post('/' , productController.createPrd);
    productRouter.patch('/:id' , productController.updatePrd);
    productRouter.delete('/:id' , productController.removePrd);

    module.exports = productRouter;
    