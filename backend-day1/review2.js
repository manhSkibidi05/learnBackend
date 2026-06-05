// - Ôn tập các khái niệm đã học (ngày 1)

    // - client (máy khách) : là 1 phần mềm hoặc trang web được sử dụng để gửi các http request đến server và nhận lại các http response 
        // + client dùng các công cụ html , css ,js để chạy tạo UI hiển thị giao diện cho người dùng 
        // + client kết nối với server thông qua http request/response 
        
    // - server (máy chủ) : là 1 máy tính hay chương trình luôn hoạt động để nhận các request từ client sau đó trải qua các bước xử lí trả về http response
        // + server giúp kết nối với database để lưu trữ thông tính và thực hiện các thao tác với dữ liệu khi client yêu cầu 
        // + server giúp xử lí các thao tác nghiệp vụ quản lí dự án đi đúng theo quy chuẩn mvc (models , views , controllers)
    
    // - database (cơ sở dữ liệu ) : là 1 nơi lưu trữ dữ liệu có tổ chức tách biệt với server  được chia ra làm 2 loại là sql và no sql 
        // + database kết nối với server thông qua các thư viện 
        
    // - node.js : là 1 môi trường runtime được thiết kế để cho phép js chạy được ở server 
    // -> ban đầu js chỉ chạy được trên brower nhưng nhờ node.js cho phép js chạy ở server để tạo ra web server

    // - express.js : là 1 thư viện của js nằm trong node.js sử dụng để giúp các thao tác tạo ra web server cách đơn giản hơn 
    // -> express cung cấp các phương thức để tạo ra web server , tạo router một cách nhanh gọn hơn 

// - Kiến thức về base để xây dựng trang web local fullstack 

// Câu trả lời: Bạn hiểu hoàn toàn chính xác!
// Tôi xin xác nhận: Hiểu của bạn là đúng và rất rõ ràng.

// Chi tiết từng phần:
    // - Vite với npm run dev: Cung cấp một dev server (chỉ dùng trong quá trình phát triển) có nhiệm vụ:
        // + Biên dịch (transform) các file .jsx, .ts, .css... thành JavaScript thuần mà trình duyệt có thể hiểu và thực thi.
        // + Hỗ trợ Hot Module Replacement (HMR) giúp cập nhật giao diện ngay khi bạn sửa code mà không cần reload trang.
        // + Quan trọng: Dev server này chỉ tồn tại trên máy của bạn, không dùng cho người dùng thật

    // - Node.js: Đúng là môi trường runtime cho phép JavaScript chạy ở phía backend (máy chủ). Nó cung cấp các API để đọc/ghi file, tạo network socket, quản lý tiến trình… mà trình duyệt không làm được.
    // - Express.js: Là một framework chạy trên Node.js, cung cấp các phương thức tiện lợi để:
        // + Tạo web server lắng nghe HTTP request.
        // + Định nghĩa route (GET, POST, PUT, DELETE…).
        // + Xử lý request (đọc body, query params, middleware…).
        // + Trả về response (JSON, HTML, file…).
        // + Kết nối với cơ sở dữ liệu (thông qua driver hoặc ORM như mongoose cho MongoDB).

    // - Điểm bạn nắm rất tốt:
        // + Sự phân biệt rõ ràng giữa frontend (Vite dev server) và backend (Node + Express).
        // + Vai trò của Express trong việc tạo web server và kết nối database.