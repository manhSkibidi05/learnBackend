// Tầng controllers thực hiện điều phối dữ liệu chuyển dữ liệu của req cho sevices , nhận dữ liệu trả về , hoàn thành res

    const productService = require('../services/product.service');

    const getAll = (req , res) => {
        try{
            const query = req.query;
            const products = productService.getAllPrd(query);
            res.json({data : products});
        }catch(err){
            res.status(404).json({error : err.message})
        }
    }

    const getById = (req , res) => {
        try{
            const id = req.params.id ;
            const prd = productService.getPrdById(id);
            res.json({data : prd});
        }catch(err){
            if(err.message === 'Input value invalid') res.status(400).json({error : err.message});
            res.status(404).json({error : err.message});
        }
    }

    const createPrd = (req , res) => {
        try{
            const {name , price} = req.body;
            const prd = productService.createNewPrd(name , price);
            res.status(201).json({data : prd});
        }catch(err){
            res.status(400).json({error : err.message});
        }
    }

    const updatePrd = (req , res) => {
        try{
            const id = req.params.id
            const data = req.body;
            const prd = productService.updatePrdById(id , data);
            res.json({data : prd})
        }catch(err){
            if(err.message === 'Input value invalid') res.status(400).json({error : err.message});
            res.status(404).json({error : err.message});
        }
    }

    const removePrd = (req , res) => {
        try{
            const id = req.params.id;
            productService.removePrdById(id);
            res.status(204)
        }catch(err){
            if(err.message === 'Input value invalid') res.status(400).json({error : err.message});
            res.status(404).json({error : err.message});
        }
    }

    module.exports = {getAll , getById , createPrd , updatePrd , removePrd};

