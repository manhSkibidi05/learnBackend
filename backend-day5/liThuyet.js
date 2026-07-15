// Ngày 5 : Các kiến thức nâng cao về mongoose 

    // Nội dung chính : 
    // 1. Population (populate()) - JOIN trong mongoDB
    // 2. Aggregation Pipeline - Xử lí dữ liệu nâng cao 
    // 3. Index - Tăng tốc độ truy vấn 
    // 4. Validation - Ràng buộc dữ liệu chặt chẽ hơn 
    // 5. Plugins - Tái sử dụng logic Schema
    // 6. Middleware và virtuals - Can thiệp vòng đời của document và trường ảo 

// 0. Ôn lại kiến thức cơ bản về mongoose 

    // 0. mongoose : là thư viện cung cấp bởi node.js giúp tương tác với mongoDB
    const mongoose = require('mongoose');

    // 1. Kết nối tới 1 database cụ thể 
    mongoose.connect('mongodb://localhost:27017/shop'); 
    // -> Kết nối tới 1 server mongodb quản lí nhiều database và kết nối với database shop

    // 2. Định nghĩa schema : là cấu trúc của 1 Document (phần khung chứa các định nghĩa , ràng buộc về dữ liệu có thể được lưu trữ)
    const userSchema = new mongoose.Schema({name : string , age : number});

    // 3. Tạo model : được định nghĩa dựa trên 1 schema , ánh xạ tới 1 collection trong database 
    const User = mongoose.model('User' , userSchema);
    // -> model liên kết với 1 collection , khi model thực hiện thao tác (thêm , sửa , xóa.. 1 dữ liệu) thì Collection bên trong database sẽ thực hiện thật 

    // 4. Tạo và lưu Document vào Collection
    const user1 = new User({name : 'alice' , age : 18});
    await user1.save();
    // -> user1 là 1 Document được tạo lên từ model User dựa trên cấu trúc schema , sau đó Document này được thêm vào Collection users bên trong database

// 1 . Population (populate()) - Thay thế tham chiếu bằng dữ liệu thật 

    // - Bản chất : 
        // + Khi bạn thiết kế các collection có mối quan hệ , thay vì nhúng toàn bộ document này vào document kia (gây dư thừa) , 
        // bạn chỉ cần lưu trường ObjectId để tham chiếu document trong collection khác
        // -> khi mà 1 document ở 1 collection khác muốn tham chiếu tới 1 document ở 1 collection khác thay vì nhúng trực tiếp vào
        // thì sủ dụng kĩ thuật population 

        // + Hàm populate() là phương thức của mongoose giúp tự động thay thế ObjectId bằng toàn bộ document thực tế từ collection được
        // tham chiếu 

    // - Cách hoạt động : 
        // + Lúc định nghĩa Schema bạn khai báo 1 trường kiểu mongoose.Schema.Types.ObjectId kèm thuộc tính ref chỉ đến tên Model tham chiếu
        // -> lúc định nghĩa 1 Schema cần thêm các trường này để lấy dữ liệu chính xác 
        
        // + Khi truy vần , bạn gọi .populate('fieldName') , Mongoose sẽ thực hiện truy vấn đến collection kia và lấy document có id khớp sau đó gán vào field đó
        // -> khi lấy dữ liệu của document chứa dữ liệu này thì cần gọi thêm phương thức populate()

    // vd : 

        // 1. Định nghĩa Schema của category
        const categorySchema = new mongoose.Schema({name : String});
        // -> Tạo model dựa trên schema này , liên kết collection trong database
        const Category = mongoose.model('Category' , categorySchema);

        // 2. Định nghĩa Schema của product
        const productSchema = new mongoose.Schema({
            name : String,
            price : Number,
            // Định nghĩa trường nhận dữ liệu từ 1 document của collection khác
            category : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Category'
            }
        })
        // -> Tạo model dựa trên schema này 
        const Product = mongoose.model('Product' , productSchema);

        // 3. Truy vấn dữ liệu và populate thông tin category bên trong 1 product
        const products = await Product.find().populate('category');
        // -> kết quả in ra sẽ là product có thêm trường category chứa thông tin 1 document category đầy đủ 

    // - Khi nào sử dụng : 
        // + Khi chỉ lấy dữ liệu từ 1 document mà bên trong nó chứa các trường từ document ở các collection khác có liên quan 
        // + Muốn API đơn giản không cần viết thêm logic thủ công để ghép dữ liệu
        // + Phù hợp với các truy vấn thông thường , không yêu cầu xử lí thống kê phức tạp 

