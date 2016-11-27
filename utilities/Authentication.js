var basicAuth = require('basic-auth');

exports.BasicAuthentication = function(request, response, next) {

    function unauthorized(request,response) {
    	
        response.set('WWW-Authenticate', 'Basic realm=' + request.authRealm);
        return response.send(401);
    };

    console.log("authrealm cookie:" +request.cookies['authrealm']);
    
    var user = basicAuth(request);

    if (!user || !user.name || !user.pass) {
        return unauthorized(request,response);
    };

    if (user.name === 'foo' && user.pass === 'bar') {
        return next();
    } else {
        return unauthorized(request,response);
    };
	
};

exports.SetRealm = function(realm,request,response) {
    return function(request, response, next) {
    	var realmval = realm || 'default';	
        request.authRealm = realmval;	
      //response.clearCookie('authrealm');
        console.log("in setRealm.. setting authrealm to:"+realmval);
        response.cookie('authrealm', realmval, { maxAge: 900000, httpOnly: true });
        return next();
    }
};  