// Thực hành trên postman 

    const express = require('express');
    const app = express();

    // middleware parse dữ liệu từ body của request
    app.use(express.json());

    // mô phỏng dữ liệu database
    let tasks=[
        {id : 1 , title : 'Học node.js' , status : 'pending'},
        {id : 2 , title : 'Học react' , status : 'pending'},
        {id : 3 , title : 'Học express' , status : 'done'},
        {id : 4 , title : 'Học mongo db' , status : 'pending'},
        {id : 5 , title : 'Học dsa' , status : 'done'},
    ];

    // định nghĩa các route

    app.get('/tasks' , (req ,res) => {
        const {status} = req.query;
        if(status){
            const filtered = tasks.filter(task => task.status === status);
            res.status(200).json({filtered})
        }
        res.status(200).json({tasks})
    });

    app.get('/tasks/:id' , (req , res) => {
        const idTask = parseInt(req.params.id);
        if(idTask){
            const result = tasks.filter(task => task.id === idTask);
            res.status(200).json({data : result})
        }
        return res.status(404).json({error : 'Task không tồn tại'});
    })

    
    // lắng nghe server ở cổng 3000 
    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`server dang chay http://localhost:${PORT}`)
    })