// 2. Aggregation Pipeline - Xử lý dữ liệu nâng cao 

    // - Bản chất :
        // + Aggregation Pipeline là chuỗi các giai đoạn xử lí dữ liệu tuần tự , mỗi giai đoạn nhận dữ liệu trả về từ giai đoạn trước 
        // đó , sau đó sẽ thực hiện thao tác (lọc , nhóm , tính toán, ghép...) rồi cho ra output 
        
        // + Nó mạnh hơn find vì có thể thực hiện các phép toàn phức tạp như : GROUP BY , SUM , AVG , JOIN nhiều bảng 

        // vd : Thống kê sản phẩm và giá trị trung bình theo danh mục , chỉ danh mục trên 2 sản phẩm 

        const stats = await Product.aggregate(
            [
                // nhóm theo ObjectId category
                {
                    $group : {
                        _id : '$category',
                        count : {$sum : 1},
                        avgPrice : { $avg : '$price' }
                    }
                },
                // lọc nhóm có > 2 sản phẩm
                {
                    $match : {
                        count : {$gt : 2}
                    }
                },
                // Join với collection categories
                {
                    $lookup: {                        
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryInfo'
                    }
                },
                { $unwind: '$categoryInfo' },
                {
                    $project: {
                    _id: 0,
                    category: '$categoryInfo.name',
                    count: 1,
                    avgPrice: { $round: ['$avgPrice', 2] }
                    }
                },
                { $sort: { count: -1 } }
            ]
        )

    // - Sử dụng khi : 
        // + Thống kê , báo cáo : Tổng doanh thu , số lượng đơn hàng theo tháng ..
        // + Tìm kiếm phức tạp : Kết hợp nhiều điều kiện , lọc dữ liệu đã được nhóm 
        // + Biến đổi dữ liệu : Thay đổi cấu trúc document trước khi trả về client
        // + Dashboard : cần nhiều chỉ số khác nhau 

// 3. Index - Tăng tốc truy vấn 

    // - Bản chất : 
        // + Index là cấu trúc dữ liệu đặc biệt (B-tree) lưu trữ một phần dữ liệu của collection theo thứ tự nhất định , giúp mongoDB
        // tìm Document nhanh chóng mà không cần quét toàn bộ 1 collection 

        // -> Giống như mục lục trong sách : thay vì đọc từng trang thì tìm theo từ khóa rồi nhảy tới trang chính xác 

    // - Các loại index : 
        // + Single Field Index : trên một trường 
        // + Compound Index : trên nhiều trường , hỗ trọ truy vấn kết hợp 
        // + Unique Index : đảm bảo giá trị không trùng , thường dùng cho email , username
        // + Text Index : cho phép tìm kiếm văn bản ($text , $search) , hỗ trợ stemming , stop words 
        // + Geospatial Index : cho toạn độ (2dsphere) 

    // - Vd : 
    productSchema.index({ name : 1 });
    productSchema.index({category : 1 , price : -1});
    productSchema.index({name : 'text' , descripton : 'text'});

    // - Khi nào sử dụng : 
        // + Trường thường xuyên nằm trong find , $macth , sort 
        // + Đảm bảo duy nhất như email , username 
        // + Tìm kiếm full-text : Khi cần tìm kiếm theo từ khóa trong nội dung lớn 