// tầng services : xử lí logic nghiệp vụ , gọi model , ném ra lỗi gồm statusCode và message để middleware bắt lỗi tập trung

    const categoryModel = require('../models/category.model');

    const getAllCategory = async (query) => {
        if(!query.name && !query.isActive) return await categoryModel.getAll()
        if(query.name.trim() === '' ){
            const err = new Error('Name không hợp lệ');
            err.statusCode = 400;
            throw err;
        }
        return await categoryModel.getAll(query)
    }

    const getCategoryById = async (id) => {
        if(!id){
            const err = new Error('Id không hợp lệ');
            err.statusCode = 400;
            throw err;
        }
        return await categoryModel.getById(id);
    }

    const createCategory = async (data) => {
        if(!data.name || data.name.trim() === ''){
            const err = new Error('Dữ liệu đầu vào không đủ');
            err.statusCode = 400;
            throw err;
        }
        return await categoryModel.create(data)
    }

    const updateCategory = async (id , data) => {
        if(!id){
            const err = new Error('Id không hợp lệ');
            err.statusCode = 400;
            throw err;
        }
        if(data.name && data.name.trim() !== ''){
            const err = new Error('Tên danh mục không được để trống');
            err.statusCode = 400;
            throw err;
        }
        const updated = await categoryModel.update(id , data);
        if(!updated){
            const err = new Error('Danh mục không tồn tại');
            err.statusCode = 404;
            throw err;
        }
        return updated;
    }

    const removeCategory = async (id) => {
        if(!id){
            const err = new Error('Id không hợp lệ');
            err.statusCode = 400;
            throw err;
        }
        const deleted = await categoryModel.remove(id);
        if(!deleted){
            const err = new Error('Danh mục không tồn tại');
            err.statusCode =  404;
            throw err;
        }
    }

    module.exports = {getAllCategory , getCategoryById , createCategory , updateCategory , removeCategory}