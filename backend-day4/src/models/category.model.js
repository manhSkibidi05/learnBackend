// tầng model : Định nghĩa schema -> biên dịch model từ shema -> sử dụng model thao tác với cơ sở dữ liệu 

    const mongoose = require('mongoose');

    const categorySchema = new mongoose.Schema({
            name : {
                type : String,
                required : [true , 'Tên danh mục là bắt buộc']
            },
            description : {
                type : String
            },
            isActive : {
                type : Boolean
            }
        },{
            timestamps : true // tự động thêm createAt (thời gian tạo) , updateAt (thời gian cập nhật)
        }
    )

    const Category = mongoose.model('Category', categorySchema);

    const getAll = async (query = {}) => {
        let filtered = {};
        if(query.name){
            filtered.name = { $regex : query.name , $options : 'i'};
        }
        if(query.isActive){
            filtered.isActive = query.isActive === 'true';
        }
        return await Category.find(filtered)
    }

    const getById = async (id) => {
        return await Category.findById(id)
    }

    const create = async (data) => {
        return await Category.create(data)
    }

    const update = async (id , data) => {
        return await Category.findByIdAndUpdate(id , data , {
            new : true,
            runValidators : true
        })
    }

    const remove = async (id) => {
        return await Category.findByIdAndDelete(id)
    }

    module.exports = {getAll , getById , create , update , remove}