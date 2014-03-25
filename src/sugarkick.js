'use strict';

// Sugarkick
var sugarkick = sugarkick || {};
    sugarkick.$$config = sugarkick.$$config || {};
    sugarkick.$views = sugarkick.$views || {};
    sugarkick.routes = sugarkick.routes || {};

// load
sugarkick.load = function () {
    // TODO: handle models.
    sugarkick.$$config.appView = document.getElementById('sugar-view');
    sugarkick.router();
    window.addEventListener('hashchange', sugarkick.router);
    return sugarkick;
};

sugarkick.router = function () {

    //TODO: get the hashbang, strip the bang and forward slashes
    var hashbang = window.location.hash.replace('#!','').replace(/\//g,'_');

    //TODO: match the hash with a route
    if(hashbang && sugarkick.$views[hashbang]){
        console.log(sugarkick.$views[hashbang]);

        //TODO: handle templates better.
        document.getElementById('sugar-view').innerHTML = sugarkick.$views[hashbang].template;

        //TODO: add controller
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

sugarkick.module = function (appView) {
    sugarkick.$$config[appView] = {
        template: false,
        when: sugarkick.when,
        $$appView: appView
    }

    return sugarkick.$$config[appView];
}

window.addEventListener('load', sugarkick.load);