const newRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // định nghĩa routes '/'
    // app.get('/', (request, response) => {
    //     response.render('home');
    // });

    // app.get('/news', (request, response) => {
    //     console.log(request.query.q);
    //     response.render('news');
    // });

    // app.get('/search', (request, response) => {
    //     // query parameters - ví dụ như: http://localhost:3000/search?q=an1&ref=game&author=gamelof
    //     // console.log(request.query.q); // => lấy được an1

    //     response.render('search');
    // });

    // app.post('/search', (request, response) => {
    //     console.log(request.body);
    //     response.render('search');
    // });

    app.use('/news', newRouter);

    app.use('/', siteRouter);
}

module.exports = route;
