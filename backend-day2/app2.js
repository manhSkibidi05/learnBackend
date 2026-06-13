// Ngày 2 (tiếp) : 

    // 1. Postman là gì và cách kiểm thử API bằng Postman 
    // - Postman là công cụ giao diện đồ họa (GUI) giúp bạn gửi HTTP request đến server và xem phản hồi mà không cần dùng trình duyệt hay viết code
    // -> Nó như một trình duyệt chuyên dụng dành cho lập trình viên backend/frontend để kiểm thử API 

    // - Tại sao cần Postman : 
        // + Trình duyệt chỉ dễ dàng gửi request GET (bằng cách gõ URL) nhưng với POST , PUT , DELETE hay gửi kèm body JSON thì rất bất tiện
        // + Postman cho phép lưu lại các request để test lại nhiều lần , quản lý biến môi trường (base URL , token) , viết script kiểm thử tự động

    // 2. Middleware và cơ chế bất đồng bộ 
        // - Trong express middleware là 1 hàm có quyền truy cập vào đối tượng req , res và hàm next trong chuỗi xử lý request. Nó có thể : 
            // + Thực thi bất kỳ đoạn code nào 
            // + Thay đổi req , res
            // + Kết thúc chuỗi -> gửi response về 
            // + Gọi next() để chuyển sang middleware/route tiếp theo 

        // -> middleware được đăng ký bằng app.use() hoặc gắn trực tiếp vào route 

        // - express.json() : Là 1 middleware được xây dựng sẵn trong express . Tác dụng : 
            // + phân tích cú pháp phần thân (body) của request nếu content-type là application/json 
            // + sau khi phân tích nó gán kết quả (một obj js) vào req.body
        // -> nếu không có middleware này , req.body sẽ là undefined vì Express không tự động đọc stream dữ liệu thô từ client

        // - vd : 
        app.use(express.json());
        // - đăng kí 1 middleware bằng use khi đặt nó ở trên đầu mã nó áp dụng middleware cho mọi request đến server.
        // -> nếu muốn áp dụng cho 1 nhóm route bạn có thể đặt nó như middleware trong route 

        // - Cơ chế bất đồng bộ của middleware : 
            // + bản thân hàm middleware trả về 1 hàm có thể xử lí bất đồng bộ bên trong . Nhưng từ góc độ chúng ta , chúng ta không cần
            // dùng await khi gọi app.use(express.json()) -> do express quản lý 
            
            // + sau khi body được đọc và parse xong , nó sẽ gọi next để chuyển sang middleware kế tiếp . Nếu có lỗi tự động trả về response lỗi 400

            // + middleware có thể là đồng bộ hoặc bất đồng bộ . Nếu bạn tự viết middleware dùng async/await bạn phải bọc trong try/catch
            // và gọi next(err) khi lỗi -> nếu không express sẽ không bắt được lỗi bất đồng bộ 
            // vd : middleware bất đồng bộ tự viết 
            app.use(
                async (req , res, next) => {
                    try{
                        // giả sử await tác vụ nào đó
                        await someAsyncTask();
                        next();
                    }catch(err){
                        next(err)
                    }
                }
            )

    // 3. Đối tượng req (request) - Cách lấy dữ liệu từ client gửi về server 
        // - req : là đối tượng đại diện http request từ client gửi lên . Nó chứa rất nhiều thông tin , nhưng dưới đây là các thuộc tính/phương thức thường dùng để xây dựng API

        // - Các thuộc tính lấy dữ liệu từ URL : 
            // + req.params : là 1 obj chứa các route parameters (phần chuỗi động trên path)
            // vd : route /users/:userId/posts/:postsId , request url gửi về /users/5/posts/12
            // req.params.userId = '5' , req.params.postsId = '12'
            // -> giá trị trả về chuỗi , cần ép kiểu nếu dùng số 

            // + req.query : obj chứa query string (phần sau ? )
            // vd : route /search , request url gửi về /search?keyword=node&page=2 
            // req.query = {keyword = 'node' , page = '2'}
            // -> giá trị trả về chuỗi hoặc mảng nếu cùng 1 key 

            // + req.path : đường dẫn của URL không có query string 
            // + req.originalUrl : toàn bộ URL gốc bao gồm cả query string 

        // - Các thuộc tính từ body và header : 
            // + req.body : chứa dữ liệu được ép kiểu từ body request -> chỉ có sẵn khi dùng middleware như express.json()

            // + req.headers : obj chứa tất cả http header gửi kèm request
            
            // + req.method : HTTP method (GET , POST , PUT,...) dạng chuỗi 

            // + req.url : chuỗi URL đầy đủ tương tự req.originalUrl
        
        // - Các phương thức thường dùng : 
            // + req.get(field) : lấy giá trị của 1 header cụ thể không phân biệt hoa thường 

            // + req.is(type) : kiểm tra content-type -> trả về true nếu là JSON

            // + req.accepts(types) : kiểm tra xem client có chấp nhận kiểu dữ liệu trả về hay không 

        app.post('/users/:userId/comments', (req, res) => {
            const userId = req.params.userId;          // từ URL
            const { sort } = req.query;                // query string ?sort=asc
            const { content } = req.body;              // body JSON
            const authHeader = req.headers['authorization']; // header
            console.log(userId, sort, content, authHeader);
            // Xử lý...
        });

    // 4. Đối tượng response - Cách gửi dữ liệu về client 
        // - res là đối tượng đại diện cho HTTP response mà server sẽ gửi về client 
        // -> res cung cấp các phương thức để thiết lập status code , header , và gửi body 

        // - Các phương thức thiết lập status code và header 
            // + res.status(code) : Đặt http status code . Phương thức này trả về res nên có thể gọi chuỗi 
            // vd : res.status(201).json(...)

            // + res.set(field , value) hoặc res.set(obj) : thiết lập header 

            // + res.type(type) : Đặt content-type cách đơn giản 

            // + res.cookies(name , value , options) : Gửi cookies 
        
        // - Các phương thức gửi response body 
            // + res.send(body) : Gửi response với nhiều kiểu  dữ liệu khác nhau (string , buffer , obj , arr)
            // -> nếu obj/arr nó tự động chuyển thành JSON . thường dùng để trả về text hoăcj HTML
            
            // + res.json(body) : gửi response dạng JSON giống với send nhưng ép kiểu dữ liệu về JSOn và đặt Content-type : application/json
            // -> method phổ biến nhất trong api

            // + res.sendFile(path) : gửi file (vd ảnh , PDF)

            // + res.redirect(url) : chuyển hướng (status 302)

            // + res.end() : kết thúc response mà không gửi dữ liệu -> ít dùng trong api , thường dùng với stream

        // - Phương thức điều khiển luồng : 
        // res.json() , res.send() , res.redirect() , res.end() : đều kết thúc response không gọi tiếp các phương thức khác sau đó

        // vd : 
        app.get('./example' , (req ,res) => {
            res.status(200).set('X-Powered-By' , 'MyApp').json({message : 'thành công'});
        })

        // - Lưu ý : 
        