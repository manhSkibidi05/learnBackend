// Tầng services kiểm tra dữ liệu , thao tác logic nghiệp vụ , gọi model 

    const productModel = require('../models/product.model');

    const getAllPrd = async (query) => {
        const filter = {};
        if (query && query.name) filter.name = query.name;
        if (query && query.price) filter.price = query.price;
        return await productModel.getAll(filter); // không cần throw nếu rỗng, controller vẫn trả 200
    }

    const getPrdById = async (id) => {
        if(!id) throw new Error('Input value invalid');
        const prd = await productModel.getById(id);
        if(!prd) throw new Error('Data not founds');
        return prd;
    }

    const createNewPrd = async (name , price) => {
        const priceNum = parseFloat(price);
        if(name.trim() === '' || isNaN(priceNum) || priceNum <=0 ) throw new Error('Input value invalid');
        const newPrd = await productModel.createPrd(name , price);
        return newPrd;
    }

    const updatePrdById = async (id , newPrd = null) => {
        if(!id || !newPrd) throw new Error('Input value invalid');
        
        const {name , price} = newPrd;
        const priceNum = parseFloat(price);
        if(name.trim() === '' || isNaN(priceNum) || priceNum <= 0) throw new Error('Input value invalid');

        const prd = await productModel.updatePrd(id , name , priceNum);
        if(!prd) throw new Error('Data not founds');
        return prd;
    }

    const removePrdById = async (id) => {
        if(!id) throw new Error('Input value invalid');
        const completed = await productModel.removeById(id);
        if(completed === false) throw new Error('Data not founds');
        return completed;
    }

    module.exports = {getAllPrd , getPrdById , createNewPrd , updatePrdById , removePrdById}
