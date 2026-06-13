// Ngày 2 : 

// - Ngày 1 hiểu được các khái niệm cần thiết khi làm việc với server và tạo server đầu tiên , khái niệm về route
// -> hôm nay đi sâu vào 'cánh cửa giao tiếp' giữa client và server : làm sao server nhận được dữ liệu từ client qua URL , query và body 
// -> kiến thức cốt lõi để xây dựng API thực thụ 

// - Mục tiêu : 
    // + Hiểu rõ 3 cách gửi dữ liệu : Route Params , Query Strings , Request Body
    // + Cài đặt middleware express.json() để đọc JSON body
    // + Thực hành xây dựng API nhận đủ loại dữ liệu 
    // + Kiểm thử API bằng Postman (hoặc trình duyệt)

// 1. Route params (req.params)
    // - req.params là thuộc tính của đối tượng req sử dụng để lấy giá trị động trên url được truyền vào bởi http request
    // -> sử dụng thuộc tính này khi url có giá trị động để định danh tài nguyên 
    // -> định nghĩa url động bằng việc sử dụng dấu : trước giá trị động 

    let express = require('express');
    let app = express();

    // thêm middleware đặt trước tất cả route
    app.use(express.json());

    app.get('/' , (req , res) => {
        res.json({message : 'server đang chạy'})
    })

    app.get('/users/:id' , (req , res) => {
        let userId = req.params.id;
        res.json({message : `User có id là : ${userId}`});
    });

    // -> lưu ý : req.params.{giá trị động} lúc này trả về giá trị động dưới dạng chuỗi 

// 2. Query String (req.query) 
    // - req.query là thuộc tính của đối tượng req sử dụng để lấy các giá trị trên url khi trường hợp muốn lọc , phân trang , tìm kiếm..
    // -> tất cả dữ liệu đươc lấy nằm sau dấu ? cuối cùng trên đường dẫn  
    // -> dữ liệu được lấy bởi req.query trả về là 1 obj 

    // url = /search thì dữ liệu được req.query lấy sẽ ở đường dẫn do  người dùng gửi về các đường dẫn nằm sau dấu ? 
    // http://localhost:3000/search?keyword=express&page=3 -> keyword = express và page = 3

    app.get('/search' , (req , res) => {
        let {keyword , page} = req.query;
        res.json({message : `key word là : '${keyword}' , số trang là : ${page || 1} `})
    });


// 3. Request Body (req.body) 
    // - req.body là thuộc tính của req sử dụng để đọc dữ liệu được client gửi về server nhưng được ẩn dấu trong thân request và dưới định dạng JSON
    // -> sử dụng trong trường hợp client gửi dữ liệu lên server để tạo mới hoặc cập nhật (POST , PUT , PATCH)
    // -> express không tự động đọc body từ request nên cần middleware để 'giải mã' bằng phương thức express.json() 

    app.post('/users' , (req ,res) => {
        const newUser = req.body;
        console.log('Dữ liệu nhận : ', newUser);
        res.status(201).json({message : 'user đã được tạo'  , user : newUser});
    });

    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`web server đã sẵn sàng tại http://localhost:${PORT}`);
    });