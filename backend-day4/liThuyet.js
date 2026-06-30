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

    // 4. Lí thuyết cơ bản về MongoDB và Mongoose 

        // (1) Khái niệm nền tảng của của MongoDB
            // - Database(cơ sở dữ liệu) : Là container vật lí chứa nhiều các collection lại . Mỗi database có tập hợp các
            // file riêng trên hệ thống và thường được dùng để phân tách dữ liệu cho từng dự án hoặc môi trường. 
            // -> Là 1 nơi lưu trữ dữ liệu thật cho 1 dự án nhất định 

            // - Collection (bộ sưu tập) : Là nơi nhóm các Document lại với nhau nhưng không có Schema cố định 
            // -> Tập hợp các dữ liệu (Document) có cấu trúc nhất quán với nhau nhưng có thể khacs nhau về các trường dữ liệu

            // - Document (Tài liệu) : Là đơn vị lưu trữ cơ bản trong mongoDB , tương đương 1 bản ghi trong SQL , Document 
            // được lưu trữ dưới dạng BSON có cấu trúc là các cặp key_value
                // + Mỗi Document có 1 trường _id duy nhât làm khóa chính
                // + Giá trị 1 field có thể nhiều kiểu dữ liệu khác nhau , gồm cả Document khác lồng nhau hoặc 1 mảng
            
            // - BSON (Binary JSON) : Là định dạng dữ liệu nhị phân mà MongoDB sử dụng lưu trữ và trao đổi dữ liệu , nó là
            // phiên bản mở rộng của JSON hỗ trợ thêm nhiều dữ liệu phong phú hơn như Date , ObjectId...

        // (2) Khái niệm cốt lõi của Mongoose 
            // - Mongoose : Là 1 thư viện ODM cho node.js hoạt động như lớp trừu tượng , Nó giúp định nghĩa cấu trúc dữ liệu
            // và tương tác với MongoDB một cách có tổ chức hơn 
            // -> giúp cung cấp thuộc tính và phương thức thực hiện thao tác với cơ sở dữ liệu

            // - Schema(Lược đồ) : Là bản thiết kế cho 1 Document , dùng để định nghĩa cấu trúc , kiểu dữ liệu và các ràng buộc
            // cho các field bên trong collection
            // -> giúp tạo ra bản thiết kế của 1 document dùng để lưu trữ dữ liệu cũng như các ràng buộc cần thiết
            
            // - Model(Mô hình) : Là 1 constructor (hàm tạo) được biên dịch từ 1 Schema . Model đóng vai trò là giao diện chính
            // để tương tác với 1 Collection cụ thể 
                // + Mongoose sẽ tự động chuyển tên Model số ít sang Collection số nhiều vd : User(model) -> users (collection)  
            // -> giúp thao tác với cơ sở dữ liệu qua collection , model gửi yêu cầu còn collection thực hiện nó trực tiếp trong database

            // - Document Intance (Thể hiện Document) : Là 1 đối tượng cụ thể tạo bởi model , nó đại diện cho 1 document trong database
            // và  có thể lưu xuống collection bằng phương thức .save()
            // -> thể hiện được tạo ra bởi model dựa trên thiết kế của schema 