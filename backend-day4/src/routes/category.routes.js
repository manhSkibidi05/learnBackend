// Tầng router : định nghĩa router gắn middleware , định nghĩa route , gọi controllers

    
        const express = require('express');
        const categoryController = require('../controllers/category.controller');
    
        const categoryRouter = express.Router();
    
        categoryRouter.get('/', categoryController.getAll);
        categoryRouter.get('/:id' , categoryController.getById);
        categoryRouter.post('/' , categoryController.create);
        categoryRouter.patch('/:id' , categoryController.update);
        categoryRouter.delete('/:id' , categoryController.remove);
    
        module.exports = categoryRouter;
        