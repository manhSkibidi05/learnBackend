// Review ngày 3 

    // - Hiện tại việc tạo ra server và các bước xử lí request bao gồm tạo middlerware , tạo route , định 
    // nghĩa route đó , kiểm tra dữ liệu đầu vào req res , xử lí logic validate , thao tác với cơ sở dữ liệu
    // đều nằm trong 1 file nếu không chia ra 
    // -> Khiến file trở nên phình to khi phải định nghĩa nhiều route 

    // - Học về cách tổ chức lại folder code ở phía server thay vì việc viết tất cả thao tác trong 1 file
    // -> Việc chia nhỏ thành nhiều thao tác nằm trong các folder khác nhau giúp dễ phát triển từng thao tác
    // dễ dàng kiểm thử , dễ dàng debug khi gặp lỗi 

    // - Tổ chức lại folder lúc này file app.js là file chính chứa tổng hợp các file còn lại , tạo và chạy server 
    // tạo middleware cho route 

    const express = require('express');
    const app = express();

    app.use(express.json());

    const PORT = 3000;
    app.listen(PORT , () => {
        console.log(`server đang đươcj chạy tại http://localhost:${PORT}`)
    })

    // - Việc định nghĩa route sẽ chia nhỏ thành 4 tầng nằm ở 4 folder khác nhau , mỗi tầng sẽ đảm nhiệm 1 thao tác
    // khác nhau nhằm chia nhỏ việc định nghĩa 1 route 
    // -> Thứ tự định nghĩa các tầng là : models -> services -> controllers -> routes

        // + Tầng models (/models)
            // - Công việc chính : Tầng này sẽ thực hiện tao tác trực tiếp với database như thêm , sửa , xóa... dữ liệu dựa  
            // trên yêu cầu của request
            // - Giao tiếp với tầng khác : dựa trên dữ liệu được nhận từ services vào models sẽ trả về 1 dữ liệu 2 trả về null 
            // từ đó services nhận lại các dữ liệu trả về rồi thực hiện tiếp các thao tác đề hoàn thành request
            // -> Tại sao tên là models : mô hình dữ liệu thao tác trực tiếp dữ liệu

        // + Tầng services (/services) 
            // - Công việc chính : Tầng này sẽ thực hiện xác định dữ liệu đầu vào , thực hiện logic nghiệp vụ phức tạp
            // validate ,  không thao tác trực tiếp với database , gọi models
            // - Giao tiếp với tầng khác : Nhận dữ liệu trực tiếp từ controllers và  cung cấp dữ liệu cho models để models trả về dữ liệu của database
            // sau đó dựa trên dữ liệu trả về nếu hợp lệ sẽ trả về dữ liệu cho controllers , ngoài ra khi gặp lỗi lúc kiểm tra dữ liệu hay dữ liệu null 
            // thì có thể ném ra lỗi cho controllers bẳt
            // -> Tại sao tên là services(dịch vụ) : cung cấp logic nghiệp vụ , kiểm tra dữ liệu cho controllers

        // + Tầng controllers (/controllers)
            // - Công việc chính : Tầng này sẽ thực hiện cung cấp dữ liệu đầu vào của req cho services , lấy dữ 
            // liệu services trả về , định nghĩa res gửi cho client rồi  kết thúc 1 request
            // - Giao tiếp với tầng khác : định nghĩa hàm handler của route gồm req và res nhưng bọc trong khối
            // cung cấp dữ liệu req cho services và nhận lại dữ liệu nếu là lỗi sẽ bắt và trả về res với lỗi , 
            // nếu là dữ liệu trả về res với dữ liệu kết thúc request

        // + Tầng routes (/routes)
            // + Công việc chính : Tầng này sẽ định nghĩa các route bằng cách cung cấp method và url sau đó gọi hàm 
            // được định nghĩa bởi controllers hợp lí với route 
            // + Giao tiếp với tầng khác : Gọi các hàm của controllers sao cho phù hợp với method và url từ đó 
            // hoàn thiện 1 route 

    // -> 1 request khi được gửi lên server sẽ đi qua tầng routes đầu tiên xác nhận thuộc route nào bàng url và method
    // tiếp theo đến tầng controllers cung cấp dữ liệu của req cho services , tiếp theo tầng sevices thực hiện kiểm tra
    // dữ liệu và logic nghiệp vụ và gọi models , tầng moldes thao tác trực tiếp với database sau đó trả về lại services ,
    // services trả về lại cho controllers hoàn thành res và kết thúc 1 req.
    
