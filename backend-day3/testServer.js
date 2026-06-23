// file chính tạo sever gắn các middleware và router vào server 

    const express = require('express');
    const app = express();

    app.use(express.json());

    const productRouter = require('./src/routes/product.routes');
    app.use('/products' , productRouter);

    app.use((req , res ) => {
        res.status(404).json({error : 'enpoint không tồn tại'});
    })

    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`Server đang được chạy tại http://localhost:${PORT}`)
    })