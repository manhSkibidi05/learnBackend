// Tầng model khởi tạo database và thao tác trực tiếp với database 

    let products = [
        {id : 1 , name : 'lego' , price : 120},
        {id : 2 , name : 'clock' , price : 140},
        {id : 3 , name : 'speaker' , price : 160},
    ]

    const getAll = (namePrd = '' , pricePrd = 0) => {
        if(products.length === 0) return null;
        if(namePrd.trim() !== '' || pricePrd !== 0){
            const prdFilter = products.filter(val => 
                val.price === Number.parseInt(pricePrd)
                || val.name.toLowerCase().includes(namePrd.trim().toLowerCase())
            )
            return prdFilter;
        }
        return products;
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
        prd = {...prd , name , price};
        return prd;
    }

    const removeById = (id) => {
        let pos = products.findIndex(val => val.id === id);
        if(pos === -1) return false;
        products.splice(pos , 1);
        return true;
    }

    module.exports = {getAll , getById , createPrd , updatePrd , removeById}

