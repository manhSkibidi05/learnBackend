// Ôn lại toàn bộ kiến thức đã học ngày 1 : 

    // - client (máy khách) : là 1 trình duyệt hoặc 1 phần mềm dùng để hiện thị giao diện cho người dùng nó thu thập các thao tác trên trình duyệt
    // đề gửi về server thông qua http request và nhận dữ liệu trả lại từ server thông qua http response
    // -> ngôn ngữ giúp hiện thị giao diện người dùng gồm html , css , js 

    // - server (máy chủ) : là 1 máy tính hoặc 1 chương trình dùng để nhận các yêu cầu từ client thông qua http request sau đó sẽ tiến hành 
    // các bước để xử lí yêu cầu đó rồi trả về dữ liệu cho client thông qua http response. Ngoài ra server có thể giao tiếp với database để thao tác với dữ liệu 
    // -> để chạy js ở phía server cần cài node.js

    // - database (cơ sở dữ liệu) : là một kho lưu trữ dữ liệu một cách có tổ chức , cách giao tiếp với client thông qua server bằng các thư viện bên ngoài
    // có thể thêm , sửa , xóa dữ liệu ... 
    // -> database chia ra 2 kiểu lưu trữ là sql và no sql

    // - node.js : là môi trường cung cấp cho js chạy ở ngoài trình duyệt , ngoài ra node.js cung cấp nhiều module có sẵn trong đó có express
    
    // - express.js : là thư viện cung cấp cho js các phương thức để tạo ra 1 web server một cách đơn giản và có tổ chức hơn 

    // - web server : là máy chủ của website tạo ra để nhận yêu cầu từ client rồi xử lí thông qua middleware , đưa về route phù hợp sau đó gửi lại dữ liệu về client
    
    // - route : là nơi giúp phân biệt http request của người dùng thuộc loại nào thông qua method và url 
        // + method là phương thức xử lí mà client yêu cầu gồm : GET , POST , PUT , DELETE 
        // + url là đường dẫn phía sau máy chủ dùng để xác nhận xem yêu cầu xử lí cho dữ liệu nào 
    // -> việc chia route ra giúp việc tìm và xử lí yêu cầu rõ ràng hơn , dễ dàng fix bug hơn
    
    // - Cách tạo 1 web server = express 

    // import thư viện express vào file để sử dụng
    const express = require('express');
    // khởi chạy express là 1 hàm trả về 1 đối tượng chứa các phương thức cần thiết để tạo web server
    const app = express();
    
    // định nghĩa route đầu tiên sẽ chạy khi vừa khởi chạy server -> bằng phương thức get gồm đường dẫn url và hàm callback chứa req , res
    app.get('/' , (req , res) => {
        res.json({message : 'thông báo từ server'})
    });
    
    // khởi tạo cổng 3000
    const PORT = 3000;
    // chạy server trên cổng 3000 -> bằng phương thức listen gôgm cổng lắng nghe và hàmm callback thông báo cho biết đã chạy
    app.listen(PORT , () => {
        console.log('server đang được chạy ở http://localhost:3000');
    })




