// Tầng model khởi tạo database và thao tác trực tiếp với database 

    let products = [
        {id : 1 , name : 'lego' , price : 120},
        {id : 2 , name : 'clock' , price : 140},
        {id : 3 , name : 'speaker' , price : 160},
    ]

    const getAll = (filter = {}) => {
        let result = [...products];
        if (filter.name) {
            result = result.filter(p => p.name.toLowerCase().includes(filter.name.toLowerCase()));
        }
        if (filter.price) {
            const price = parseFloat(filter.price);
            if (!isNaN(price)) {
            result = result.filter(p => p.price === price);
            }
        }
        return result; // mảng rỗng nếu không có kết quả
    }

    const getById = (id) => {
        let prd = products.find(val => val.id === id);
        if(!prd) return null;
        return prd;
    }

    const createPrd = (name , price) => {
        const newPrd = {
            id : products.length + 1,
            name,
            price
        };
        products.push(newPrd);
        return newPrd;
    }

    const updatePrd = (id , name , price) => {
        let prd = products.find(val => val.id === id);
        if(!prd) return null;
        prd.name = name;
        prd.price = price;
        return prd;
    }

    const removeById = (id) => {
        let pos = products.findIndex(val => val.id === id);
        if(pos === -1) return false;
        products.splice(pos , 1);
        return true;
    }

    module.exports = {getAll , getById , createPrd , updatePrd , removeById}

