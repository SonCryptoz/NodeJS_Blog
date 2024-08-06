const path = require('path');

const express = require('express');
  const morgan = require('morgan');

// Sử dụng destructuring để chỉ lấy thuộc tính 'engine' trong object
               const { engine } = require('express-handlebars');

    const app = express();
const port = 3000;

    const route = require('./routes');

// đi tới thư mục public chứa các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// xử lý form submit POST để lấy dữ liệu
app.use(
                    express.urlencoded({
        extended: true,
    }),
);
                    app.use(express.json());

// morgan(HTTP logger)
// app.use(morgan('combined'));

// template engine
app.engine(
        'hbs',
    engine({
               extname: '.hbs', // định dạng file cho template đang sử dụng
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

// 127.0.0.1 - localhost
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
