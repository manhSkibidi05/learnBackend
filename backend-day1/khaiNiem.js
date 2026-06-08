// - Các khái niệm cơ bản về Client - Server - Database - Node.js - Express

    // 1. Client - Máy khách 
    // - Client (máy khách) : Là bất kỳ thiết bị hoặc phần mềm nào gửi yêu cầu (request) đến server để lấy thông tin hoặc yêu cầu thực hiện hành động 
        // + Vd phổ biến : trình duyệt (chrome , firefox) , ứng dụng di động , postman hoặc 1 ứng dụng react
        // + Vai trò : Hiện thị giao diện người dùng (UI) , thu tập các tương tác , sau đó tạo HTTP request gửi đến server
        // + Ngôn ngữ : HTML , CSS , JavaScript (chạy trên trình duyệt)
    // Vd : Khi bạn gõ http://localhost:3000 và nhấn enter thì trình duyệt là client nó gửi http request đến server và lắng nghe ở cổng 3000

    // 2. Server - Máy chủ 
    // - Server (máy chủ) : Là một chương trình (hoặc máy tính) chạy liên tục , lắng nghe các yêu cầu từ client , xử lý và trả về kết quả 
        // + Vai trò : 
            // - Nhận HTTP request (GET , POST , PUT , DELETE...)
            // - Điều hướng các yêu cầu đến các hàm xử lí (route)
            // - Xử lí logic nghiệp vụ (tính toán , xác thực , đọc/ghi dữ liệu )
            // - Trả về HTTP response (thường là JSON , HTML , file ảnh...)
        // + Phần mềm server : Node.js (với Express) chính là một chương trình server được viết bằng js
    // Vd : Trong dự án Node.js của bạn khi chạy node app.js -> bạn đang khởi động 1 web server trên chính dự án của mình  

    // 3. Database - Cơ sở dữ liệu 
    // - Database (cơ sở dữ liệu) : Là nơi lưu trữ dữ liệu có tổ chức , cho phép truy vấn , cập nhật và xóa một cách hiệu quả . Nó tách biệt với server
    // để đảm bảo dữ liệu tồn tại lâu dài ngay cả khi server khởi động lại 
        // + Vd : MongoDB (no sql) , MySql ...
        // + Vai trò : Lưu trữ thông tìn người dùng , bài viết , cài đặt ... Server (máy chủ) sẽ giao tiếp với database thông qua các thư viện (mongoose ...)
        // + Lưu ý : Database cũng là một chương trình chạy riêng (có thể trên cùng máy hoặc máy khác)

    // 4. Node.js Runtime 
    // - Node.js là môi trường chạy JavaScript được được xây dựng trên V8 engine của Chrome , cho phép JavaScript chạy bên ngoài trình duyệt đó là cho phép
    // JavaScript chạy trên server (máy chủ).
    // - Thành phần chính : 
        // + V8 engine : Biên dịch và thực thi code JavaScript 
        // + libuv : Thư viện C++ cung cấp cơ chế non-blocking I/O và event loop cho phép xử lí bất đồng bộ hàng nghìn kết nối cùng lúc 
        // + Các module sẵn có : http , fs , path , os... Giúp xây dựng server , đọc file , làm việc với hệ thống 
    // - Node.js không phải là server mà là nền tảng tạo ra web server bằng code JS
    // Vd : Khi bạn cài Node.js bạn có thể chạy file.js trên máy tính như 1 ứng dụng bình thường thay vì phải nhúng vào trang web

    // 5. Express.js Framework 
    // - Express là một web framework tối giản dành cho Node.js , cung cấp 1 lớp trừu tượng cao hơn để xây dựng web server và API một cách nhanh chóng và sạch sẽ 
    // - Tác dụng chính : 
        // + Định tuyến (routing) dễ dàng với app.get() , app.post()...
        // + Hệ thống middleware linh hoạt (xử lí request trước khi đến route cuối)
        // + Tích hợp nhiều module hữu ích : parse body , CORS , nén , session...
        // + Chuẩn hóa cách tổ chức code (controllers , views , models)
    // - Mối quan hệ với node.js : Express dùng module http của Node.js tạo server , nhưng nó che đi sự phức tạp .

// -> Mối liên kết với ngày 1 : 
    // - node.js cung cấp môi trường runtime cho phép javascript có thể chạy trên server -> nền tảng cho phép chạy file app.js
    // - express tạo ra web server bằng javascript -> phần bạn đã code const app = express()... 

