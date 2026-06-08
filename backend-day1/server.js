// Ví dụ hoàn chỉnh : Tạo web server nhỏ với nhiều route 

    const express = require('express');
    const app = express();

    // middleware để parse JSON body (cho POST , PUT)
    app.use(express.json());

    // Dữ liệu giả lập 
    let tasks = [
        {id : 1 , title : 'Học node.js' , done: false},
        {id : 2 , title : 'Học javascript' , done : true}
    ];

    // Route chạy khi vừa tạo server
    app.get('/' , (req , res) => {
        res.send('Server đã sẵn sàng ')
    })


    // Route lấy tất cả tasks 
    app.get('/api/tasks' , (req , res) => {
        res.json(tasks);
    });

    // Route lấy task theo id 
    app.get('/api/tasks/:id' , (req , res) => {
        const id = parseInt(req.params.id);
        const task = tasks.find(task => task.id === id);
        if(!task) return res.status(404).json({error : 'Không tìm thấy task'});
        res.json(task);
    });

    // Route tạo task mới 
    app.post('/api/tasks' , (req , res) => {
        const {title} = req.body;
        if(!title) return res.status(400).json({error : 'thiết title'});
        const newTask = {
            id : tasks.length + 1,
            title,
            done : false
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    })

    // Route xóa 1 task 
    app.delete('/api/tasks/:id' , (req , res) => {
        const id = parseInt(req.params.id);
        const index = tasks.findIndex(task => task.id === id);
        if(index === -1) return res.status(404).json({error : 'Không tìm thấy id'});
        tasks.splice(index , 1);
        res.json({message : 'Xóa thành công'});
    })

    // Khởi động server 
    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`web server đã sẵn sàng tại http://localhost:${PORT}`);
    })