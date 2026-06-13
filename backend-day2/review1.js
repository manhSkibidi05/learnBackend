// review ngày 2 - xử lí các trường hợp gửi  http request từ client về server 
    // -> xử lí các http request thông qua route : định nghĩa các route dựa vào thông tin của http request gồm method và URL

    const express = require('express');
    const app = express();

    app.use(express.json())

    // 1. URL tĩnh 
    // - Xảy ra khi đường dẫn cố định sẽ cụ thể đến vị trí lưu trữ nào đó ở phía server 
    // vd : 
    app.get('/users', (req , res) => {
        // lấy thông tin users gửi về client
    })

    // 2. URL động 
    // - Xảy ra khi đường dẫn tĩnh các giá trị có thể thay đổi tùy vào thao tác người dùng dùng để xác định vị trí resource cụ thể 
    // -> xử lí bằng đường dẫn sẽ sử dụng dấu : trước giá trị động trên đường dẫn
    // -> sau đó sử dụng req.params để lấy giá trị đó 
    // vd : 
    app.get('/users/:id' , (req , res) => {
        let idUser = req.params.id;
        // lấy thông tin user có id này gửi về client
    })

    // 3. URL tìm kiếm , lọc , phân trang dữ liệu 
    // - Xảy ra khi so với đường dẫn ở server đường dẫn phía client gửi thêm dấu ? ở cuối và có thêm các giá trị dùng để tìm kiếm , lọc , phân trang...
    // -> xử lí bằng req.query giúp lấy các giá trị trên đường dẫn xuất hiện đằng sau dấu ?
    // -> các dữ liệu này sẽ trả về 1 đối tượng 
    // vd: với đường dẫn /product?name=iphone&page=2
    app.get('/products' , (req , res) => {
        let product = req.query;
        // product nhận obj gồm name : iphone , page : 2 
    })

    // 4. Dữ liệu được đặt ở phần thân 
    // - Xảy ra khi dữ liệu phía client để dữ liệu ở body của http request 
    // -> xử lí bằng cách tạo middleware để parse dữ liệu dược gửi về 
    // -> sử dụng req.body để lấy dữ liệu đó ra 
    app.post('/products' , (req , res) => {
        let newProduct = req.body;
        // đọc dữ liệu từ phần thân của request 
    })

    // - Quy tắc vàng đặt tên cho route (RESTful):
        // + Dùng danh từ số nhiều : /users , /products , /tasks
        // + Dùng params cho resource con : /users/:userId/posts
        // + Hành động thể hiện qua HTTP method : GET(lấy) , POST(tạo) , PUT/PATCH(sửa) , DELETE(xóa)

    // - Tổng kết : So sánh cách lấy dữ liệu 

        // Params :  
            // + vị trí trong request : URL path (đường dẫn URL) chuỗi nằm sau dấu : -> /users/:id
            // + cách lấy trong express : req.params.id 
            // + kiểu dữ liệu : luôn trả về string
            // + dùng cho : xác định resource cụ thể 

        // Query : 
            // + vị trí trong request : URL path (đường dẫn URL) chuỗi nằm sau dấu ? -> /users?age=20
            // + cách lấy trong express : req.query
            // + kiểu dữ liệu : trả về object và tất cả value là string 
            // + dùng cho : lọc , sắp xếp , phân trang 

        // Body : 
            // + vị trí trong request : thân request ẩn 
            // + cách lấy trong express : req.body -> cần middleware trước đó 
            // + kiểu dữ liệu : trả về bất kì kiểu dữ liệu nào do JSON parsed 
            // + dùng cho : tạo mới , cập nhật  