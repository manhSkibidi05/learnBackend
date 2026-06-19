// Tầng controllers làm nhiệm vụ nhận dữ liệu req , gọi controllers đợi dữ liệu trả về , cuối cùng gửi res 

    const productSevices = require('../services/task.service');

    const getAll = (req , res) => {
        try{
            const products = productSevices.getAllPrd(req.query);
            res.json({data : products});
        }catch(err){
            res.status(500).json({error : err.message});
        }
    }

    const getById = (req , res) => {
        try{
            const id = parseInt(req.params.id)
            const product = productSevices.getPrdById(id);
            res.json({data : product})
        }catch(err){    
            if(err.message === 'Product not found') res.status(404).json({error : err.message});
            res.status(500).json({error : err.message});
        }
    }

    const create = (req , res) => {
        try{
            const {title , price} = req.body;
            const product = productSevices.createNewPrd(title , price);
            res.status(201).json({data : product});
        }catch(err){
            res.status(400).json({error : err.message});
        }
    }

    const update = (req , res) => {
        try{
            const product = productSevices.updatePrd(req.body);
            res.json({data : product})
        }catch(err){
            if(err.message === 'Product not found') res.status(404).json({error : err.message});
            res.status(400).json({error : err.message});
        }
    }

    const remove = (req , res) => {
        try{
            const id = parseInt(req.params);
            const removed = productSevices.removePrd(id);
            res.json({data : removed});
        }catch(err){
            if(err.message === 'Product not found') res.status(404).json({error : err.message});
            res.status(500).json({error : err.message})
        }
    }

    module.exports = {getAll , getById , create , update , remove}

    // - Điểm quan trọng : Controllers bọc hoàn toàn các câu lệnh của hàm trong try/catch để có thể
    // bắt lỗi từ services trả về . Nó phân biệt lỗi 404 , 400 ,500 dựa vào message -> cách chuyên nghiệp hơn là dùng custom error class
    
    module.exports = {getAll , getById , create , update , remove}
    