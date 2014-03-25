'use strict';

// Sugarkick
var sugarkick = sugarkick || {};
    sugarkick.$$config = sugarkick.$$config || {};
    sugarkick.$views = sugarkick.$views || {};
    sugarkick.$controllers = sugarkick.$controllers || {};
    sugarkick.routes = sugarkick.routes || {};

// load
sugarkick.load = function () {
    // TODO: handle models.
    sugarkick.$$config.appView = document.getElementById('sugar-view');
    sugarkick.router();
    window.addEventListener('hashchange', sugarkick.router);
    return sugarkick;
};

// router
sugarkick.router = function () {

    // get the hashbang, strip the bang and forward slashes
    var hashbang = window.location.hash.replace('#!','').replace(/\//g,'_');

    //TODO: match the hash with a route
    if(hashbang && sugarkick.$views[hashbang]){
        console.log(sugarkick.$views[hashbang]);

        //TODO: handle templates better.
        document.getElementById('sugar-view').innerHTML = sugarkick.$views[hashbang].template;

        sugarkick.$controllers[sugarkick.$views[hashbang].controller]();
    } else {
        console.log('Hashbang does not match route');
    }
    return sugarkick;
}


sugarkick.when = function (route, viewObject) {
    sugarkick.$views[route.replace(/\//g,'_')] = {
        route: route,
        controller: viewObject.controller,
        template: viewObject.template
    }

    return sugarkick.$$config[this.$$appView]
}

sugarkick.controller = function (controllerName, controllerFunction) {
    sugarkick.$controllers[controllerName] = controllerFunction;
}

sugarkick.module = function (appView) {
    sugarkick.$$config[appView] = {
        template: false,
        when: sugarkick.when,
        $$appView: appView
    }

    return sugarkick.$$config[appView];
}

window.addEventListener('load', sugarkick.load);