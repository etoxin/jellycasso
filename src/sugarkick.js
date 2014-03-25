'use strict';

// Sugarkick
var sugarkick = sugarkick || {};
    sugarkick.partials = sugarkick.partials || {};
    sugarkick.routes = sugarkick.routes || {};
    sugarkick.config = sugarkick.config || {};

// load
sugarkick.load = function () {
    sugarkick.config.appView = document.getElementById('sugar-view');
    sugarkick.router();
    window.addEventListener('hashchange', sugarkick.router);
};

// router
sugarkick.route = function (location, template, controller) {
    sugarkick.routes[location] = {
        template: template,
        controller: controller
    }
}

// add templates
sugarkick.template = function (name, template) {
    // TODO: need to map this to the routes
    sugarkick.partials[name] = template;
};

sugarkick.router = function () {

    //TODO: get the hashbang, strip the bang
    var hashbang = window.location.hash.replace('#!','');

    //TODO: match the hash with a route
    if(hashbang && sugarkick.routes[hashbang]){
        console.log('we have a matching route');
        //TODO: render a template

        sugarkick.config.appView.innerHTML = sugarkick.partials[hashbang+'Template']
    } else {
        console.log('Hashbang does not match route');
    }
}
window.addEventListener('load', sugarkick.load);