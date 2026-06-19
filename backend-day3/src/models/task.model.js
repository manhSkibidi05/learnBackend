// Dữ liệu mẫu khi chưa thao tác với database thật 

    let products = [
        {id : 1 , title : 'iphone' , price : 12 , sold : true},
        {id : 2 , title : 'laptop' , price : 122 , sold : false},
        {id : 3 , title : 'spiner' , price : 112 ,  sold : false},
        {id : 4 , title : 'tree' , price : 5 , sold : true },
        {id : 5 , title : 'speaker' , price : 512 , sold : false},
    ];

    // Hàm lấy tất cả sản phẩm có thể lọc lấy theo trạng thái 
    const getAll = (filter = {} ) => {
        let result = [...products];
        if(filter.sold){
            result = products.filter(prd => prd.sold === filter.sold)
        }
        return result;
    }

    // Hàm lấy sản phẩm dựa trên id 
    const getById = (id) => {
        return products.find(prd => prd.id === id) || null;
    }

    // Hàm tạo sản phẩm mới 
    const createProduct = (title , price) => {
        const newProduct = {
            id : products.length > 0 ? Math.max(...products.map(prd => prd.id)) + 1 : 1,
            title,
            price,
            sold : false
        }
        products.push(newProduct);
        return newProduct
    }

    // Cập nhật sản phẩm 
    const updateProduct = (newPrd) => {
        let prd = products.find(val => val.id === newPrd.id);
        if(!prd) return null;
        prd = newPrd;
        return prd; 
    }

    // Xóa sản phầm 
    const removeProduct = (id) => { 
        let pos = products.findIndex(val => val.id === newPrd.id);
        if(pos === -1) return false;
        products.splice(pos , 1);
        return true;
    }

    module.exports = {getAll , getById , createProduct , updateProduct , removeProduct} 

    // - Giải thích : Chúng ta đóng gói tất cả các thao tác với dữ liệu vào 1 obj export 
    // -> sau này chỉ cần sửa file này (vd thay = database) mà không ảnh hưởng tới file khác
    