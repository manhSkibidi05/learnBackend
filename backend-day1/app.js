// Ngày 1 : Làm quen với node.js và express.js 

// - Các bước khởi tạo 1 chương trình chạy trên node.js 

    // Bước 1 : Tải node.js và kiểm tra phiển bản bằng lệnh node -v 

    // Bước 2 : Tạo thư mục cho chương trình đầu tiên và khơi tạo npm gồm các lệnh 
    // + mkdir backend-day1 : khởi tạo file backend-day1
    // + cd backend-day1 : di chuyển đến file này 
    // + npm init -y : tạo file package.json với các thông tin mặc định -> file này giúp quản lí thư viện và script cho dự án 

    // Bước 3 : Cài đặt express
    // + Express là web framework phổ biến nhất cho node.js , giúp tạo server nhanh chóng 
    // + npm install express : cài thành công express sẽ thấy có folder node_modules và file package-lock.json được tạo 

    // Bước 4 : Viết server 'hello world'

    // import express
    const express = require('express');
    const app = express()

    // định nghĩa 1 route GET tại đường dẫn gốc '/'
    app.get('/' , (req , res) => {
        res.json({message : 'hello from server !'});
    });

    // lắng nghe ở cổng 3000
    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`server đang chạy tại http://localhost:${PORT}`);
    });

    // -> chạy dự án bằng cách sử dụng lệnh : node app.js , lúc này hiện thị ra câu lệnh : server đang chạy tại http...
    // -> truy cập đường dẫn trên nó sẽ hiển thị JSON {message : 'hello from server !'} 
    // -> muốn dừng server dùng lệnh ctrl + c trong terminal 

    

// - Cơ chế Non-blocking I/O (đơn giản )

    // + node.js nổi tiếng với mô hình non-blocking I/O - tức là khi gặp tác vụ I/O (đọc file , truy vấn database , gọi API ) , nó không chặn luồn chính mà sẽ
    // giao việc đó cho hệ thống , rồi tiếp tục xử lí request khác . Khi tác vụ I/O hoàn tất , một callback được gọi để trả về kết quả 
    // -> cơ chế này giúp cho node.js xử lí hàng nhìn kết nối mà không cần nhiều tài nguyên 

    // định nghĩa 1 tác vụ non-block
    app.get('/non-block' , (req , res) => {
        setTimeout(() => {
            res.send('xong tác vụ non-block');
        },2000);
    });

// - Tìm hiểu sâu hơn :

    // + là người mới học về js khi bước vào node.js/express sẽ gặp các cú pháp hoàn toàn mới những đừng lo vì chúng vẫn là js 
    // -> giải thích chi tiết đoạn code của ngày 1 

    const express = require('express');   // (1)
    const app = express();                 // (2)

    app.get('/', (req, res) => {           // (3)
        res.json({ message: 'Hello from server!' });
    });

    const PORT = 3000;
    app.listen(PORT, () => {               // (4)
        console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });

    // (1) const express = require('express');
    // + require() là 1 hàm có sẵn của node.js dùng để nhập (import) một module -> module có thể là thư viện cài qua npm (express) , hoặc là file tự viện 
    // + khi gọi require('express') -> node.js tìm package 'express' trong thư mục node_modules load nó gán vào biến
    // + biến express thực chất là 1 hàm (factory function) - gọi nó để tạo ứng dụng
    // + trong frontend hiện đại bạn dùng import express from 'express' , theo node.js truyền thống sử dụng require 

    // -> hàm require của node.js tương tự lệnh import cho phép nhập dữ liệu từ module khác (file khác) về file hiện tại để sử dụng 
    // -> khi require('express') bạn đang lấy thư viện express về file này và sử dụng , trả về là 1 địa chỉ của hàm express (factory function)

    // (2) const app = express();
    // + gọi hàm express() dựa trên địa chỉ của được trả về lúc require -> tạo ra 1 đối tượng ứng dụng Express (thường đặt tên là app)
    // + đối tượng app này đại diện cho toàn bộ web server của bạn , chứa tất cả các cài đặt (routes , middleware , template engine...)
    // + bạn sẽ dùng app để định nghĩa router , lắng nghe kết nối...

    // -> gọi hàm express() nó sẽ trả về 1 đối tượng đại diện cho toàn bộ web server 
    // -> đối tượng này cung cấp các phương thức , thuộc tính của web server 
    
    // (3) app.get('/', (req, res) => { ... });
    // + đây là cách định nghĩa một route handle cho HTTP GET đến đường dẫn / 
    // + sử dụng get() là phương thức của đối tượng app để định nghĩa route
    // + tham số đầu tiên của get() : '/' là đường dẫn phần sau của domain -> đường dẫn kế tiếp sau máy chủ 'http://localhost:3000/'
    // + tham số thứ hai của get() : là 1 hàm callback được thực thi khi có request khớp 
    // + hàm callback có 2 tham số req và res :
        // - req (request) : là 1 đối tượng chứa thông tin từ client gửi lên (url , header , dữ liệu từ form...)
        // - res (response) : là 1  đối tượng gửi lại phản hồi về client gồm các phương thức (send() , json()...)
    // + res.json({message:...}) : câu lệnh này tạo thiết lập header , chuyển obj js thành chuỗi json , gửi phản hồi với status code mặc định 200(OK)

    // -> sử dụng phương thức get của đối tượng app (đại diện cho web server) để định nghĩa route 
    // -> 2 tham số của get() gồm '\' : đường dẫn sau domain , hàm callback gọi lại sau khi gặp request
    // -> hàm callback có 2 tham số req và res : req - request là đối tượng nhận thông tin từ client gửi , res - response là đối tượng gửi phản hồi về client
    
    // (4) app.listen(PORT, () => { ... });
    // + sử dụng phương thức listen() do đối tượng web server cung cấp : dùng để khởi động server HTTP lắng nghe các kết nối đến trên 1 cổng port cụ thể
    // + tham số đầu tiên là số cổng (3000)
    // + tham số thứ hai là callback : hàm callback sẽ được chạy khi server sẵn sàng thường câu lệnh bên trong là thông báo cho dev biết server đã được tạo 

    // -> phương thức listen dùng để lắng nghe các kết nối tới cổng port và khởi tạo server chạy trên HTTP
    // -> listen gồm 2 phương thức : PORT -> số cổng , hàm callback thông báo server đã được tạo 

    // => các câu lệnh trên hoàn toàn là js điểm mới là thư viện express cung cấp các phương thức để xây dựng server 