// - Các khái niêm cơ bản tiếp : 
    // - Node.js tạo môi trường cho javascript chạy được ở phía server 
    // - Express cung cấp các phương thức giúp tạo web server đơn giản hơn 

    // 6. Web server
    // - Hãy tạm quên Express đi , bắt đầu với Node.js thuần . Một web server đơn giản là một chương trình thực hiện các công việc là :
        // 1. Lắng nghe 1 cổng port trên máy tính 
        // 2. Khi có request từ client gửi đến , nó nhận được 2 đối tượng : 
            // + request (req) : Chứa thông tin client hỏi gì (method , URL , headers , body...)
            // + response (res) : Dùng để trả lời lại client
        // 3. Server xử lý và gửi response về 
        // - Với node.js bạn sử dụng module http có sẵn để tạo server : 

        const http = require('http');

        const server = http.createServer((res , req) => {
            // hàm callback chạy khi có request đén
            console.log('Có request : ' , req.method , req.url);

            // trả về text đơn giản 
            res.writeHead(200 , {'content-Type' : 'text/plain'});
            res.end('Hello from node.js server');
        });

        server.listen(3000 , () => {
            console.log('server đang chạy tại http://localhost:3000');
        });

        // -> vấn đề của cách này mọi request nó đều trả lời giống nhau dù bạn gõ / , /about ... Nó Không phân biệt được bạn muốn gì bạn tự kiểm tra
        // res.method và req.url bằng if...else 

        const server2 = http.createServer((req , res) => {
            // req.method cho biết yêu cầu người dùng sử dụng phương thức gì 
            // req.url cho biết sau địa chỉ máy chủ có thêm đường dẫn nào khác không 
            if(req.method === 'GET' && req.url === '/'){
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Trang chủ' }));
            } else if (req.method === 'GET' && req.url === '/about') {
                res.end('Giới thiệu');
            } else {
                res.writeHead(404);
                res.end('Không tìm thấy');
            }

        })
        // -> Vấn đề cách này là trở nên lộn xộn khi có quá nhiều endpoint . Và route ra đời để giải quyết vấn đề này 
    
    // 7. Route
    // - Route (tuyến đường) : Là một quy tắc ánh xạ giữa một http method + url pattern với 1 hàm xử lý . 
    // - Khi một request đến , server sẽ so khớp method và URL của request với từng route đã định nghĩa 
    // -> nếu khớp hàm xử lý (handler) sẽ được gọi , nếu không trả về lỗi 404 

    // vd : GET /users -> hàm lấy ds user , POST /users -> hàm tạo user mới 

    // - Cách Express định nghĩa route 
    // -> Express giúp bạn định nghĩa route một cách trực quan , thay vì if...else . Cú pháp chung : 

        // app.<HTTP_METHOD>(PATH , HANDLER_FUNCTION)

    // vd : 
        // import thự viện express về sử dụng để tạo web server 
        const express = require('express');
        const app = express();

        // route 1 : GET / -> trả về JSON
        app.get('/' , (req , res) => {
            res.json({message : 'chào mừng đến với api của kem'});
        })

        // route 2 : get /about -> trả về text
        app.get('/about' , (req , res) => {
            res.send('Trang giới thiệu');
        })

        // route 3 : POST /users -> nhận dữ liệu từ req tạo user mới 
        app.post('/users' , (req , res) => {
            // giả sử đã có middleware parse body 
            const newUser = req.body;
            console.log('Dữ liệu nhận :', newUser);
            res.status(201).json({message : 'user đã được tạo'});
        })

        // route 4 : GET /users/:id -> lấy user theo id động 
        app.get('/users/:id' , (req , res) => {
            const userId = req.params.id; // :id sẽ được gán vào đây
            res.json({userId , name : 'sample user'});
        });

        app.listen(3000)

    // Giải thích tổng quan về cấu trúc 1 route sử dụng express để định nghĩa 
    // + app.get , app.post , app.put , app.delete - là các http method tương ứng 
    // + Tham số đầu ('/' , '/users' , 'user/:id') là path pattern . Nó có thể là :
        // Chuỗi tĩnh : '/users' khớp chính xác /user
        // Chuỗi động : '/users/:id' -> :id là placeholder , khớp với bất kì giá trị nào (/users/1 , /users/er...) -> express sẽ lưu giá trị đó vào req.params.id
        // Có thể dùng dấu ? , * , regex nhưng cơ bản chỉ cần :param
    // + Tham số thứ hai là hàm callback (req , res) . Đây chính là nơi bạn viết logic xử lí request , lấy dữ liệu từ database và cuối cùng trả về response cho client

    // 4. Định nghĩa một web server trong thực tế với express

    // - Khi bạn viết 
        const app = express();
        //... thêm các route
        app.listen(3000)
    // -> bạn đã định nghĩa 1 web server hoàn chỉnh . Cụ thể 
    // + express() import từ module express là 1 hàm khi gọi nó trả về 1 đối tượng app (đại diện cho server)
    // + các lệnh app.get(...) , app.post(...) là bạn đang đăng kí các route vào server này 
    // + app.listen(3000) khởi động server , bắt đầu lắng nghe 

    // -> từ lúc này bất kì request nào đến server localhost:3000 sẽ được express tự động phân tích và gọi đúng route phù hợp . Bạn không cần thiết viết if...else thủ công

    






    