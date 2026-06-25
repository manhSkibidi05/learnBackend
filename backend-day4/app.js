    const mongoose = require('mongoose');
    const express = require('express');
    const routerProduct = require('./src/routes/product.routes')

    const app = express();
    app.use(express.json());

    app.use('/products' , routerProduct);


    // Kết nối đến MongoDB Atlas (thay connection string của bạn)
    const dbURI = 'mongodb://testMongoDB:LuonGiuBinhTinh@ac-yxra4gt-shard-00-00.pirpp6f.mongodb.net:27017,ac-yxra4gt-shard-00-01.pirpp6f.mongodb.net:27017,ac-yxra4gt-shard-00-02.pirpp6f.mongodb.net:27017/?ssl=true&replicaSet=atlas-3t8fg6-shard-0&authSource=admin&appName=moySkibidi05';

    mongoose.connect(dbURI)
        .then(() => {
            console.log('Kết nối MongoDB thành công');
            // Khởi động server sau khi kết nối DB
            const PORT = 3000;
            app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
            });
        })
        .catch(err => {
            console.error('Lỗi kết nối MongoDB:', err.message);
        });

    // -> mongoose.connect trả về 1 promise , ta dùng .then / .catch hoặc async/await để thông báo cho người dùng biết được đã kết nối thành công chưa
    // -> server chỉ khởi động sau khi kết nối thành công để tránh request đến khi database chưa sẵn sàng 
