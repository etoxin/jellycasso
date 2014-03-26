'use strict';

// Sugarkick
var sugarkick = sugarkick || {};
    sugarkick.$$config = sugarkick.$$config || {};
    sugarkick.$views = sugarkick.$views || {};
    sugarkick.$controllers = sugarkick.$controllers || {};
    sugarkick.routes = sugarkick.routes || {};
var request;

// load function
sugarkick.load = function () {
    sugarkick.$$config.appView = document.getElementById('sugar-view');
    window.addEventListener('hashchange', sugarkick.router);

    return sugarkick;
};

// Partial loader
sugarkick.$$config.load = function (url, view) {
    var templateToReturn = 'no template.';
    request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400){
            // Success!
            sugarkick.$views[view].template = this.responseText;
            sugarkick.router();
        } else {
            // We reached our target server, but it returned an error
            console.error('Partial Load Error.');
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.error('request error.');
    };

    request.send();
    return request.responseText;
}

// router function
sugarkick.router = function () {
    // get the hashbang, strip the bang and forward slashes
    var hashbang = window.location.hash.replace('#!','').replace(/\//g,'_');

    // match the route with hash.
    if(hashbang && sugarkick.$views[hashbang]){

        // the view container.
        document.getElementById('sugar-view').innerHTML = sugarkick.$views[hashbang].template;

        // fire the controller
        sugarkick.$controllers[sugarkick.$views[hashbang].controller]();
    } else {
        console.log('Hashbang does not match route');
    }

    return sugarkick;
}

// .when function chains from sugarkick
sugarkick.when = function (route, viewObject) {
    sugarkick.$views[route.replace(/\//g,'_')] = {
        route: route,
        controller: viewObject.controller,
        template: 'loading...'
    }

    sugarkick.$$config.load(viewObject.template, route.replace(/\//g,'_'))

    return sugarkick.$$config[this.$$appView]
}

// .controller function
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