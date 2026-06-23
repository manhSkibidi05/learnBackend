// Tầng routes định nghĩa router bằng cách định nghĩa route và middleware bên trong router 

    const express = require('express');
    const productRouter = express.Router();

    const productController = require('../controllers/product.controller');

    productRouter.get('/' , productController.getAll);
    productRouter.get('/:id' , productController.getById);
    productRouter.post('/' , productController.createPrd);
    productRouter.patch('/:id' , productController.updatePrd);
    productRouter.delete('/:id' , productController.removePrd);

    module.exports = productRouter;
    