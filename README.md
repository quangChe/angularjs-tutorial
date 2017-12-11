# Intro to AngularJS

### *A crash course to help you understand basic, pre-1.4v AngularJS concepts.*

For our development, we will be primarily using AngularJS. It is a very powerful front-end framework with many features included. This guide will cover the basics of AngularJS to help you get started on developing dynamic web applications from a static HTML page. The point of this guide is to help you understand the underlying concept of AngularJS. For that reason, I will be showing you techniques that demonstrate AngularJS concepts but are not the best practices for developing enterprise-level applications.

---
# Table of Contents
1. [Intro to AngularJS](#what-is-angularjs)
    1. [How it Works](#how-angularjs-works)
    1. [What it Does](#what-angularjs-does)
1. [Getting Started](#before-we-get-started)
    1. [Module](#module)
    1. [Directives](#directives)
    1. [Controllers](#controllers)
    1. [Dependency Injection](#dependency-injection)
    1. [Building the Starter Application](#making-a-grocery-list)
1. [Scope](#scopes)
    1. [The $scope Service](#the-scope-service)
    1. [How it works](#how-scope-variables-work)
1. [Data Binding](#data-binding)
    1. [ngBind](#ngbind)
    1. [Expressions](#expressions)
    1. [ngBind vs expressions](#ngbind-vs-expressions)
    1. [ngModel](#ngmodel)
1. [Other Useful Directives](#commonly-used-directives)
    1. [ngClick](#ngclick)
    1. [ngRepeat](#ngrepeat)
    1. [ngIf](#ngif)
1. [Conclusion](#conclusion)

---
# What is AngularJS?

AngularJS is a frontend framework that helps us build more dynamic webpages without having to type too much of our own JavaScript.

***If you already have a basic understanding of AngularJS and what it does, then [skip this section.](#initial-setup)***

### How AngularJS works

![Diagram of an MVW](https://developer.chrome.com/static/images/mvc.png)

AngularJS manipulates our webpages via the **Model View Controller/Model View Viewmodel/Model View Whatever (MVC, MVVW, MVW)*** architectural approach. These different names may have slight differences, but overall they highlight the concept of **separation of concern** between the 3 structures of an application: the **model**, **view** and **controller**

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

**[(Back to top)](#table-of-contents)**

---
# Before We Get Started

>Now that you have a basic understanding of what AngularJS is, let's create a simple application with it! I have made all the files for the final application available in the ***app*** directory. I suggest you view the ***index.html*** and ***app.js*** files in this directory as you follow along with this guide to get a better understanding of all the concepts I am covering. Let's get started!

AngularJS is a framework, so we need to load it with our HTML before we can use it. I like to just use the CDN that is provided by AngularJS straight from their site:

---
> https://code.angularjs.org/1.6.7/angular.min.js
---

The ***view*** of our application will be the **/app/index.html** file in this repository. Your HTML's head section should look like this if you are referencing AngularJS from the CDN:


*index.html:*
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

The ***whatever/controller*** for this starter app will be the **/app/app.js**. This will contain all the logic of our application that we will write using the AngularJS framework. Be sure to link to this **app.js** file within the HTML like so:

*index.html:*
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

This line initializes our starter app, setting up the module so we can use all the methods that come with the AngularJS framework inside our JavaScript file to manipulate our HTML file:

*app.js:*
```
const myFirstApp = angular.module('starterApp', []);
```

**One thing to note:** The square brackets **[ ]** inside ***angular.module()*** is left empty for now, but it will be used for dependency injection. I'll cover more on this later when we go over [dependency injection](#dependency-injection).

Next up, we need to attach the module to the HTML to link it with AngularJS. We will use the name of the module, ***starterApp*** that we created in the app.js file.

*index.html:*
```
<!DOCTYPE html>
  <html ng-app="starterApp">
...
```

I like to attach the module in the html tag, but you can do it in the body tag or a top-level div container as well. Be aware that AngularJS will only see and run our controller code on the child elements that go ***inside*** of whichever element we pass the module name into.

I passed the module **starterApp** to my html element using the **ngApp** [directive.](#directives)


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

This is where the MVC/MVW concept comes together and we can truly see how AngularJS is an MVC framework. **Controllers** are an AngularJS object in which we put our JavaScript code provide our app with a ***controller*** that manipulates our DOM's ***view*** and connects our data ***model***. I advise that you separate the code for the model, view and controller in different files to achieve separation of concerns. However, for the sake of simplicity, I will use a plain JavaScript array inside the controller as the model for the starter application we will be building.

We create a controller in the starter app by placing it inside the containing module that we created earlier:

*app.js:*
```
const myFirstApp = angular.module('starterApp', []);


myFirstApp.controller('groceryList', function() {

  // Your controller code will go in here!

});
```

Then we attach the controller inside the HTML using the **ngController** directive. **When attaching the ngController directive to your HTML, make sure you pass it into an element that is at the same level or (preferably) below the element that we attach the ngApp module directive to or our controller will not be registered**:


*index.html:*
```
<!DOCTYPE html>
<html ng-app="starterApp">
  <head>...</head>

  <body ng-controller="groceryList"></body>
</html>
```

I did it on the body tag which is ***inside*** of my html tag that I attached the module directive to.


### Dependency Injection

AngularJS is a framework, and frameworks are usually very rich with services and features. To streamline and improve the performance of our applications, AngularJS tucks away all its built-in services or *dependencies* until we call them inside our applications' code using **dependency injection.**

There are a few places in the AngularJS code through which we can inject dependencies:
  1. Through the top-level ***module***
  2. Through the lower-level AngularJS *recipes* inside the module such as ***controllers, factories, directives, filters, etc.***


#### 1. Injecting Through the Module:
Dependency injection at the module level is necessary when we are including external libraries and packages inside our AngularJS applications. These libraries and packages are not part of the AngularJS framework so they need to be plugged in through the *angular.module* object in order to make them globally available to the rest of the AngularJS objects.

**Example:** A popular library that is often used to route AngularJS is called UI-Router. We will not be using this library for our starter app; rather, I am including this as demonstration of how we would pass an external library to an AngularJS app.

*index.html*
```
<!-- First, we have to link up the UI-Router files/CDN to our HTML -->

<!DOCTYPE html>
<html ng-app="starterApp">
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

*app.js*
```
==========================================================
We pass it into the module within this Controller JS file:
==========================================================

const myFirstApp = angular.module('starterApp', ['ui.router']);
```

Once we do that, the rest of the Controller JS can now utilize all the features and methods of AngularJS *and* UI-Router!


#### 2. Injecting Through Lower-Level Recipes:
Dependency injection at lower levels is more common with AngularJS applications and occurs when we are simply trying to call the services/dependencies that come built into the AngularJS framework. We will be using the **$scope** service for building our starter app. Below, you can see how the **$scope** service gets injected in the controller of our app. In a later section, I will cover more details on [**$scope**.](#scopes)

*app.js*
```
myFirstApp.controller('groceryList', ['$scope', function($scope) {

  // Your controller code will go in here!

}]);
```

>That pretty much covers all the barebones basics that we need to know to build an AngularJS starter app. Of course, there will be more lower-level concepts to cover once we build out the application.

### Making a Grocery List

![Starter application screenshot](/app/imgs/thumbnail.png)

At this point, you should already have cloned this repository or downloaded the zip onto your computer. The final version of the starter app is inside the ***~/app*** directory. Open the ***index.html*** file in your browser to see how the application works.

Next, look over the ***app.js*** file line by line and reference the ***index.html*** to see how the the JavaScript file **controls** the **view** in the HTML file and how the input in the HTML file communicates with the **controller** to modify our **model**, the array inside our controller.

It's okay if you do not get everything at first. I will be going over the code and covering the underlying AngularJS in the following sections.

**[(Back to top)](#table-of-contents)**

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

console.log($scope.arr[0])        // 1
console.log($scope.arr[3])        // "hello"

$scope.arr.push("bye");           // [1, 2, 3, "hello", "bye"];
```

**Objects**
```
$scope.obj = {name: "foo", age: 2, gender: "male"};

console.log($scope.obj.name)           // "foo"
console.log($scope.obj.age)            // 2
```

**Function Declarations**
```
$scope.greetings = function(name) {
  console.log("Hello, " + name + "!");
};

$scope.greetings("foo");               // "Hello, foo!"
```

Go ahead and take a look at all the scope variables declared in the ***app.js*** file of the starter app and see if you can distinguish their types.

**Our Model is an Array**
```
=========================================================================
Our model has a few default values in it at the start of the application:
=========================================================================

$scope.groceryList = ["Granny Smith Apples", "Naval Oranges", "Dole Hawaiian Gold Pineapple"];
```

**Strings**
```
$scope.title = "Iris's Grocery List";
$scope.icon = "fa fa-shopping-cart";
```

**Functions**
```
========================================================
This function pushes new items to the our model's array:
========================================================

$scope.addItem = function(newItem) {
  if (newItem) {
      $scope.groceryList.push(newItem);
  }
  $scope.groceryItem = null;
};

============================================================
This function removes specific items from our model's array:
============================================================

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
    <p> {{ ctrlOneGreeting }} </p>            <!-- "Hello from controller 1!" -->
    <p> {{ ctrlTwoGreeting }} </p>            <!-- Nothing shown -->

    <p> {{ byeBye }} </p>                     <!-- "Controller 1 says bye!" - (No collision) -->
  </div>

  <div ng-controller="controller2">
    <p> {{ ctrlOneGreeting }} </p>            // Nothing shown
    <p> {{ ctrlTwoGreeting }} </p>            // "Hello from controller 2!"

    <p> {{ byeBye }} </p>                     <!-- "Controller 2 says bye!" (No collision) -->
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

**[(Back to top)](#table-of-contents)**

---
# Data Binding

In the previous section, we covered how to declare scope variables. I mentioned that scope variables are more versatile than JavaScript variables in that they can be attached to the DOM with minimal code. The process of attaching these scope variables to HTML elements is called **data binding**.

The AngularJS documentation features a nice diagram to show you the flow of data-binding:

![Image of AngularJS data binding](https://docs.angularjs.org/img/Two_Way_Data_Binding.png)

It may look a little confusing at first but it is actually quite simple if we break down each object inside the diagram.

**The template**

This is simply the HTML code that we write up--more specifically, it would be the HTML elements that
we bind AngularJS directives to. They are not displayed like normal HTML elements because they get processed and compiled by AngularJS before they are rendered onto the browser.

**The view**
This is actually the HTML that is rendered onto the browser. It is all the HTML elements including those that are associated with AngularJS. Anything the user sees and interacts with is the view.

**The model**
This our data and values we declare inside the controller. It is described by AngularJS as the ***Single-Source-of-Truth*** because it is the persistence source of data that provides values for the view.  

Values declared through the ***scope variables*** of an application's controller will always be the same whenever the application first starts. We may change or modify these variables during the lifecycle of an AngularJS application, but *restarting the application would return these variables to their original values as declared in the controller.* See the example below:

*app.js*
```
myFirstApp.controller('groceryList', ['$scope', function($scope) {

=======================================================================
The AngularJS application will always start out with $scope.title being
"Iris's Grocery List" initially:
=======================================================================

  $scope.title = "Iris's Grocery List";

===============================================================
If we were to run this function, it would change $scope.title's
value during the lifecycle of the application:
===============================================================

  $scope.changeTitle = function(newTitle) {
    $scope.title = newTitle;
  }
  $scope.changeTitle("Foo's Grocery List");

=============================================================================================
For the remainder of the application's lifecycle, $scope.title would be "Foo's Grocery List".
Restarting the browser would return $scope.title to it's initial value of
"Iris's Grocery List" until we modify it again.
=============================================================================================

}]);
```

The same thing applies to the data used within the AngularJS application. For our starter app, we are using an array, so it is technically not a true data model, but it is easier to implement for the sake of the demo. Real data models incorporate a database and have data persistence so that we can pass in data which is saved and displayed even when the application restarts again. Pushing new values inside of the array of our application's controller will save them momentarily but restarting the browser will return the "pseudo model" to its original form:

*app.js*
```
=============================================
Starter app's data array (the "Pseudo Model")
=============================================

$scope.groceryList = ["Granny Smith Apples", "Naval Oranges", "Dole Hawaiian Gold Pineapple"];

========================================================================
We use these functions for basic creation and deletion of non-persistent
data by pushing and splicing items from the array:
========================================================================

$scope.addItem = function(newItem) {
  if (newItem) {
      $scope.groceryList.push(newItem);
  }
  $scope.groceryItem = null;
};

$scope.removeItem = function(item) {
  for (index in $scope.groceryList) {
    if ($scope.groceryList[index] === item) {
      $scope.groceryList.splice(index, 1);
    }
  }
};

================================================================================
However, restarting the browser will return $scope.groceryList to the original
array with only 3 strings in it:

    ["Granny Smith Apples", "Naval Oranges", "Dole Hawaiian Gold Pineapple"]
================================================================================
```

As you can see, AngularJS implements data binding to refresh the HTML (View) with any changes in our data (our Model and any scope variables in the controller) and update the data with any user actions performed in the HTML. AngularJS is constantly monitoring all the scope variables and the elements that we bind the scope variables to. Any changes to one will be reflected onto the other depending on how we bind them. This is all concept until you see how we attach our pseudo data models to the DOM through data binding directives.

AngularJS has a few methods of data binding that I am going to cover: [**ngBind**](#ngbind), [**expressions**](#expressions), and [**ngModel**](#ngmodel). These will all be attached on the view end (HTML) of our starter app, directly on the elements as attributes.

### ngBind

The primary way to bind data to an HTML element is to use the **ngBind** directive. This is the fastest and cleanest way to bind the values of certain scope variables/data objects from the controller to specific HTML elements. The examples below demonstrate a few different ways to bind scope variables to the HTML. Note how all these ways of using ngBind produce the same results in the HTML.

**Primitive Data**

*app.js*
```
$scope.title = "Iris's Grocery List";
```
*index.html*
```
<h1 class="title" ng-bind="title"></h1>         <!--"Iris's Grocery List"-->
```

**Arrays**

*app.js*
```
$scope.title = ["Iris's Grocery List", "Foo's Grocery List"];
```
*index.html*
```
<h1 class="title" ng-bind="title[0]"></h1>        <!--"Iris's Grocery List"-->
```

**Objects**

*app.js*
```
$scope.obj = {
  title: "Iris's Grocery List",
  fake: "Foo's Grocery List"
};
```
*index.html*
```
<h1 class="title" ng-bind="obj.title"></h1>       <!--"Iris's Grocery List"-->
```

**Functions**

*app.js*
```
$scope.title = function() {
  return "Iris's Grocery List";
};
```
*index.html*
```
<h1 class="title" ng-bind="title()"></h1>       <!--"Iris's Grocery List"-->
```

### {{expressions}}

**Expressions** are essentially the same as ngBind. However, rather than having to place scope variables inside of the ngBind markers as an attribute of an element we can place them inside double curly braces **{{ }}** like so:

*index.html*
```
===================================
Both of the following are the same:
===================================

<h1 class="title" ng-bind="title"></h1>         <!--"Iris's Grocery List"-->
<h1 class="title">{{title}}</h1>                <!--"Iris's Grocery List"-->
```

Expressions are a lot more versatile than ngBind in that they can be easily injected into different locations and still display whatever value they captured. Here's a quick demonstration:

*app.js*
```
$scope.name = "Foo";
```
*index.html*
```
===================================
Both of the following are the same:
===================================

<h1>Hello {{name}}, how are you?</h1>                           <!--"Hello Foo, how are you?"-->
<h1>Hello <span ng-bind="name"></span>, how are you?</h1>       <!--"Hello Foo, how are you?"-->

======================================================================
Note how we have to create the extra span for the ngBind directive in
order to inject the name into the greeting.
======================================================================
```

This can be very useful because we can do something like this in our starter application:

*app.js*
```
$scope.icon = "fa fa-shopping-cart";
```
*index.html*
```
<h3 class="list-img {{icon}}"></h3>

======================================================================
I declared the string "fa fa-shopping-cart", which is a class name
for a favicon, then injected that string into an HTML element's class.
That element now displays the shopping cart favicon.
======================================================================
```


### ngBind VS Expressions

**What's the point of ngBind then if we have this wonderful and versatile way of binding with expressions?***
Though versatile, using expressions not as efficient as using ngBind in terms of performance. If you're only using expressions inside of your AngularJS, your app might flash with unresolved ***{{expression}}*** tags because it takes AngularJS more time to resolve data for expressions than ngBind. There are complicated concepts underlying this behavior. AngularJS "dirty checks" expressions using a digest loop to constantly refresh it. Meanwhile it places a ***watcher*** on directives like ngBind and only refreshes them when their passed values change. Thus, ngBind is more efficient, ***so use expressions with caution!***

### ngModel

The **ngModel**, unlike ngMind and expressions, have more characteristics of a two-way binding. That is, it does not simply take in declared values like ngBind and expressions do. The ngModel directive can also output data as well, so it is often used on form inputs because of this. The way ngModel works is more complicated than ngBind, so bear with me:

An HTML element that is bound using ngModel will be able to take in any value that we pass it from a scope variable. For example, let's say we have an input with an ngModel:

*index.html*
```
<input ng-model="sample"/>
```

If we do not declare a ***$scope.sample*** variable, then the input will be blank at the start of the application because the $scope.sample will be *undefined* like so:

![Example Input 1](/app/imgs/sample1.png)

However, if we declare a literal value for ***$scope.sample*** like so:

*app.js*
```
$scope.sample = "foo"
```

Then the input will look like this when the application starts:

![Example Input 1](/app/imgs/sample2.png)

If we were to change that input's value and trigger an event that outputs that value, then the $scope.sample variable's value would change with it as well. That is why the ngModel directive is primarily used with inputs because it is the only HTML element that provides a gateway for users to input values from the view into our controller to update our model. Take a look at the input in the starter application's code:

*index.html*
```
<input class="item-input" placeholder="(e.g. Deluxe Pizza)" ng-model="groceryItem"/>
<button class="add-btn" type="button" ng-if="groceryItem" ng-click="addItem(groceryItem)">Add to List</button>
```

The input is bounded to an ngModel with the name ***groceryItem*** but there is no ***$scope.groceryItem*** explicitly defined in the controller code. Thus, the input is blank when the starter app is first opened. There is a button with an AngularJS directive that listens to a click event--more on this [ngClick directive](#ngclick) later. This click event triggers a function called ***addItem()*** that takes in the value from ***groceryItem***. Let's take a look at the app.js file to see what this function does.

*app.js*
```
$scope.addItem = function(newItem) {
  if (newItem) {
      $scope.groceryList.push(newItem);
  }
  $scope.groceryItem = undefined;
};
```

The ***addItem(groceryItem)*** takes in the groceryItem of the input and pushes it to our pseudo model, an array called ***groceryList***. If the input were blank, then the ngModel directive would output an *undefined* value to the *addItem()* function. Passing in any value would change the value of $scope.groceryItem and keep that value displayed in the input because the two are bound. Thus, right after the grocery list is updated, we have to change the $scope.groceryItem to *undefined* so that we clear the input's value all over again on the next digest loop.


This may seem confusing, but I highly suggest you play around with the starter app to see how it works. Try setting a default value for ***$scope.groceryItem*** inside the controller to see what the input shows when you start the application. Then remove the line '***$scope.groceryItem = undefined;***' from the ***addItem()*** function to see how the input behaves after you click submit.


**[(Back to top)](#table-of-contents)**

---

# Commonly Used Directives

There are many directives that come with AngularJS that I will not be able to cover in this tutorial which you can find [here.](https://docs.angularjs.org/api)

For the starter app, we implemented 3 of the most commonly-used directives: [ngClick](#ngclick), [ngRepeat](#ngrepeat), and [ngIf](#ngif).

Before we dive into each of these directives, take a look at the following chunk of code inside our starter app to see how they are implemented:

*index.html*
```

ngIf 1 >>      <div ng-if="groceryList.length > 0">
                 <ul class="grocery-list">
ngRepeat/          <li class="list-item"
ngClick >>              ng-click="removeItem(item)" ng-repeat="item in groceryList>
                     <img class="bullet-img" src="imgs/icon.svg"/> {{item}}
                   </li>
                 </ul>

                 <h4 class="remove-note">(Click on an item to remove it from the list.)</h4>
               </div>

ngIf 2 >>      <div ng-if="groceryList.length === 0">
                 <h4 class="empty-desc">You currently have no items on your grocery list!</h4>
               </div>

               <h3 class="add-note">Add an item to the grocery list:</h3>

               <input class="item-input"
                      placeholder="(e.g. Deluxe Pizza)"     
                      ng-model="groceryItem"/>

ngClick >>    <button class="add-btn"
                      type="button"
                      ng-if="groceryItem"       
                      ng-click="addItem(groceryItem)">Add to List</button>
```

*app.js*
```
myFirstApp.controller('groceryList', ['$scope', function($scope) {

  //===================
  // ngIf and ngRepeat:
  //===================

  $scope.groceryList = ["Granny Smith Apples", "Naval Oranges", "Dole Hawaiian Gold Pineapple"];

  //=========
  // ngClick:
  //=========

  $scope.addItem = function(newItem) {
    if (newItem) {
        $scope.groceryList.push(newItem);
    }
    $scope.groceryItem = undefined;
  };

  $scope.removeItem = function(item) {
    for (index in $scope.groceryList) {
      if ($scope.groceryList[index] === item) {
        $scope.groceryList.splice(index, 1);
      }
    }
  };
}]);
```

### ngClick

The **ngClick** directive can be placed on an HTML element to trigger an event when an element is clicked.

In the starter app, the ngClick directive was used twice, once to to trigger a **removeItem()** function and another to trigger an **addItem()** function.

*index.html*
```
======
REMOVE
======
<li class="list-item"
    ng-click="removeItem(item)"
    ng-repeat="item in groceryList>
      <img class="bullet-img" src="imgs/icon.svg"/> {{item}}
</li>

===
ADD
===
<button class="add-btn"
                      type="button"
                      ng-if="groceryItem"       
                      ng-click="addItem(groceryItem)">Add to List</button>
```

Notice how the ng-click can work with the *list* element and the *button* element.
I passed the functions as values and the target items as parameters. See how these fucnctions run in the JavaScript file.

*app.js*
```
===
ADD
===
$scope.addItem = function(newItem) {
  if (newItem) {
      $scope.groceryList.push(newItem);
  }
  $scope.groceryItem = undefined;
};

======
REMOVE
======
$scope.removeItem = function(item) {
  for (index in $scope.groceryList) {
    if ($scope.groceryList[index] === item) {
      $scope.groceryList.splice(index, 1);
    }
  }
};
```

The **addItem() function** triggered by the button takes in a ***groceryItem*** parameter, which is the value from the input that we provided an ngModel directive to.
This value (if it exists), is pushed into the ***groceryList*** array that serves as our mock data object for this app.

The **removeItem() function** triggered by clicking on a list item, takes in the value of ***item***, which is the name of each object we render from the [ngRepeat](#ngrepeat) that goes through the ***groceryList*** array to display each iteration as an object. This function then goes through each groceryList item to delete the specific one that has a matching value.

### ngRepeat

**ngRepeat** is a very powerful directive under the hood. It will cycle through arrays and create a DOM element for each iteration it goes through. When attached to an element, it will create another count of that element for each item in the array. The basic syntax for ngRepeat is:

> <ANY ng-repeat=" 'itemName' in 'arrayName' "></ANY>

This is how it is used in the start app:

*index.html*
```
<li class="list-item"
    ng-click="removeItem(item)"
    ng-repeat="item in groceryList">
      <img class="bullet-img" src="imgs/icon.svg"/>
      {{item}}
</li>
```

The syntax in the ngRepeat directive tells Angular that we have a ***groceryList*** array. For each item in the array, ngRepeat will create another **li element** with all the all the same attributes and child elements inside of it (our **img element**). ***item*** an object within the array, so since our array contains a list of strings, each **{{item}}** that is provided inside the li element will be that string. Alternatively, we could also bind the values like so:

*index.html*
```
<li class="list-item"
    ng-click="removeItem(item)"
    ng-repeat="item in groceryList">
      <img class="bullet-img" src="imgs/icon.svg"/>
      <p ng-bind="item"></p>
</li>
```

To see AngularJS rendering these elements, try opening the index.html in a Chrome Browser and opening the developer console using: **cmd + opt + i**. Going down to the part of the DOM tree where we see the li element, note how there are multiple li's even though there is only one in the index.html file:

![Example Developer Console](/app/imgs/sample3.png)

Try using the app to add another item to the grocery list. Note how the console will update the DOM with another li after you submit an item.

I just showed you only the most basic usage of ngRepeat. The directive has special properties and can do many other iterative tasks that you can read up on [here.](https://docs.angularjs.org/api/ng/directive/ngRepeat)

### ngIf

The **ngIf** directive is used to remove or render a portion of the DOM by providing a condition. The condition provided to the directive must return a **true** or **false** value, such that *true* would render a block and *false* would remove it. Thus, we wan't to provide the ngIf directive in a container element to encapture the template or block of html elements we want to show/hide with conditionals. Take a look at the starter app:

*index.html*
```
Condition 1    <div ng-if="groceryList.length > 0">
                 <ul class="grocery-list">
                   <li class="list-item"
                       ng-click="removeItem(item)" ng-repeat="item in groceryList>
                     <img class="bullet-img" src="imgs/icon.svg"/> {{item}}
                   </li>
                 </ul>

                 <h4 class="remove-note">(Click on an item to remove it from the list.)</h4>
               </div>

Condition 2    <div ng-if="groceryList.length === 0">
                 <h4 class="empty-desc">You currently have no items on your grocery list!</h4>
               </div>
```

Both conditions are going off of the length ***groceryList*** array:

*app.js*
```
$scope.groceryList = ["Granny Smith Apples", "Naval Oranges", "Dole Hawaiian Gold Pineapple"];
```

**Condition 1: "groceryList.length > 0"**

If there is one or more items inside our data array, then this chunk of code shows:

```
<div ng-if="groceryList.length > 0">
 <ul class="grocery-list">
   <li class="list-item"
       ng-click="removeItem(item)" ng-repeat="item in groceryList>
     <img class="bullet-img" src="imgs/icon.svg"/> {{item}}
   </li>
 </ul>

 <h4 class="remove-note">(Click on an item to remove it from the list.)</h4>
</div>
```

Resulting in:

![If there is data image.](/app/imgs/sample4.png)


**Condition 2: "groceryList.length === 0"**

If there are no items inside our data array, then this chunk of code shows:

```
<div ng-if="groceryList.length === 0">
  <h4 class="empty-desc">You currently have no items on your grocery list!</h4>
</div>
```

Resulting in:

![If there is no data image.](/app/imgs/sample5.png)

**[(Back to top)](#table-of-contents)**

# Conclusion

That sums up the basics of AngularJS. I would suggest you go through the HTML and JavaScript files of the starter app once more to understand all the concepts that were covered in this tutorial. You may notice that you understand everything more clearly, but do not worry if you do not feel confident about using AngularJS yet. As with every programming library and framework, you just have to dive right in and everything will become clearer to you the more you practice. Go head and get started on your own version of the starter app! Add your own touch to it and explore the AngularJS documentation to improve on the app if you can. If you get stuck on anything, feel free to ask questions or search many popular AngularJS communities such as [this one.](https://plus.google.com/communities/115368820700870330756)

**[(Back to top)](#table-of-contents)**
