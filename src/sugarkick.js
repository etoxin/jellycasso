'use strict';

// Sugarkick
var sugarkick = sugarkick || {};
    sugarkick.partials = sugarkick.partials || {};
    sugarkick.routes = sugarkick.routes || {};

// router
sugarkick.route = function (location, template, controller) {
    sugarkick.routes[location] = {
        template: template,
        controller: controller
    }
}

// add templates
sugarkick.template = function (name, template) {
    sugarkick.partials[name] = template;
};

sugarkick.router = function () {

    //TODO: see if an app is defined in the dom

    var view = document.getElementById('sugar-view');

    //TODO: get the hashbang, strip the bang
    var hashbang = window.location.hash.replace('#!','');

    //TODO: match the hash with a route
    if(hashbang && sugarkick.routes[hashbang]){
        console.log('we have a matching route');
        //TODO: render a template

        view.innerHTML = sugarkick.partials[hashbang+'Template']
    } else {
        console.log('Hashbang does not match route');
    }
}
window.addEventListener('hashchange', sugarkick.router);
window.addEventListener('load', sugarkick.router);