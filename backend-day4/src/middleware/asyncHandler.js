// định nghĩa middleware bắt lỗi tự động 

    const asyncHandler = (func) => (req , res , next) => {
        Promise.resolve(func(req , res , next)).catch(next);
    }

    function asyncHandler2(func){
        return function(req , res , next){
            return Promise.resolve(func(req , res, next)).catch(next);
        }
    }

    module.exports = asyncHandler;