// Đào sâu kiến thức ngày 3 : Router , require/export , use 

    // 1. Router 

        // - Router là gì : Router là một bộ định tuyến độc lập , nó chứa danh sách các route và middleware riêng , khi được
        // mount (gắn) vào app nó hoạt động như 1 phần của hệ thống định tuyến tổng thể 

        // - Cú pháp : 
        express.Router();
        // - Router() : là 1 phương thức tính của express trả về 1 đối tượng router . Bạn có thể coi router là 1 ứng dụng express
        // nhỏ -> router có thể định nghĩa các route và sử dụng middleware giống như app nhưng không lắng nghe cổng để tạo server

        // - Mục đính chính khi sử dụng nhóm các route lại thành 1 router là : 

            // + Tổ chức code : Khi dự án lớn , có hàng chục route , việc tách nhóm giúp file app.js gọn gàng và dễ đọc hơn

            // + Tiền tố chung : Bạn chỉ cần khai báo các route có chung tiền tố 1 lần ở app.use('/tasks',taskRoutes) vì khi
            // gắn router đã được định nghĩa vào app các request mang tiền tố này sẽ đi vào router này nới chứa các route
            // có tiền tố 'tasks' 

            // + Middleware riêng cho từng nhóm : khi cần middleware riêng cho từng nhóm router thì việc tạo router riêng 
            // nhóm các route có chung middleware lại sẽ tránh ảnh hưởng tới route khác

            // + Khả năng tái sử dụng : Có thể dùng cùng 1 router ở nhiều nơi 

            // + Phân công nhóm : Mỗi lập trình viên phụ trách router riêng không sợ xung đột với nhau 

        // -> Định nghĩa router giúp nhóm các route có đặc điểm chung lại thành 1 nhóm các đặc điểm có thể nhóm như : chung tiền
        // tố url , chung middleware ... Việc nhóm lại các route này chia nhỏ các route có đặc điểm chung lại giúp code dễ đọc
        // và fix bug 

    // 2. use() 

        // - Hàm use() : Là hàm của app (ứng dụng trả về express) dùng để mount (gắn) middleware và router vào app 
        // -> Khi được mount vào app 1 request của client sẽ đi qua các middleware / router đã được gắn 

        app.use('/tasks' , taskRoutes); // mount router vào app

        // - Khi bạn truyền vào 1 đường dẫn vào 1 router , lúc này express chuyển tất cả req có url bắt đầu bằng /tasks sang router này
        // -> sau đó khi vào router sẽ xử lí phần còn lại của đường dẫn , vd : với req DELETE /tasks/5 -> vào app -> khớp với url /tasks
        // -> vào router được gắn với đường dẫn đó ->  bên trong router khớp route DELETE /:id -> gọi controller...

        // - Trong trường hợp không truyền vào đường dẫn là tham số 1 thì middleware/router sẽ được áp dụng cho mọi req vào 
        // vd : 

        app.use(express.json()); // áp dụng cho mọi req 

    // 3. module.exports và require()

        // - module.exports : Là một đối tượng đặc biệt trong node.js (chuẩn commonJs) dùng để xuất dữ liệu , hàm , obj...
        // từ 1 file , để file khác có thể require() các dữ liệu đó vào 

            // - Bạn có thể gắn bất kỳ giá trị nào cho module.exports : giá trị bất kì , hàm ...

            module.exports = {getAll , getById , remove} ; // xuất 1 obj chứa danh sách địa chỉ các hàm 

            module.exports = function () {} // xuất trực tiếp 1 hàm 

            // -> Khi bạn gán giá trị nào = module.exports thì ở file khác require() sẽ nhận đúng giá trị đó 

        // - require() : Là một hàm dùng để import module , node.js đọc file được chỉ định , thực thi code trong đó và 
        // trả về các giá trị được gán vào module.exports của file đó 

            const app1 =  require('./app1') // -> lúc này các giá trị được gán vào đối tượng trong module.exports thì 
            // sẽ bằng app1 chứa các giá trị đó


