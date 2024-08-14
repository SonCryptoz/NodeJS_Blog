const path = require('path');

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Sử dụng destructuring để chỉ lấy thuộc tính 'engine' trong object
const { engine } = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/SortMiddleware.js');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// connect to database
db.connect();

// đi tới thư mục public chứa các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// xử lý form submit POST để lấy dữ liệu
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom Middleware
app.use(SortMiddleware);

// morgan(HTTP logger)
// app.use(morgan('combined'));

// template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs', // định dạng file cho template đang sử dụng
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type: 'default';
                const icons = {
                    default: 'fa-solid fa-up-down',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }
                const icon = icons[sortType];
                const type = types[sortType];
                return `
                    <a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i>
                    </a>
                `;
            }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// 127.0.0.1 - localhost
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
