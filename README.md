# Intro to AngularJS

### *A crash course to help you understand basic, pre-1.4v AngularJS concepts.*

For our development, we will be primarily using AngularJS. It is a very powerful front-end framework with many features included. This guide will cover the basics of AngularJS to help you get started on developing dynamic web applications from a static HTML page. The point of this guide is to help you understand the underlying concept of AngularJS. For that reason, I will be showing you techniques that demonstrate AngularJS concepts but are not the best practices for developing enterprise-level applications.

---
# Table of Contents
1. [Intro to AngularJS](#what-is-angularjs)
    1. [How it Works](#how-angularjs-works)
    1. [What it Does](#what-angularjs-does)
1. [Getting Started](#initial-setup)
    1. [Module](#module)
    1. [Directives](#directives)
    1. [Controllers](#controllers)
    1. [Dependency Injection](#dependency-injection)
1. [Building with AngularJS](#making-a-grocery-list)
1. [Scope](#scopes)
    1. [The $scope Service](#the-scope-service)
    1. [How it works](#how-scope-variables-work)
1. [Data Binding](#data-binding)
    1. [ng-bind](#ng-bind)
    1. [Expressions](#expressions)
    1. [ng-model](#ng-model)

---
# What is AngularJS?

AngularJS is a frontend framework that helps us build more dynamic webpages without having to type too much of our own JavaScript.

***If you already have a basic understanding of AngularJS and what it does, then [skip this section.](#initial-setup)***

### How AngularJS works

AngularJS manipulates our webpages via the **Model View Whatever (MVW)*** architectural approach.

  - **The model** is the data we want to display.
    - (I.e., the JSON, JavaScript object, or constant variables that  contain the data)
  - **The view** is the HTML we render on the browser.
    - (I.e., the HTML file that we load in the browser)
  - **The whatever** (commonly called a ***controller***) is the logic we will write to connect the **view** with the **model**.
    - (I.e., the JavaScript file with all our logic and AngularJS code)

Having this separation of concerns makes our code more manageable and our web applications faster. We use AngularJS as the ***whatever*** because monitors user actions/events within our ***view*** and changes in our ***model*** to provide the appropriate responses.

This was a very simple summary of what the MVC/MVVM/MVW architecture. If you would like to read up more about it, [here is a nice article on the topic.](https://alexatnet.com/model-view-controller-mvc-in-javascript/)


### What AngularJS does

AngularJS does many things under the hood that we cannot see nor fully grasp unless we are weathered Google Engineers. However, at the basic level, AngularJS involves creating **scopes** and attaching them to our HTML elements via **data binding**. The HTML elements can then become more dynamic, displaying different data values and performing a variety of functions we attach to them. Think of AngularJS as steroids for your HTML.

AngularJS can even create custom HTML elements called ***components*** but that is outside the ***scope*** of this guide. I italicize the word ***scope*** for important reasons which you will find out later in this guide.

**[Back to top](#table-of-contents)**

---
# Initial Setup
---
>Now that you have a basic understanding of what AngularJS is, let's create a simple application with it! I have made all the files for the final application available in the ***app*** directory. I suggest you view the ***index.html*** and ***app.js*** files in this directory as you follow along with this guide to get a better understanding of all the concepts I am covering. Let's get started!
---

AngularJS is a framework, so we need to load it with our HTML before we can use it. I like to just use the CDN that is provided by AngularJS straight from their site:

---
> https://code.angularjs.org/1.6.7/angular.min.js
---

The ***view*** of our application will be the **/app/index.html** file in this repository. Your HTML's head section should look like this if you are referencing AngularJS from the CDN:


**index.html:**
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>AngularJS Tutorial</title>
    <script src="https://code.angularjs.org/1.6.7/angular.min.js"></script>
  </head>
...
```

The ***whatever/controller*** for this app will be the **/app/app.js**. This will contain all the logic of our application that we will write using the AngularJS framework. Be sure to link to this **app.js** file within the HTML like so:

**index.html:**
```
...
  <head>
    <meta charset="utf-8">
    <title>AngularJS Tutorial</title>
    <script src="https://code.angularjs.org/1.6.7/angular.min.js"></script>
    <script src="app.js"></script>
  </head>
...
```


### Module

Every AngularJS app requires setting up a centralized **module**. Think of a module as the primary container for all the smaller, lower-level AngularJS objects that are attached to the module. These objects are called ***recipes*** (*controllers, config, filters, components, etc.*).

This line initializes our app, setting up the module so we can use all the methods that come with the AngularJS framework inside our JavaScript file to manipulate our HTML file:

**app.js:**
```
const myFirstApp = angular.module('appName', []);
```

**One thing to note:** The square brackets **[ ]** inside ***angular.module()*** is left empty for now, but it will be used for dependency injection. I'll cover more on this later when we go over [dependency injection](#dependency-injection).

Next up, we need to attach the module to the HTML to link it with AngularJS. We will use the name of the module, ***appName*** that we created in the app.js file.

**index.html:**
```
<!DOCTYPE html>
  <html ng-app="appName">
...
```

I like to attach the module in the <html> tag, but you can do it in the <body> tag or a top-level <div> container as well. Be aware that AngularJS will only see and run our controller code on the child elements that go ***inside*** of whichever element we pass the module name into.

I passed the module **appName** to my <html> element using the **ng-app** [directive.](#directives)


### Directives

At the most basic level, **directives** are customized AngularJS markers that are attached to HTML elements as attributes (similar to how we attach ***id, class, href, src,*** etc. to element tags). We use these directives to tell AngularJS to bind things/features to HTML elements such as data, event listeners, callbacks, conditionals, etc.

There are many directives that come standard with the AngularJS framework. AngularJS has great documentation with a [list of all the built-in directives.](https://docs.angularjs.org/api/ng/directive)

**Example**
```
<div ng-if="i === foo">
  <input ng-model="foo">
  <button ng-click="fooFunction()"></button>
</div>
```


### Controllers

This is where the MVC/MVW concept comes together and we can truly see how AngularJS is an MVC framework. **Controllers** are an AngularJS object in which we put our JavaScript code provide our app with a ***controller*** that manipulates our DOM's ***view*** and connects our data ***model***. I advise that you separate the code for the model, view and controller in different files to achieve separation of concerns. However, for the sake of simplicity, I will use a plain JavaScript array inside the controller as the model for the sample application we will be building.

We create a controller in our app by placing it inside the containing module that we created earlier:

**app.js:**
```
const myFirstApp = angular.module('appName', []);


myFirstApp.controller('groceryList', function() {

  // Your controller code will go in here!

});
```

Then we attach the controller inside the HTML using the **ng-controller** directive. **When attaching the ng-controller directive to your HTML, make sure you pass it into an element that is at the same level or (preferably) below the element that we attach the ng-app module directive to or our controller will not be registered**:


**index.html:**
```
<!DOCTYPE html>
<html ng-app="appName">
  <head>...</head>

  <body ng-controller="groceryList"></body>
</html>
```

I did it on the <body> tag which is ***inside*** of my <html> tag that I attached the module directive to.


### Dependency Injection

AngularJS is a framework, and frameworks are usually very rich with services and features. To streamline and improve the performance of our application, AngularJS tucks away all its built-in services or *dependencies* until we call them inside our application's code using **dependency injection.**

There are two slots in an AngularJS application through which we can inject dependencies:
  1. Through the top-level ***module***
  2. Through the lower-level AngularJS *recipes* inside the module such as ***controllers, factories, directives, filters, etc.***


#### 1. Injecting Through the Module:
Dependency injection at the module level is necessary when we are including external libraries and packages inside our AngularJS application. These libraries and packages are not part of the AngularJS framework so they need to be plugged in through the *angular.module* object in order to make them globally available to the rest of the AngularJS objects.

**Example:** A popular library that is often used to route AngularJS is called UI-Router. We will not be using this library for our application; rather, I am including this as demonstration of how we would pass an external library to an AngularJS app.

**index.html**
```
<!-- First, we have to link up the UI-Router files/CDN to our HTML -->

<!DOCTYPE html>
<html ng-app="appName">
  <head>
    <meta charset="utf-8">
    <title>AngularJS Tutorial</title>

    <!-- AngularJS CDN -->
    <script src="https://code.angularjs.org/1.6.7/angular.min.js"></script>

    <!-- UI-Router CDN -->
    <script src="//unpkg.com/@uirouter/angularjs@1.0.7/release/angular-ui-router.min.js"></script>

    <!-- Controller JS -->
    <script src="app.js"></script>
  </head>
```

**app.js**
```
// Then we pass it into the module within this Controller JS file

const myFirstApp = angular.module('appName', ['ui.router']);
```

Once we do that, the rest of the Controller JS can now utilize all the features and methods of AngularJS *and* UI-Router!


#### 2. Injecting Through Lower-Level Recipes:
Dependency injection at lower levels is more common with AngularJS applications and occurs when we are simply trying to call the services/dependencies that come built into the AngularJS framework. We will be using the **$scope** service for building our app. Below, you can see how the **$scope** service gets injected in the controller of our application. In a later section, I will cover more details on [**$scope**.](#scopes)

**app.js**
```
myFirstApp.controller('groceryList', ['$scope', function($scope) {

  // Your controller code will go in here!

}]);
```

**That pretty much covers all the barebones basics that we need to know to build a simple AngularJS application. Of course, there will be more lower-level concepts to cover once we build out the application.**

**[Back to top](#table-of-contents)**

---
# Making a Grocery List

I have attached a css file, **/app/styles.css**, which contains all the styles for the app. You can download it from this repo and link it to your HTML to save you some time while you follow along.

At this point, you should clone this repository or download it onto your computer. The final app is inside the ***~/app*** directory. Open the ***index.html*** file in your browser to see how the application works.

Next, look over the ***app.js*** file line by line and reference the ***index.html*** to see how the the JavaScript file **controls** the **view** in the HTML file and how the input in the HTML file communicates with the **controller** to modify our **model**, the array inside our controller.

It's okay if you do not get everything at first. I will be going over the code and covering the underlying AngularJS in the following sections.

**[Back to top](#table-of-contents)**

---
# Scopes

In AngularJS, a **scope** is what binds our HTML (the view) and our JavaScript code (the controller). It is a service that is used to declare special types of variables we declare in the controller of our JS that can communicate with the DOM in our HTML. Scope is the bread and butter of AngularJS--specifically, of versions prior to 1.4. AngularJS primarily involves declaring scope variables in the controller and binding these variables to elements in the HTML.


### The $scope Service

We use the service **$scope** in front of any variable name of our choice to declare scope variables in AngularJS. They function very much like a plain JavaScript variable in that you can attach different values and  to them.

**Primitive Data Types**
```
$scope.string = "foo";
$scope.int = 1234;
$scope.boolean = true;
$scope.blank = '';
$scope.nothing = null;
$scope.nothingYet = undefined;

// etc.
```

**Arrays**
```
$scope.arr = [1, 2, 3, "hello"];

console.log($scope.arr[0]) // 1
console.log($scope.arr[3]) // "hello"

$scope.arr.push("bye"); // [1, 2, 3, "hello", "bye"];
```

**Objects**
```
$scope.obj = {name: "foo", age: 2, gender: "male"};

console.log($scope.obj.name) // "foo"
console.log($scope.obj.age) // 2
```

**Function Declarations**
```
$scope.greetings = function(name) {
  console.log("Hello, " + name + "!");
};

$scope.greetings("foo"); // "Hello, foo!"
```

Go ahead and take a look at all the scope variables declared in the ***app.js*** file of our application and see if you can distinguish their types.

**Our Model is an Array**
```
// Our model has a few default values in it at the start of the application
$scope.groceryList = ["Granny Smith Apples", "Naval Oranges", "Dole Hawaiian Gold Pineapple"];
```

**Strings**
```
$scope.title = "Iris's Grocery List";
$scope.notice = "fa fa-shopping-cart";
```

**Functions**
```
// This function pushes new items to the our model's array
$scope.addItem = function(newItem) {
  if (newItem) {
      $scope.groceryList.push(newItem);
  }
  $scope.groceryItem = null;
};

// This function removes specific items from our model's array
$scope.removeItem = function(item) {
  for (index in $scope.groceryList) {
    if ($scope.groceryList[index] === item) {
      $scope.groceryList.splice(index, 1);
    }
  }
};
```


### How Scope Variables Work

Scope variables can be directly attached to the DOM without having to write extra JavaScript thanks to the help of AngularJS directives and data binding.

More importantly however, scope variables are ***only valid inside the controller*** which they are declared. Thus, whichever HTML element you choose to attach a controller to, only the child elements of that element have access to the scope variables declared in the controller.

**Example**
```
<body ng-app="sampleApp">

  <div ng-controller="controller1">
    <p> {{ ctrlOneGreeting }} </p>  <!-- "Hello from controller 1!" -->
    <p> {{ ctrlTwoGreeting }} </p>  <!-- Nothing shown -->

    <p> {{ byeBye }} </p>  <!-- "Controller 1 says bye!" - (No collision) -->
  </div>

  <div ng-controller="controller2">
    <p> {{ ctrlOneGreeting }} </p> // Nothing shown
    <p> {{ ctrlTwoGreeting }} </p> // "Hello from controller 2!"

    <p> {{ byeBye }} </p>  <!-- "Controller 2 says bye!" (No collision) -->
  </div>


  <script>
    const sample = angular.module('sampleApp', []);

    sample.controller('controller1', ['$scope', function($scope) {
      $scope.ctrlOneGreeting = "Hello from controller 1!";
      $scope.byeBye = "Controller 1 says bye!";  
    }]);

    sample.controller('controller2', ['$scope', function($scope) {
      $scope.ctrlTwoGreeting = "Hello from controller 2!";
      $scope.byeBye = "Controller 2 says bye!";
    }]);
  </script>

</body>
```

In the example above, note how the ***controller1*** and ***controller2*** don't have access to each other's scope variables. Also, because the scope variables are isolated inside their controllers, they can have the same name, ***$scope.byeBye*** without any *name-space-collision* because they have their own spaces in their respective controllers.

Also, you might have noticed how I used the double curly braces **{{ }}** inside my HTML to display my scope variables. This is called an **expression**, which is one way to bind scope variables that I will cover in more detail in the [next-section.](#data-binding)

**[Back to top](#table-of-contents)**

---
# Data Binding

In the previous section, we covered how to declare scope variables. I mentioned that scope variables are more versatile than JavaScript variables in that they can be attached to the DOM with minimal code. The process of attaching these scope variables to HTML elements is called **data binding**.

AngularJS implements data binding to refresh the HTML (View) with any changes in our data (our Model and any scope variables in the controller) and update the data with any user actions performed in the HTML.  This  AngularJS is constantly monitoring all the scope variables and the elements that we bind the scope variables to. Any changes to one will be reflected onto the other depending on how we bind them.

AngularJS has a few methods of data binding that I am going to cover: [**ng-bind**](#ng-bind), [**expressions**](#expressions), and [**ng-model**](#ng-model)


### ng-bind

### {{expressions}}

### ng-model


**[Back to top](#table-of-contents)**

---
