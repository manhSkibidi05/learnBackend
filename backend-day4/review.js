// review ngày 4 : 

    // - MongoDB : là cơ sở dữ liệu giúp lưu trữ dữ liệu một cách linh hoạt hơn kể cả khi chúng ta tắt ứng dụng đi thì dữ liệu 
    // vẫn còn được lưu trữ đến lần khởi động app kế tiếp thì sẽ dựa trên dự liệu từ các lần trước đã lưu lại . 
    // - MongoDB : Lưu trữ dữ liệu theo dạng noSQL (not only SQL) 

// Tìm hiểu Mô hình dữ liệu được lưu trữ trong MongoDB -> cách lưu trữ dữ liệu (noSQL)

    // 1. Mô hình dữ liệu trong MongoDB
        // - Lưu trữ dữ liệu theo cấu trúc phân cấp 
        // -> Database (cơ sở dữ liệu) -> Collection (tập hợp) -> Document (tài liệu) -> Field (trường) : value (giá trị)

        // - So sánh với SQL : 
            // + Database = Database 
            // + Table = Collection
            // + Row = Document
            // + Column = field

    // -> Mỗi document trong cùng 1 collection có thể có cấu trúc khác nhau không bị ràng buộc bởi 1 schema cố định như SQL

    // 2. Document là gì ? 
        // - Là một đối tượng JSON (chính xác là BSON - binary JSON) chứa các cặp key-value 

        // - Mỗi document có 1 trường đặc biệt _id đóng vai trò khóa chính , duy nhất trong collection -> giá trị bắt buộc phải có trong 1 document
        // -> Nếu bạn không chỉ định , MongoDB sẽ tự động tạo một giá trị kiểu ObjectId

        // - Document có thể chứa :
            // + Các giá trị đơn giản : string , number , boolean , date , null...
            // + Mảng : array
            // + Đối tượng con : embedded document
            // + Mảng các đối tượng con
        // -> Kích thước tối đa 1 document là 16mb

        // vd : document lưu trữ thông tin sách
        // {
        //     "_id" : "507f1f77bcf86cd799439011", -> ObjectId do mongoDB tự sinh ra
        //     "title" : "Đắc nhân tâm",
        //     "author" : {                        -> là một embedded document (tài liệu nhúng)
        //         "name" : "Dago",
        //     }
        // }

    // 3. Collection là gì ? 
        // - Collection là một nhóm các document , không yêu cầu schema thống nhất , các document trong cùng collection có thể có các trường khác nhau
        
        // - Tên collection thường là danh từ số nhiều ,  chữ thường vd: products , users ...

        // - Khi bạn chèn document đầu tiên vào 1 collection chưa tồn tại , mongoDB tự động tạo collection đó

        // -> Trong thực tế dù linh hoạt nhưng bạn vẫn nên duy trì 1 cấu trúc nhất quán cho các document trong 1 collection để dễ truy vấn và bảo trì

    // 4. Định nghĩa Schema và Model với Mongoose 

        // 1. Schema là gì ? 
            // - Là 1 bản thiết kế khai báo cấu trúc của 1 document : các trường (field) , kiểu dữ liệu , giá trị mặc định , ràng buộc (validator) , chỉ mục (index)...
            // -> Giúp chuẩn hóa dữ liệu trước khi lưu vào mongoDB
            // ->  cú pháp : new mongoose.Schema(definition , options)

        // -> Schema chỉ là 1 đối tượng cấu hình thuần thúy không cho phép bạn tương tác trực tiếp với cơ sở dữ liệu  

        // 2. Model là gì ? 
            // - Là 1 constructor được tạo ra từ schema 
            // - Model cung cấp cho bạn : 
                // + Khả năng tương tác với database : find() , create()...
                // + Đại diện cho 1 collection : Mỗi model gắn liền với 1 collection 
                // + Áp dụng validation từ Schema : khi bạn tạo , cập nhật document thông qua model các quy tắc schema được kiểm tra
                // + Cung cấp các hook (middleware) : can thiệp vòng đời của 1 document
                // + Quản lý kết nối : thông qua model bạn sử dụng chung connection pool tới mongoDB

            // -> cú pháp : mongoose.model('Product' , productSchema)

        // -> Model là đối tượng mang bản thiết kế của schema từ đó nó có thể thêm , sửa , xóa... các document từ bản thiết kế này 
        // -> Schema định nghĩa và cung cấp bản thiết kế còn Model là nơi sản xuất ra các document dựa trên bản thiết kế này và quản lí các document đó

        // vd : 
        const mongoose = require('mongoose');

        const productSchema = new moongose.Schema({
            // trường tên 
            name : {
                type : String,
                required : [true , 'Tên sản phẩm là bắt buộc'],
                trim : true,
                maxlength : [100 , 'Tên không được vượt quá 100 kí tự']
            },

            // trường giá 
            price : {
                type : Number,
                required : [true , 'Giá là bắt buộc'],
                min : [0 , 'Giá phải > 0']
            },

            // trường mô tả không bắt buộc 
            description : {
                type : String,
                default : ''
            },

            // Danh mục: chỉ được nằm trong các giá trị cho trước
            category: {
                type: String,
                enum: ['electronics', 'clothing', 'food', 'toy'],
                default: 'toy'
            },
            // Số lượng tồn kho
            stock: {
                type: Number,
                default: 0,
                min: 0
            },
            // Mảng các thẻ tag
            tags: {
                type: [String],
                validate: {
                validator: function(arr) {
                    return arr.length <= 10; // tối đa 10 thẻ
                },
                message: 'Số lượng tag không vượt quá 10'
                }
            },
            // Ngày tạo (tự động nếu dùng timestamps)
            createdAt: {
                type: Date,
                default: Date.now
            }
            }, {
            timestamps: true, // tự động thêm createdAt và updatedAt
            toJSON: { virtuals: true }, // cho phép virtual field xuất hiện khi JSON.stringify
            toObject: { virtuals: true }
        });

        // tạo model 
        const Product = mongoose.model('Product' , productSchema);

        module.exports = Product

    // 3. Các tùy chọn validation và Schema Options
        //    required: bắt buộc, có thể kèm thông báo lỗi.

        //    unique: tạo unique index, đảm bảo không trùng (lưu ý: không phải validator thực sự, cần xử lý lỗi trùng).

        //     default: giá trị mặc định nếu không cung cấp.

        //     enum: giới hạn giá trị trong một tập hợp.

        //     min, max: cho Number hoặc Date.

        //     match: kiểm tra regex cho String.

        //     custom validator: dùng validate: { validator: function, message: '...' }.

        //     Schema options hữu ích:

        //     timestamps: true: tự động thêm createdAt, updatedAt.

        //     collection: 'tên_collection': đặt tên collection khác mặc định.

        //     toJSON, toObject: thêm virtuals, ẩn field (ví dụ password).