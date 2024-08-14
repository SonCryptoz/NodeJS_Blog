module.exports = function sortMiddleware(request, response, next){

    response.locals._sort = {
        enabled: false,
        column: '',
        type: 'default',
    };

    if(request.query.hasOwnProperty('_sort')){
        // response.locals._sort.enabled = true;
        // response.locals._sort.column = request.query.column;
        // response.locals._sort.type = request.query.type;

        // or use
        Object.assign(response.locals._sort, {
            enabled: true,
            column: request.query.column,
            type: request.query.type,
        });
    }

    next();
}