class NewsController {
    // [GET] /news
    index(request, response) {
        response.render('news');
    }

    // [GET] /news/football
    show(request, response) {
        response.send('News about football');
    }
}

module.exports = new NewsController();
