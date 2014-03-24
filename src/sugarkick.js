'use strict';

// Sugarkick
var sugarkick = sugarkick || {};
    sugarkick.partials = {};
    sugarkick.routes = {};

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

sugarkick.router = function () {}