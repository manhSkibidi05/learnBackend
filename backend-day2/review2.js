// Đào sâu về ngày 2 : 

    // 1. Luồng xử lí request qua middleware và route - vai trò next()
        // - Khi 1 http request đến sever express , nó sẽ đi qua một chuỗi các hàm được gọi là middleware và route handlers
        // -> Đi theo đúng thứ tự mà bạn khai báo trong code 

        // - Giải thích next() :
            // + Mỗi middleware là 1 hàm : (req , res , next) => {...}

            // + Khi middleware xong việc của mình , có 2 lựa chọn :
                // 1. Gọi hàm next() chuyển quyền xử lí cho middleware/route kế tiếp trong chuỗi 
                // 2. Gửi response (send() , json()...) không gọi next() -> response kết thúc
            // -> Middleware phải thực hiện 1 trong 2 lựa chọn trên nếu không dẫn đến treo request

            // + Nếu gọi next(err) và truyền vào tham số lỗi , express bỏ qua các middleware thường 
            // -> nhảy đến error-handling middleware (có 4 tham số (err , req , res , next))
            
        // - middleware và route khác nhau như thế nào ? 
            // + middleware thường dùng app.use() và có thể áp dụng cho mọi request hoặc 1 nhóm đường dẫn 
            // -> mọi http request vào đều phải đi qua các middleware này 

            // + route handler thực chất cũng là 1 middleware nhưng nó chỉ chạy khi khớp method và path 
            // -> từ http request sẽ so sánh hàm yêu cầu và đường dẫn nếu phù hợp sẽ chạy route này và sau khi xử lí xong sẽ kết thúc request
            // -> nếu gọi next() trong route mà ở sau không có middleware nào sẽ báo lỗi 404

    // => hình dung chuỗi middleware như dây truyền lắp ráp : sản phẩm là request được gửi từ client sẽ đi qua
    // các trạm là middleware , mỗi trạm làm 1 việc như thêm header , parse body , xác thực... cuối cùng đến
    // trạm đóng gói route để gửi response về lại client 

    // 2. Đối tượng req -> sử dụng để lấy dữ liệu từ client gửi lên 

        // - request là đối tượng đại diện cho toàn bộ thông tin mà client gửi lên 
        // ->  bạn sử dụng các thuộc tính và phương thức của req để trích xuất dữ liệu phục vụ cho việc xử lý 

        // - các cửa lấy dữ liệu chính : 
            // + req.params : lấy giá trị động trên đường dẫn (:id)
            // + req.query : lấy các tham số sau dấu ? (query string)
            // + req.body : lấy dữ liệu gửi trong thân request (cần middleware express.json() trước)
            // + req.headers : lấy headers (vd token xác thực)
            // + req.method , req.url , req.path : thông tin về request

    // 3. Đối tượng res -> sử dụng để định nghĩa 1 res gửi về client 

        // - response là đối tượng mà bạn dùng để xây dựng và gửi phản hồi về cho client 
        // -> sử dụng các thuộc tính và phương thức định nghĩa response sao cho dữ liệu đủ với yêu cầu từ request

        // - sử dụng các phương thức của res để : 
            // + res.status(code) : thiết lập status code
            // + res.set() : thiết lập header 
            // + res.json(data) , res.send(text) , res.sendFile() : gửi dữ liệu 
            // -> sau khi gọi phương thức json hoặc send hoàn tất 1 response 

    // 4. API là gì ? Việc định nghĩa middleware và route có là định nghĩa API ?

        // - API(application proramming interface) giao diện lập trình ứng dụng  là : tập hợp các quy tắc và endpoint
        // cho phép 2 phần mềm giao tiếp với nhau . Trong ngữ cảnh web , API thường là tập hợp các URL (endpoint) mà
        // client có thể gọi để lấy dữ liệu hoặc yêu cầu server thực hiện hành động .

        // -> Định nghĩa API trong express chính là việc định nghĩa các route (và các middleware cần thiết ) để server
        // biết cách phản ứng với từng request . Mỗi route là 1 phần của API

        // - API là hợp đồng quy định cách client và server nói chuyện với nhau 
        // -> Việc bạn định nghĩa middleware và route chính là đang xây dựng API bộ quy tắc kết nối giữa client và server
        

