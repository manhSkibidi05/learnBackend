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

// Review ngày 4 (tiếp) : 

    // - MongoDB : là cơ sở dữ liệu lưu trữ dữ liệu dạng noSQL 
    
    // + Collection : là một tập hợp các document mang cấu trúc nhất quán với nhau có thể các trường không
    // hoàn toàn giống nhau 
    
    // + Document : là một tài liệu lưu trữ dưới dạng BSON hỗ trợ nhiều kiểu dữ liệu hơn JSON thường 
        // - trường _id nếu không định nghĩa thì sẽ được mongoDB định nghĩa -> sử dụng để định danh 1 dữ liệu duy nhất
        // - các loại dữ liệu trong document có thể lưu : dữ liệu nguyên thủy (string , number...) , arr/obj , enum ...
        // - các document trong cùng collection không bắt buộc có cùng cấu trúc nhưng để dễ quản lí và truy vấn bạn nên thiết kế tương đối đồng nhất
        // - hỗ trợ việc lồng ghép obj và arr để biểu diễn quan hệ

    // + Schema : là bản thiết kế để định nghĩa 1 Document , Schema định nghĩa các :
        // - kiểu dữ liệu , ràng buộc , giá trị mặc định , index , getter/setter , virtual , middeware

    // + Model : là một nhà sản xuất vận hành bản thiết kế của Schema , nó đại diện cho 1 Collection
    // -> Dựa vào bản thiết kế Model giúp thao tác với mongoDB thêm , sửa , xóa... dữ liệu 

    // + Mối quan hệ giữa Schema , Model , Collection 
    // -> Schema định nghĩa bản thiết kế  -> Model biên dịch ra từ Schema thao tác trực tiếp vs database -> Collection
    // quản lý bởi Model 

// - Review ngày 4 : 

    // MongoDB : Là hệ quản trị cơ sở dữ liệu NoSQL 1 dữ liệu sẽ được lưu dưới dạng Document
    // - Các Khái niệm quan trọng của mongoDB
        // 1. Database : Là cơ sở dữ liệu chứa nhiều collection , dùng để phân tách dữ liệu theo dự án hoặc môi trường

        // 2. Document : Là 1 đơn vị lưu trữ cơ bản trong mongoDB tương đương với 1 bản ghi trong SQL 
        // -> Document lưu trữ dữ liệu dưới dạng BSON
        
        // 3. BSON : Là định dạng dữ liệu nhị phân mở rộng của JSON , được mongoDB dùng để lưu trữ và trao đổi dữ liệu
        // -> BSON chính là cách Document lưu trữ dữ liệu 
        
        // 4. Collection : Là nhóm các Document trong MongoDB , là nơi lưu trữ các Document thực tế trong MongoDB
        // -> Các Document ở cùng 1 Collection không có Schema cố định có thể khác nhau về trường dữ liệu trong Document

    // - Các Khái niệm quan trọng của mongoose 
        // 1. Mongoose : Là thư viện cung cấp bởi node.js cho phép thao tác và kết nối với mongoDB thông qua phương thức và thuộc tính cung cấp sẵn

        // 2. Schema : Là bản thiết kế cho cấu trúc 1 document , định nghĩa các trường , kiểu dữ liệu , ràng buộc
        
        // 3. Model : Là 1 constructor tạo từ 1 Schema , dùng để tương tác với 1 Collection cụ thể trong mongoDB ,
        // cung cấp các phương thức CRUD
        // -> Model là lớp chỉ là trung gian thực hiện yêu cầu sau đó sẽ gửi yêu cầu về database và Collection sẽ thực hiện 
        // nó trong database 
    
    // -> Có thể hiểu là Database nơi lưu trữ dữ liệu thật trên mongoDB quản lí nó còn mongoose cung cấp các phương thức để thực hiện thao tác trung gian giữa database  và server
