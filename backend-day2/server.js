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
        const result = tasks.find(task => task.id === idTask);

        if(!result){
            return res.status(404).json({error : 'Task không tồn tại'});
        }

        res.status(200).json({data : result});
    });

    app.post('/tasks' , (req , res) => {
        const {title} = req.body;

        if(!title){
            return res.status(400).json({error : 'Thiếu dữ liệu gửi về'})
        }

        const newTask = {
            id : tasks.length + 1,
            title,
            status : 'pending'
        }
        tasks.push(newTask);
        res.status(201).json({data : newTask})
    });

    app.patch('/tasks/:id' , (req , res) => {
        const idTask = parseInt(req.params.id); 
        const result = tasks.find(task => task.id === idTask);

        if(!result){
            return res.status(404).json({error : 'Task không tồn tại'});
        } 

        const {status} = req.body;
        if(!status || !['pending' , 'done'].includes(status)){
            return res.status(400).json({error : 'Dữ liệu không hợp lệ (pending hoặc done)'});
        }

        result.status = status;
        res.status(200).json({data : result});
    });

    app.delete('/tasks/:id' , (req , res) => {
        const idTask = parseInt(req.params.id);
        const task = tasks.find(val => val.id === idTask);
        if(!task){
            return res.status(404).json({error : 'Task không tồn tại'});
        }

        tasks = tasks.filter(val => val.id !== idTask);
        res.status(200).json({data : 'Đã xóa thành công'})
    })


    // lắng nghe server ở cổng 3000 
    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`server dang chay http://localhost:${PORT}`)
    })