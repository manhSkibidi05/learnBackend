// file chính chứa app 

    const express = require('express');
    const app = express();

    // middleware xử lí dữ liệu được gửi trong phần thân request
    app.use(express.json());

    // mount router  
    const productRoutes = require('./src/routes/task.routes');
    app.use('/products' , productRoutes);

    // middleware xử lý lỗi nếu không có route nào khớp 
    app.use((req , res) => {
        res.status(404).json({error : 'Endpoint không tồn tại'});
    });

    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`Server đang được chạy tại http://localhost:${PORT}`)
    })

    // - app.use('/products' , productRoutes) nghĩa là tất cả route có trong productRoutes sẽ được
    // gắn tiền tố /products 