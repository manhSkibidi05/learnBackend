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

        // 1. Luồng hoạt động
        // - Request đi qua chuỗi middleware , tới routes . Tìm Route khớp với phương thức và url rồi  gọi controller .
        // Controller không chứa logic chỉ điều phối : nhận dữ liệu req , gọi services , trả res . Services chứa logic nghiệp vụ
        // gọi model thao tác dữ liệu . Model là nơi làm việc duy nhất với nguồn dữ liệu . Kết quả trả ngược lại cho client 

        // -> req đi qua chuỗi middleware ->tới tầng routes : xác định đúng route bằng method và url của req , gọi controllers 
        // -> tới tầng controllers nhận req , gọi services xử lí logic , trả về res -> tầng services chứa logic nghiệp vụ 
        // xử lí yêu cầu của req , valid thông tin , gọi models xác thực dữ liệu -> tầng models thao tác trực tiếp dữ liệu
        // thêm , sửa , xóa... sau đó trả về cho services trả về controllers kiểm tra trả về res cuối (có thể lỗi hoặc không) về client.
    
        // 2. Giải thích chi tiết công việc các tầng và lí do đặt tên 

            // + Tầng Routes : 
            // - Nhiệm vụ : 
                // + Định nghĩa các endpoint (đường dẫn và method của HTTP) -> định nghĩa route nhưng chỉ method và url còn hàm callback gọi đến controllers 
                // + Gán middleware cho 1 nhóm route
                // + Gọi hàm controller tương ứng
                // + Dùng express.Router() để nhóm các route có cùng tiền tố 

            // -> Tên là Routes vì chứa định nghĩa các tuyến đường route của ứng dụng , giúp xác định cổng vào chính xác để gửi req tới controllers

            // + Tầng Controllers : 
            // - Nhiệm vụ : 
                // + Nhận req , res từ routes
                // + Trích xuất dữ liệu từ request (params , query , body)
                // + Gọi service tương ứng với dữ liệu đầu vào 
                // + Gửi response với status code và bode
                // + Xử lí lỗi từ service và trả về response lỗi tương ứng 
            
            // -> Tên là Controllers vì giống như bộ điều khiển , người điều phối tiếp nhận yêu cầu từ routes , chuyển dữ liệu xuống 
            // cho services , nhận kết quả trả về từ services rồi trả về response cho client . Kiểm soát luồng xử lí req và res
            
            // + Tầng Services :
            // - Nhiệm vụ : 
                // + Chứa logic nghiệp vụ (bussiness logic) . vd : kiểm tra dữ liệu đầu vào phức tạp , tính toán , áp dụng quy tắc 
                // kinh doanh , gọi đến 1 hoặc nhiều models
                // + Cầu nối controllers và models
                // + Ném lỗi nếu có vấn đề (không tồn tại , không hợp lệ...) để controllers bắt lỗi trả về  res phù hợp 

            // -> Tên là Sevices dịch vụ , cung cấp các dịch vụ xử lí cho controllers , đóng gọi nghiệp vụ giúp controllers mỏng nhẹ 
            // và có thể tái sử dụng logic 

            // + Tầng Models : 
            // - Nhiệm vụ : 
                // + Định nghĩa cấu trúc dữ liệu và tương tác trực tiếp với cơ sở dữ liệu 
                // + Với MongoDB / Mongoose : định nghĩa schema , tạo model , thực hiện thao tác CRUD (create , update , read , delete)

            // -> Tên là Models mô hình , đại diện cho dữ liệu cách thức làm việc với dữ liệu đó . Trong MVC model là tầng dữ liệu 

        // - Lưu ý : Sau này sẽ có thêm các tầng chứa các công việc khác 
        // + Middleware : chứa hàm middleware dùng chung
        // + Utils / Helpers : chứa các hàm tiện ích độc lập
        // + Config : chứa cấu  hình (biến môi trường , kết nối database )

        // 3. Nêu định nghĩa tầng nào trước và tầng nào sau 
        // - Không có quy tắc tuyệt đối , nhưng cách tiếp cận hợp lý khi phát triển tính năng mới (vd : thêm CRUD 1 resource mới) là từ trong ra ngoài hoặc từ dưới lên trên

            // 1. Model - đầu tiên
            // - Bạn cần biết dữ liệu trông như thế nào , lưu trữ ra sao . Định nghĩa hàm thao tác dữ liệu để cho tầng trên gọi và sử dụng

            // 2. Service - tiếp theo
            // - Dựa trên hàm model đã có , xây dựng logic nghiệp vụ xoay quanh nó , gọi hàm model , thêm validate , xử lí logic và hoàn toàn kiểm thử service 

            // 3. Controller - sau service
            // - Controller gọi đến sevice xác nhận dữ liệu được gửi về để hoàn thành 1 request , xử lí các trường hợp do sevice trả về từ đó tạo response hợp lí 

            // 4. Route - cuối cùng 
            // - Định nghĩa các route gắn các controller vào các route phù hợp , chỉ việc khai báo route và gọi controller hợp lí 

        // -> Thứ tự hợp lí : model -> sevice -> controller -> route 