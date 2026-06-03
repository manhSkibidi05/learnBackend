// Các khái niệm cơ bản về Client - Server - Database - Node.js - Express

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
    