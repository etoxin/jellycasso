sugarkick
==========
#### A super small javascript router

the markup is pretty simple. Below is the syntax which is almost identical to AngularJS. 

Define the module with `sugarkick.module()` then use the `.when()` function to define a url, controller and template location.

    sugarkick.module()
        .when('/mypage', {
            controller: 'mycontroller',
            template: '/partials/mypage.html'
        });

define controllers using `sugarkick.controller()`. Be sure the controller name matches the one defined in the route.

    sugarkick.controller('mycontroller', function() {
        // code here.
    });

place a `<div>` with the `sugar-view` id into your page. This is where the templates will render
    
    <div id="sugar-view"></div>

navigate to the url with a hasbang. eg http://www.example.com/#!/mypage
