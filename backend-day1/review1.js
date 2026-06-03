// review ngày 1 : Làm quen về node.js và express.js 

    // Khối lệnh hello world đầu tiên

    const express = require('express');   // (1)
    const app = express();                 // (2)

    app.get('/', (req, res) => {           // (3)
        res.json({ message: 'Hello from server!' });
    });

    const PORT = 3000;
    app.listen(PORT, () => {               // (4)
        console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });

    // (1) nhập thư viện express từ modules node.js để sử dụng 
    // -> thông qua hàm require() hoặc có thể dùng import thì kết quả trả về là 1 hàm express

    // (2) khởi chạy hàm express() -> trả về là 1 đối tượng đặt tên là app đại diện cho web server
    // -> thông qua đối tượng app có thể sử dụng các phương thức để tạo kết nối

    // (3) sử dụng phương thức get() của đối tượng app , get gồm 2 đối số cần truyền vào
    // + '/' : đường dẫn sẽ được nối tiếp đằng sau máy chủ 
    // + (req , res) : hàm callback được gọi lại sau khi gặp route phù hợp 
        // -> req : request nhận yêu cầu được gửi từ client về
        // -> res : response gửi yêu cầu trả lại client 
    
    // (4) sử dụng phương thức listen() của đối tượng app giúp tạo server với cổng 3000
    // + PORT : cổng server chạy 
    // + hàm callback : gọi lại khi server chạy thành  công và in ra thông báo trên console
