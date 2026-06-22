// Review ngày 3 

    // - Hiện tại việc tạo ra server và các bước xử lí request bao gồm tạo middlerware , tạo route , định 
    // nghĩa route đó , kiểm tra dữ liệu đầu vào req res , xử lí logic validate , thao tác với cơ sở dữ liệu
    // đều nằm trong 1 file nếu không chia ra 
    // -> Khiến file trở nên phình to khi phải định nghĩa nhiều route 

    // - Học về cách tổ chức lại folder code ở phía server thay vì việc viết tất cả thao tác trong 1 file
    // -> Việc chia nhỏ thành nhiều thao tác nằm trong các folder khác nhau giúp dễ phát triển từng thao tác
    // dễ dàng kiểm thử , dễ dàng debug khi gặp lỗi 

    // - Tổ chức lại folder lúc này file app.js là file chính chứa tổng hợp các file còn lại , tạo và chạy server 
    // tạo middleware cho route 

    const express = require('express');
    const app = express();

    app.use(express.json());

    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`server đang đươcj chạy tại http://localhost:${PORT}`)
    })

    // - Việc định nghĩa route sẽ chia nhỏ thành 4 tầng nằm ở 4 folder khác nhau , mỗi tầng sẽ đảm nhiệm 1 thao tác
    // khác nhau nhằm chia nhỏ việc định nghĩa 1 route 
    // -> Thứ tự định nghĩa các tầng là : models -> services -> controllers -> routes

        // + Tầng models (/models)
            // - Công việc chính : Tầng này sẽ thực hiện tao tác trực tiếp với database như thêm , sửa , xóa... dữ liệu dựa  
            // trên yêu cầu của request
            // - Giao tiếp với tầng khác : dựa trên dữ liệu được nhận từ services vào models sẽ trả về 1 dữ liệu 2 trả về null 
            // từ đó services nhận lại các dữ liệu trả về rồi thực hiện tiếp các thao tác đề hoàn thành request
            // -> Tại sao tên là models : mô hình dữ liệu thao tác trực tiếp dữ liệu

        // + Tầng services (/services) 
            // - Công việc chính : Tầng này sẽ thực hiện xác định dữ liệu đầu vào , thực hiện logic nghiệp vụ phức tạp
            // validate ,  không thao tác trực tiếp với database , gọi models
            // - Giao tiếp với tầng khác : Nhận dữ liệu trực tiếp từ controllers và  cung cấp dữ liệu cho models để models trả về dữ liệu của database
            // sau đó dựa trên dữ liệu trả về nếu hợp lệ sẽ trả về dữ liệu cho controllers , ngoài ra khi gặp lỗi lúc kiểm tra dữ liệu hay dữ liệu null 
            // thì có thể ném ra lỗi cho controllers bẳt
            // -> Tại sao tên là services(dịch vụ) : cung cấp logic nghiệp vụ , kiểm tra dữ liệu cho controllers

        // + Tầng controllers (/controllers)
            // - Công việc chính : Tầng này sẽ thực hiện cung cấp dữ liệu đầu vào của req cho services , lấy dữ 
            // liệu services trả về , định nghĩa res gửi cho client rồi  kết thúc 1 request
            // - Giao tiếp với tầng khác : định nghĩa hàm handler của route gồm req và res nhưng bọc trong khối
            // cung cấp dữ liệu req cho services và nhận lại dữ liệu nếu là lỗi sẽ bắt và trả về res với lỗi , 
            // nếu là dữ liệu trả về res với dữ liệu kết thúc request

        // + Tầng routes (/routes)
            // + Công việc chính : Tầng này sẽ định nghĩa các route bằng cách cung cấp method và url sau đó gọi hàm 
            // được định nghĩa bởi controllers hợp lí với route 
            // + Giao tiếp với tầng khác : Gọi các hàm của controllers sao cho phù hợp với method và url từ đó 
            // hoàn thiện 1 route 

    // -> 1 request khi được gửi lên server sẽ đi qua tầng routes đầu tiên xác nhận thuộc route nào bàng url và method
    // tiếp theo đến tầng controllers cung cấp dữ liệu của req cho services , tiếp theo tầng sevices thực hiện kiểm tra
    // dữ liệu và logic nghiệp vụ và gọi models , tầng moldes thao tác trực tiếp với database sau đó trả về lại services ,
    // services trả về lại cho controllers hoàn thành res và kết thúc 1 req.
    
// Đào sâu kiến thức ngày 3 : Router , require/export , use 

    

