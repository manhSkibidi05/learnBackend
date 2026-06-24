// Tầng services kiểm tra dữ liệu , thao tác logic nghiệp vụ , gọi model 

    const productModel = require('../models/product.model');

    const getAllPrd = (query) => {
        const filter = {};
        if (query && query.name) filter.name = query.name;
        if (query && query.price) filter.price = query.price;
        return productModel.getAll(filter); // không cần throw nếu rỗng, controller vẫn trả 200
    }

    const getPrdById = (id) => {
        if(!id) throw new Error('Input value invalid');
        const prd = productModel.getById(Number.parseInt(id));
        if(!prd) throw new Error('Data not founds');
        return prd;
    }

    const createNewPrd = (name , price) => {
        const priceNum = parseFloat(price);
        if(name.trim() === '' || isNaN(priceNum) || priceNum <=0 ) throw new Error('Input value invalid');
        const newPrd = productModel.createPrd(name , price);
        return newPrd;
    }

    const updatePrdById = (id , newPrd = null) => {
        if(!id || !newPrd) throw new Error('Input value invalid');
        
        const {name , price} = newPrd;
        const priceNum = parseFloat(price);
        if(name.trim() === '' || isNaN(priceNum) || priceNum <= 0) throw new Error('Input value invalid');

        const prd = productModel.updatePrd(Number.parseInt(id) , name , price);
        if(!prd) throw new Error('Data not founds');
        return prd;
    }

    const removePrdById = (id) => {
        if(!id) throw new Error('Input value invalid');
        const completed = productModel.removeById(Number.parseInt(id));
        if(completed === false) throw new Error('Data not founds');
        return completed;
    }

    module.exports = {getAllPrd , getPrdById , createNewPrd , updatePrdById , removePrdById}
