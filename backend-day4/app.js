const mongoose = require('mongoose');

// Kết nối đến MongoDB Atlas (thay connection string của bạn)
const dbURI = 'mongodb+srv://testMongoDB:LuonGiuBinhTinh@cluster0.xxxxx.mongodb.net/product-api?retryWrites=true&w=majority';
// mongodb+srv://testMongoDB:LuonGiuBinhTinh@moyskibidi05.pirpp6f.mongodb.net/?appName=moySkibidi05

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