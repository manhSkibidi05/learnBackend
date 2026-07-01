// Ngày 5 : Các kiến thức nâng cao về mongoose 

    // Nội dung chính : 
    // 1. Population (populate()) - JOIN trong mongoDB
    // 2. Aggregation Pipeline - Xử lí dữ liệu nâng cao 
    // 3. Index - Tăng tốc độ truy vấn 
    // 4. Validation - Ràng buộc dữ liệu chặt chẽ hơn 
    // 5. Plugins - Tái sử dụng logic Schema
    // 6. Middleware và virtuals - Can thiệp vòng đời của document và trường ảo 

// 1 . Population (populate()) - Thay thế tham chiếu bằng dữ liệu thật 

    // - Bản chất : 
        // + Khi bạn thiết kế các collection có mối quan hệ , thay vì nhúng toàn bộ document này vào document kìa (gây dư thừa) , bạn
        // chỉ cần lưu trường ObjectId để tham chiếu đến document trong collection khác 

        // + populate() là phương thức của Mongoose giúp tự động thay thế các ObjectId bằng toàn bộ document thực tế từ collection 
        // được tham chiếu -> tương tự JOIN trong SQL 

    // - Cách hoạt động : 
        // + Trong Schema , bạn khai báo một trường kiểu mongoose.Schema.Types.ObjectId kèm thuộc tính ref chỉ đến tên Model tham chiếu 
        
        // + Khi truy vấn , bạn gọi .populate('fieldName') . Mongoose sẽ thực hiện thêm truy vấn đến  collection kia lấy document có
        // _id khớp rồi gán vào field đó 