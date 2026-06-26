// tầng controllers : nhận dữ liệu req , gọi services , nhận dữ liệu trả lại từ services , gọi response

    const categoryServices = require('../services/category.service');
    const asyncHandler = require('../middleware/asyncHandler');

    const getAll = asyncHandler(async (req , res) => {
        const categories =  await categoryServices.getAllCategory(req.query);
        res.json({success : true , data : categories});
    })

    const getById = asyncHandler(async (req , res) => {
        const category = await categoryServices.getCategoryById(req.params.id);
        res.json({success : true , data : category});
    })

    const create = asyncHandler(async (req , res) => {
        const category = await categoryServices.createCategory(req.body)
        res.status(201).json({success : true , data : category});
    })

    const update = asyncHandler(async (req , res) => {
        const category = await categoryServices.updateCategory(req.params.id , req.body)
        res.json({success : true , data : category});
    })

    const remove = asyncHandler(async (req , res) => {
        const category = await categoryServices.removeCategory(req.params.id);
        res.status(204).json({success : true });
    })

    module.exports = {getAll , getById , create , update , remove}
