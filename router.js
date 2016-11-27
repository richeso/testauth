var Authentication = require('./utilities/Authentication');

// Routes
module.exports = function(app){ 
    // index.html
    app.get('/', function(request, response){
        response.render('index', {});
    }); 
    // API
    var artists = [
        { id: 1, name: 'Notorious BIG', birthday: 'May 21, 1972', hometown: 'Brooklyn, NY', favoriteColor: 'green' },
        { id: 2, name: 'Mike Jones', birthday: 'January 6, 1981', hometown: 'Houston, TX', favoriteColor: 'blue' },
        { id: 3, name: 'Taylor Swift', birthday: 'December 13, 1989', hometown: 'Reading, PA', favoriteColor: 'red' }
    ];

    // GET /api/artists
    app.get('/api/artists', function(request, response){
        response.json(artists);
    });


    // GET /api/artist/:id
    app.get('/api/artist/:id', Authentication.SetRealm('artist'), Authentication.BasicAuthentication, function(request, response){
        var id = request.params.id;
        var obj = artists[id - 1]; 
        response.json(obj);
    });

    app.get('/api/other', Authentication.SetRealm('other'), Authentication.BasicAuthentication, function(request, response){
        response.json({ message: 'This is the other route '});
    });

};