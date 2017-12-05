# Intro to AngularJS

### *A crash course to help you understand basic, pre-1.4v AngularJS concepts.*

For our development, we will be primarily using AngularJS. It is a very powerful front-end framework with many features included. This guide will cover the basics of AngularJS to help you get started on developing dynamic web applications from a static HTML page. The point of this guide is to help you understand the underlying concept of AngularJS. For that reason, I will be showing you techniques that demonstrate AngularJS concepts but are not the best practices for developing enterprise-level applications.


# Table of Contents
1. [Intro to AngularJS](#what-is-angularjs)
    1. [How it Works](#how-angularjs-works)
    1. [What it Does](#what-angularjs-does)
1. [Getting Started](#initial-setup)
    1. [Module](#module)
    1. [Directives](#directives)
    1. [Controllers](#controllers)
1. [Building with AngularJS](#making-a-grocery-list)
1. [Scope](#scope-($scope))




# What is AngularJS?

AngularJS is a frontend framework that helps us build more dynamic webpages without having to type too much of our own JavaScript.

***If you already have a basic understanding of AngularJS and what it does, then [skip this section.](#initial-setup)***

### How AngularJS works

AngularJS manipulates our webpages via the **Model View Whatever (MVW)*** architectural approach.

  - **The model** is the data we want to display.
    - (I.e., the JSON, JavaScript object, or constant variables that  contain the data)
  - **The view** is the HTML we render on the browser.
    - (I.e., the HTML file that we load in the browser)
  - **The whatever** (commonly called a *controller*) is the logic we will write to connect the **view** with the **model**.
    - (I.e., the JavaScript file with all our logic and AngularJS code)

Having this separation of concerns makes our code more manageable and our web applications faster. We use AngularJS as the *whatever* because monitors user actions/events within our *view* and changes in our *model* to provide the appropriate responses.

This was a very simple summary of what the MVC/MVVM/MVW architecture. If you would like to read up more about it, [here is a nice article on the topic.](https://alexatnet.com/model-view-controller-mvc-in-javascript/)

### What AngularJS does

AngularJS does many things under the hood that we cannot see nor fully grasp unless we are weathered Google Engineers. However, the core of AngularJS involves creating **observables** and attaching them to our HTML elements via **data-binding**. The HTML elements can then become more dynamic, displaying different things instead of just the usual static values that we created them with. Think of AngularJS as steroids for your HTML.

AngularJS can even create custom HTML elements called *components* but that is outside the *scope* of this course. I italicize the word *scope* for important reasons which you will find out later in this crash course.

Now that you have a basic understanding of what AngularJS is, let's create a simple application with it! Follow along with this guide, and you can find the final version of this application in this repository in the *app* directory.

**[Back to top](#table-of-contents)**

# Initial Setup

AngularJS is a framework, so we need to load it with our HTML before we can use it. I like to just use the CDN that is provided by AngularJS straight from their site:

---
> https://code.angularjs.org/1.6.7/angular.min.js
---

The *view* of our application will be the **/app/index.html** file in this repository. Your version of the HTML file should now look something like this:


**index.html:**
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>AngularJS Tutorial</title>
    <script src="https://code.angularjs.org/1.6.7/angular.min.js"></script>
  </head>
  <body>
  </body>
</html>
```

The *whatever/controller* for this app will be the **/app/app.js**. This will contain all the logic of our application that we will write using the AngularJS framework. Be sure to link to this **app.js** file within the HTML like so:

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

### Modules

Every AngularJS app requires setting up a centralized **module**. Think of a module as the primary link between AngularJS framework and our HTML and JavaScript files.

This line initializes our app, setting up the module so we can use all the methods that come with the AngularJS framework inside our JavaScript file to manipulate our HTML file:

**app.js:**
```
const myFirstApp = angular.module('appName', []);
```

**One thing to note:** The square brackets **[]** inside *angular.module()* is left empty for now, but it will be used for dependency injection. I'll cover more on this later, but you do not need to worry about it for now.

Next up, we need to attach the module to the HTML to link it with AngularJS. We will use the name of the module, *appName* that we created in the app.js file.

**index.html:**
```
<!DOCTYPE html>
  <html ng-app="appName">
...
```

I like to attach the module in the <html> tag, but you can do it in the <body> tag or a top-level <div> container as well. Be aware that AngularJS will only see and run our controller code on the child elements that go *inside* of whichever element we pass the module name into.

I passed the module **appName** to my <html> element using the **ng-app** [directive.](#directives)

### Directives

**Directives** are customized AngularJS attributes that are attached to HTML elements. AngularJS directives are very similar to the common HTML attributes such as *id, class, href, src, etc.* but way more beefed up. We use these directives to tell AngularJS to bind things/features to HTML elements such as data, event listeners, callbacks, conditionals, etc.

There are many directives that come standard with the AngularJS framework. AngularJS has great documentation with a [list of all the built-in directives.](https://docs.angularjs.org/api/ng/directive)

### Controllers

This is where the MVC/MVW concept comes together and we can truly see how AngularJS is an MVC framework. **Controllers** are an AngularJS directive where we put all our code which will act as the *controller* that connects the *view* and the *model*. I advise that you separate the code for the model, view and controller in different files to achieve. However, for the sake of simplicity, I will use a plain JavaScript array inside the controller as the model for this application.

We create a controller in our app by attaching it to the centralized module that we created earlier:

**app.js:**
```
const myFirstApp = angular.module('appName', []);


myFirstApp.controller('groceryList', function() {

  // Your controller code will go in here!

});
```

Then we attach the controller inside the HTML using the **ng-controller** directive. **When attaching the ng-controller directive to your HTML, make sure you pass it into an element that is at the same level or below the element that we set the ng-app module directive on or it will not work**:


**index.html:**
```
<!DOCTYPE html>
<html ng-app="appName">
  <head>...</head>

  <body ng-controller="groceryList"></body>
</html>
```

I did it on the <body> tag which is *inside* of my <html> tag that I attached the module directive to.

That's it! Now we have AngularJS loaded in our app and we can start building out an AngularJS application!

**[Back to top](#table-of-contents)**

# Making a Grocery List

I have attached a css file, **/app/styles.css**, which contains all the styles for the app. You can download it from this repo and link it to your HTML to save you some time while you follow along.

At this point, you should clone this repository or download it onto your computer. The final app is inside the ***~/app*** directory. Open the *index.html* file in your browser to see how the application works.

Next, look over the *app.js* file line by line and reference the *index.html* to see how the the JavaScript file **controls** the **view** in the HTML file and how the input in the HTML file communicates with the **controller** to modify our **model**, the array inside our controller.

It's okay if you do not get everything at first. I will be going over the code and covering the underlying AngularJS in the following sections.

# Scope ($scope)

In AngularJS, the scope is the part that binds our HTML (the view) and our JavaScript code (the controller). We declare scope variables in the controller and bind them to elements in the HTML--more on how to do this later.

**$scope** is one of the many dependencies and services that are included with AngularJS. However, to use such dependencies




**[Back to top](#table-of-contents)**
<!-- When we create an **observable**, we are pretty much pointing AngularJS to some data that we want it to constantly monitor for any changes. We then wire up an HTML element to the observable using **data-binding**. Then, this HTML element becomes dynamic, meaning it can change if the data -->
