// Tầng sevices chứa logic nghiệp vụ -> hiện tại đơn giản chỉ xác định dữ liệu đầu vào đơn giản 
// và gọi model hợp lệ nhưng sau này sẽ phức tạp hơn

    const productModel = require('../models/task.model');

    const getAllPrd = (query) => {
        return productModel.getAll(query);
    }

    const getPrdById = (id) => {
        const product = productModel.getById(id);
        if(!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    const createNewPrd = (title , price) => {
        if(!title || title.trim() === '' || !price || price === 0){
            throw new Error('Data not good')
        }
        const product = productModel.createProduct(title.trim() , price);
        return product;
    }

    const updatePrd = (newPrd) => {
        if(newPrd.id === null){
            throw new Error('Data not good');
        }
        const product = productModel.updateProduct(newPrd);
        if(!product){
            throw new Error('Product not found');
        }
        return product;
    }

    const removePrd = (id) => {
        const removed = productModel.removeProduct(id);
        if(!removed){
            throw new Error('Product not found');
        }
        return removed;
    }

    module.exports = {getAllPrd , getPrdById , createNewPrd , updatePrd , removePrd}

    // - Lưu ý : services sẽ ném lỗi nếu không tìm thấy dữ liệu khi cung cấp dữ liệu cho model hoặc
    // kiểm ra dữ liệu đầu vào không hợp lệ -> controllers bắt lỗi này và trả về response thích hợp
    // -> Đây là cách xử lí sạch không để controllers phải kiểm tra dữ liệu vào , controllers chỉ nhận lỗi hoặc dữ liệu 
