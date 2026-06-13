// Thực hành trên postman 

    const express = require('express');
    const app = express();

    app.use(express.json());

    let tasks=[
        {id : 1 , title : 'Học node.js' , status : 'pending'},
        {id : 2 , title : 'Học react' , status : 'pending'},
        {id : 3 , title : 'Học express' , status : 'pending'},
        {id : 4 , title : 'Học mongo db' , status : 'pending'},
        {id : 5 , title : 'Học dsa' , status : 'done'},
    ];

    
    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`server dang chay http://localhost:${PORT}`)
    })