// Review ngày 3 (tiếp) : 

    // - Xây dựng lại về cấu trúc các folder về dự án backend : 
        // + file chính gốc app.js : tạo và khởi động server , gắn middleware , gắn router 
        // + Việc định nghĩa router tạo thành 4 tầng -> chia thành 4 folder khác nhau
            // - Tầng đầu routes : Tạo router gán các route và middleware vào router , định nghĩa các route gồm đường dẫn và method sau đó hàm hanlder thì gọi controllers
            // - Tầng tiếp controllers : nhận các thông tin req , gửi thông tin cho services , đợi thông tin trả về , hoàn thành res , kết thúc req
            // - Tầng tiếp sevices : Dựa vào thông tin nhận được , kiểm tra thông tin , thực hiện các logic nghiệp vụ , gọi models theo yêu cầu
            // - Tầng cuối models : Thực hiện thao tác trực tiếp với database (thêm , sửa , xóa...) , xây dựng databse , trả về dữ liệu theo yêu cầu sevices
            
    // - Chi tiết từng thao tác : 
        // + tạo server : 
        const express = require('express');
        const app = express(); // đối tượng app đại diện cho web server tạo bằng express

        // + gắn middleware và router :

        app.use(express.json()) 
        // -> hàm use giúp gắn middeware/router vào server , có 2 tham số không bắt buộc của hàm use , tham số 1 là đường dẫn
        // tham số 2 là middleware/router , nếu chỉ thêm 1 tham số là middleware/router sẽ được hiểu là áp dụng cho mọi request tới server
        // nếu có url là tham số trước thì chỉ áp dụng request có url đường dẫn bắt đầu bằng url được thêm vào
        app.use('/tasks' , routerTask);

        // + lắng nghe khởi động server sau khi gắn tất cả middleware và router hoàn tất : 

        const PORT = 3000;
        app.listen(PORT , () => {
            console.log(`server đang chạy tại http://localhost:${PORT}`)
        })

        // + Định nghĩa router : 
            // - router là gì : là 1 ứng dụng nhỏ được cung cấp bởi express thông qua hàm Router() , cho phép người dùng gắn
            // middleware và route vào ứng dụng này nhưng không thể lắng nghe nhằm tạo ra server 
            // -> router giúp nhóm lại các route có đặc điểm chung lại thành 1 nhóm giúp dễ kiểm soát và debug , các điểm 
            // chung như : chung tiền tố url , chung middleware...
            
        const routerTask = express.Router(); // tạo router
        routerTask.get('/:id' , getById); // định nghĩa route trong router 
        routerTask.post('/', create);
        routerTask.patch('/:id' , updateById);
        routerTask.delete('/:id' , removeById);

        // + Một vài lưu ý khi xuất/nhập file : 
            // - Khi chia ra thành cách folder khác nhau việc xuất/nhập file là điều quan trọng sử dụng commonJS
            // xuất bằng module.exports và nhập bằng require()
            
            // - module.exports : xuất bất kì giá trị nào được gán vào module.exports 
            module.exports = {update , create} // xuất đối tượng các hàm cho phép các file khác nhập dữ liệu

            // - require(url) : hàm cho phép nhập giá trị vào 1 biến mang giá trị mà file khác đã xuất ra
            const objTask = require('./abc.js'); // nhập giá trị đã xuất của file abc.js

        