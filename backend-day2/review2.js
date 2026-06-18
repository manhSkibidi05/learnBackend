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
        

// Review (tiếp) ngày 2 : 

    // Giải thích luồng hoạt động từ 1 request từ client gửi lên server đi qua chuỗi dây truyền nào sau đó trả 
    // về response lại cho client 
    
        // - client gửi yêu cầu qua http request đến server sau khi nhận đươc request bắt đầu đi qua các chuỗi middleware
            
            // + middleware : là 1 hàm có thể truy cập các đối tượng req , res và có 1 hàm next 
                // -> middleware giúp xử lí tiền dữ liệu trước khi đưa vào cho route đóng gói và gửi về client 
                // -> cú pháp : đăng kí bằng hàm use của đối tượng app (trả về của hàm express được lấy từ thư viện)

                // -> thứ tự đăng kí middleware rất quan trọng cần gọi next thì mới sang middleware kế nếu không next , không gửi res -> treo request
                app.use(middleware) // có thể tự định nghĩa hoặc định nghĩa sẵn của express
                app.use(express.json()) // middleware được express định nghĩa giúp xử lí dữ liệu của client gửi về trong thân request -> thường dữ liệu dạng json

                // -> với các middleware sau khi xử lí dữ liệu xong sẽ có 2 lựa chọn , 1 là sử dụng next() đến middleware / route tiếp theo , 2 là gửi lỗi bỏ qua toàn bộ các middleware/route đã đăng kí để đến 1 middlware lỗi với 4 tham số (err , req, res ,next) -> trả về lỗi nếu route hoặc middleware trả về lỗi trước đó

            // + route : là 1 middleware đặc biệt dựa vào method và url của request để thực hiện chạy hàm hanlder của route
                // -> route sẽ so sánh method gồm : GET , POST , PATCH , DELETE và đường dẫn url của request để quyết định chạy hàm handler hay không nếu không sẽ bỏ qua route này về đến route kế
                // -> cú pháp : app.get/post/patch...

                app.get('/url' , (req, res) => {}) // dựa trên phương thức mà route đăng kí gồm 2 tham số 
                // 1. url đường dẫn phía sau đường dẫn host
                // 2. hàm handler có 2 tham số bắt bộ req , res -> chạy nếu đúng url và method

                // -> khi đúng route thì dựa vào thông tin req cung cấp từ đó ta sẽ định nghĩa res để gửi lại về client 

            // + request : là đối tượng chứa thông tin của client gửi lên server chúng ta có thể truy cập thông qua thuộc tính và phương thức
                // -> các thuộc tính phổ biến để lấy dữ liệu như : 

                // 1. lấy dữ liệu qua url 
                // - req.params : dữ liệu động trên đường dẫn -> sử dụng truy cập chi tiết vào 1 dữ liệu
                // - req.query : dữ liệu dạng query string đằng sau dấu ? trên đường dẫn -> sử dụng để tìm kiếm , lọc dữ liệu

                // 2. lấy dữ liệu qua body 
                // - req.body : dữ liệu được đặt trong phần thân cần có middleware xử lí trước -> sử dụng để thêm , sửa 1 dữ liệu 

                // -> từ những dữ liệu được lấy này ta sẽ thực hiện yêu cầu của client sau đó gửi về kết qua thông qua res

            // + response : là đối tượng chứa các thông tin được server định nghĩa sau đó sẽ gửi về client 
                // -> chúng ta sẽ định nghĩa thông qua các thuộc tính và phương thức của response

                // 1. trạng thái của response : biểu thị kết quả của request
                // - có rất nhiều trạng thái được gửi qua hàm status() : 200 , 201 , 401 , 404...

                // 2. header của response 
                // - thiết lập header thông qua hàm res.set()

                // 3. dữ liệu của response : hầu hết đặt trong phần thân cả response
                // - thông qua các phương thức : json() -> nhận đối tượng , send() -> nhận text , sendFile() -> nhận file
                // -> sau khi gửi dữ liệu thông qua phương thức này thì sẽ kết thúc request

                res.status(200).json(data) // status và body thường được gửi cùng lúc việc này thường xuyên xảy ra

        // -> Như vậy kết thúc 1 luồng hoạt động 1 request của client gửi lên server đọc và xử lí rồi gửi về thông báo cho client 