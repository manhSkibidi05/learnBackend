// Review ngày 5 : Học nânng cao về mongoose , làm chủ công cụ mạnh mẽ để xử lý dữ liệu phức tạp , tối ưu hiệu năng và tạo ra 
// mối quan hệ thực thụ giữa các collection 

    // 1. Population : là kĩ thuật sử dụng trong mongoose khi lấy dữ liệu từ 1 document mà trong document có trường chứa dữ liệu
    // từ 1 document trong collection khác , không cần nhúng toàn bộ document vào mà chỉ cần ObjectId và lúc lấy dữ liệu cần sử dụng 
    // phương thức populate()

    // - Các bước cần thực hiện để lấy dữ liệu 

        // Bước 1 : Định nghĩa schema cho document 
        const mongoose = require('mongoose')

        // Định nghĩa 1 schema sửa dụng new mongoose . đối tượng Schema và có thể truyền vào 2 đối tượng gồm : 
            // + Đối tượng đầu tiên định nghĩa các trường dữ liệu , 1 trường dữ liệu bao gồm kiểu dữ liệu và các ràng buộc khi nhập dữ liệu đó
            // + Đối tượng thứ 2 là các tiện ích có thể thêm vào khi tạo 1 document như thời gian tạo/chỉnh sửa timestamps : true
        const schemaTienIch = new mongoose.Schema(
            {
                name : {
                    type : String ,
                    required : [true , 'tên tiện ích là bắt buộc']
                } ,
            } , {
                timestamps : true
            }
        );

        // Định nghĩa 1 model sử dụng hàm model từ mongoose cung cấp cần truyền vào 2 tham số gồm 
            // + Tên model 
            // + schema mà model này dựa vào để có thể thực hiện các thao tác như thêm/sửa/xóa document trong collection mà nó ánh xạ tới 
        const TienIch = mongoose.model('TienIch' , schemaTienIch);

        // Định nghĩa schema khi muốn sử dụng document của collection khác bên trong 1 document 
        const schemaKhachSan = new mongoose.Schema(
            {
                name : {
                    type : String ,
                    required : [true , 'tên khách sạn là bắt buộc']
                },
                diaChi : {
                    type : String
                },
                soDienThoai : {
                    type : String
                },
                // Định nghĩa trường chứa dữ liệu document của collection khác gồm : 
                    // + type : kiểu dữ liệu của trường này = ObjectId 
                    // + ref : Tên model 
                tienIch : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'TienIch'
                }
            },
            {
                timestamps : true
            }
        );

        const KhachSan = mongoose.model('KhachSan' , schemaKhachSan);
        const dsKhachSan = await KhachSan.find().populate('tienIch');

    // - Giải thích chi tiết :
        // + Giải thích về ObjectId : mỗi document đều có 1 ObjectId duy nhất dùng để tham chiếu đến document đó 
        // -> khi mà 1 trường mang type là ObjectId thì nó chỉ chứa địa chỉ đến 1 document chứ không chứa cả document đó 

        // + ref : là một tham số chứa tên của model cần tham chiếu đến model này để lấy dữ liệu dựa trên ObjectId
        // -> Khi 1 trường mang ref này thì trường đó sẽ dựa trên model của ref này mà sẽ đến model đó để lấy dữ liệu 

        // + Cách hoạt động populate() : 
            // B1 : KhachSan.find() : mongoose gửi truy vấn đến database để lấy tất cả dữ liệu từ collection khachSans 
            // B2 : populate('tienIch') : mongoose tự thực hiện truy vấn thứ 2 lấy dữ liệu từ ObjectId bên trong tên trường truyền vào 