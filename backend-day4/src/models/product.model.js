// Định nghĩa lại tầng model thay vì sử dụng mảng -> sử dụng mongoDB để lưu trữ dữ liệu 

    const mongoose = require('mongoose');

    // Định nghĩa schema 
    const productSchema = new mongoose.Schema({
            name : {
                type : String,
                required : [true , 'tên sản phẩm bắt buộc'],
                trim : true
            },
            price : {
                type : Number,
                required : [true , 'giá sản phẩm bắt buộc'],
                min : [0 , 'giá phải > 0']
            }
        }, {
            timestamps : true // tự động thêm createAt , updateAt
        }
    )

    // Tạo model từ schema 
    const Product = mongoose.model('Product' , productSchema);
    // -> khi khởi tạo model Product sẽ tự động khởi tạo 1 collection tên products 

    // hàm getAll lấy tất cả hỗ trợ filter 
    const getAll = async (filter = {}) => {
        const query = {};
        if(filter.name){
            query.name = { $regex : filter.name , $options : 'i'} // tìm gần đúng không phân biệt hoa thường
        }

        if(filter.price){
            query.price = filter.price
        }
        return await Product.find(query)
    }

    // hàm lấy theo id 
    const getById = async (id) => {
        return await Product.findById(id)
    }

    // hàm tạo mới sản phẩm 
    const createPrd = async (name , price) => {
        const newPrd = new Product({name , price})
        return await newPrd.save();
    }

    // hàm cập nhật sản phẩm 
    const updatePrd = async (id , name , price) => {
        return await Product.findByIdAndUpdate(id , {name , price} , {new : true , runValidators : true});
    }

    // hàm xóa sản phẩm 
    const removeById = async (id) => {
        return await Product.findByIdAndDelete(id)
    }

    module.exports = {getAll , getById , createPrd , updatePrd , removeById};

// -> tất cả hàm đều phải là async và trả về Promise vì Mongoose thao tác với DB là bất đồng bộ 
