// Tầng routes 

    const express = require('express');
    const router = express.Router();
    const taskController = require('../controllers/task.controller');

    // định nghĩa route 

    router.get('/' , taskController.getAll);
    router.get('/:id' , taskController.getById);
    router.post('/' , taskController.create);
    router.patch('/' , taskController.update);
    router.delete('/:id' , taskController.remove);

    module.exports = router;

    // - sử dụng express.Router() tạo ra một router mini sau đó gắn vào app 
    // - express.Router() hoạt động giống 1 app mini , có thể gắn middleware và route , sau đó ta mount nó vào app

