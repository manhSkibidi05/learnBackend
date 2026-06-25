// Định nghĩa lại tầng controller do service trả về Promise -> thao tác bất đồng bộ để có thể bắt lỗi bằng try/catch sử dụng async/await

    // Tầng controllers thực hiện điều phối dữ liệu chuyển dữ liệu của req cho sevices , nhận dữ liệu trả về , hoàn thành res

    const productService = require('../services/product.service');

    const getAll = async (req , res) => {
        try{
            const query = req.query;
            const products = await productService.getAllPrd(query);
            res.json({data : products});
        }catch(err){
            res.status(500).json({error : err.message})
        }
    }

    const getById = async (req , res) => {
        try{
            const id = req.params.id ;
            const prd = await productService.getPrdById(id);
            res.json({data : prd});
        }catch(err){
            if(err.message === 'Input value invalid') return res.status(400).json({error : err.message});
            if(err.message === 'Data not found') return res.status(404).json({error : err.message});
            return res.status(500).json({error: err.messgae})
        }
    }

    const createPrd = async (req , res) => {
        try{
            const {name , price} = req.body;
            const prd = await productService.createNewPrd(name , price);
            res.status(201).json({data : prd});
        }catch(err){
            if(err.message === 'Input value invalid') return res.status(400).json({error : err.message});
            return res.status(500).json({error: err.messgae})
        }
    }

    const updatePrd = async (req , res) => {
        try{
            const id = req.params.id
            const data = req.body;
            const prd = await productService.updatePrdById(id , data);
            res.json({data : prd})
        }catch(err){
            if(err.message === 'Input value invalid') return res.status(400).json({error : err.message});
            if(err.message === 'Data not found') return res.status(404).json({error : err.message});
            return res.status(500).json({error: err.messgae})
        }
    }

    const removePrd = async (req , res) => {
        try{
            const id = req.params.id;
            const completed = await productService.removePrdById(id);
            res.status(204).end();
        }catch(err){
            if(err.message === 'Input value invalid') return res.status(400).json({error : err.message});
            if(err.message === 'Data not found') return res.status(404).json({error : err.message});
            return res.status(500).json({error: err.messgae})
        }
    }

    module.exports = {getAll , getById , createPrd , updatePrd , removePrd};

