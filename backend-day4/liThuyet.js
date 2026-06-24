// Ngày 4 : MongoDB và Mongoose 

    // - Dữ liệu của bạn sẽ sống mãi trong cơ sở dữ liệu thực thụ , không cồn biến mất khi server khởi động lại 
    // -> Chúng ta chính thức bước vào thế giới MongoDB và Mongoose 
    
    // - Mục tiêu hôm nay : 
        // + Hiểu MongoDB là gì , NoSQL khác gì SQL 
        // + Cài đặt MongoDB (local hoặc cloud Atlas)
        // + Kết nối thành công từ Node.js tới MongoDB bằng Mongoose
        // + Định nghĩa Schema và Model đầu tiên 
        // + Viết lại tầng Model trong Products API để lưu vào MongoDB thay vì mảng 

    // 1. MongoDB và NoSQL - Tổng quan 
        // - MongoDB là một cơ sở dữ liệu NoSQL (not only sql) , lưu trữ dưới dạng tài liệu JSON (gọi là BSON - binary JSON)
        // - Thay vì bảng table như SQL , MongoDB dùng collection (tập hợp các document) . Mỗi document là một obj JSON có thể có cấu trúc linh hoạt , không cần cố định cột

        // -> Tại sao lại lựa chọn MongoDB cho Node.js 
            // + Dữ liệu JSON rất tự nhiên với Js
            // + Dễ mở rộng phù hợp với ứng dụng thời gian thực , prototype nhanh 
            // + Mongoose cung cấp ODM (object data modeling) giúp thao tác MongoDB qua các đối tượng js quen thuộc 

    // 2. Cài đặt MongoDB 
    // 3. Kết nối Node.js với MongoDB bằng Mongoose