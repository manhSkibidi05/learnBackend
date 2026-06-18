// Ngày 3 : 

    // - Chúng ta nâng cấp đáng kể cách tổ chức code : từ 1 file app.js 'tất cả trong một' sang kiến trúc phân lớp 
    // -> Đây là bước ngoặt giúp code của bạn dễ bảo trì , mở rộng khi dự án lơn lên

    // - Mục tiêu hôm nay : 
        // + Hiểu tại sao cần tổ chức code 
        // + Nắm vững các tầng : Routers , Controllers , Services , Models 
        // + Sử dụng express.Router() để nhóm các route
        // + Tự tay cấu trúc (refactor) Task API thành cấu trúc chuẩn
        // + Thực hành import/export module trong Node.js 

    // 1 . Tại sao phải phân lớp ? 
        // - Khi bạn chỉ có 3 -> 4 route tất cả trong app.js cũng được . Nhưng hãy tưởng tượng có 50 route , kèm xác thực 
        // validation , bussiness logic phức tạp... File app.js sẽ dài hàng ngàn dòng , rất khó đọc , khó sửa , khó phân công trong nhóm

        // - Kiến trúc phân lớp giúp : 
            // + Phân tách trách nhiệm : Mỗi file chỉ làm một nhiệm vụ rõ ràng 
            // + Dễ kiểm thử : Có thể test riêng service , controller  
            // + Tái sử dụng : Logic nghiệp vụ (service) có thể được gọi từ nhiều nơi
            // + Dễ bảo trì : Khi có lỗi , bạn biết ngay nó nằm ở tầng nào 

    // 2. Các tầng kiến trúc của chúng ta : Chia ứng dụng thành 4 tầng chính (từ ngoài vào trong )

        // - Routes : 
            // + Tên thư mục : routes/
            // + Nhiệm vụ : Định nghĩa endpoint , method , gọi middleware xác thực , gọi controller 

        // - Controllers : 
            // + Tên thư mục : controllers/
            // + Nhiệm vụ : Nhận req , res  , gửi response , không chứa bussiness logic , gọi service
        
        // - Services : 
            // + Tên thư mục : services/
            // + Nhiệm vụ : Chứa toàn bộ logic nghiệp vụ (validate phức tạp , tính toán ) , gọi model

        // - Models : 
            // + Tên thư mục : models/
            // + Nhiệm vụ : Định nghĩa schema (Mongoose) , tương tác với database 

    // 3. Chuẩn bị : Cấu trúc thư mục dự án ngày 3 

    // 4. Mô tả chi tiết luồng hoạt động 
