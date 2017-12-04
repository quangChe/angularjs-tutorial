# Intro to AngularJS

### A short guide to understanding basic AngularJS concepts.

For our development, we will be primarily using AngularJS. It is a very powerful front-end framework with many features included. This guide will cover basic methods that come with the AngularJS framework.

# Table of Contents
1. [Intro](#what-is-angularjs)
    1. [How AngularJS works](#how-angularjs-works)
    1. [What AngularJS does](#what-angularjs-does)
2. [Getting Started](#initial-setup)

# What is AngularJS?

AngularJS is a frontend framework that helps us build more dynamic webpages without having to type too much of our own JavaScript.

### How AngularJS works

AngularJS manipulates our webpages via the **Model View Whatever (MVW)*** architectural approach.

  - **The model** is the data we want to display.
    - (I.e., the JSON, JS object, or constant variables that  contain the data)
  - **The view** is the HTML we render on the browser.
    - (I.e., the HTML file that we load in the browser)
  - **The whatever** (commonly called a *controller*) is the logic we will write to connect the **view** with the **model**.
    - (I.e., the JS file with all our logic and AngularJS code)

Having this separation of concerns makes our code more manageable and our web applications faster. We use AngularJS as the *whatever* because monitors user actions/events within our *view* and changes in our *model* to provide the appropriate responses.

This was a very simple summary of what the MVC/MVVM/MVW architecture. If you would like to read up more about it, [here is a nice article on the topic.](https://alexatnet.com/model-view-controller-mvc-in-javascript/)

### What AngularJS does

AngularJS does a lot of stuff under the hood that we cannot see nor fully grasp unless we are weathered Google Engineers. However, the core of AngularJS is creating **observables** and attaching them to our HTML elements via **data-binding**. The HTML elements can then become more dynamic, displaying different things instead of just the usual static values that we created them with. Think of AngularJS as steroids for your HTML.

AngularJS can even create custom HTML elements called *components* but that is outside the *scope* of this course. I italicize the word *scope* for important reasons which you will find out later in this crash course.

Now that you have a basic understanding of what AngularJS is, let's create a simple application with it! Follow along with this guide, and you can find the final version of this application in this repository in the *app* directory.

# Initial Setup

AngularJS is a framework, so we need to load it with our HTML before we can use it.

First attach to your index HTML the CDN for AngularJS:  **https://code.angularjs.org/1.6.7/angular.min.js**.

<!-- When we create an **observable**, we are pretty much pointing AngularJS to some data that we want it to constantly monitor for any changes. We then wire up an HTML element to the observable using **data-binding**. Then, this HTML element becomes dynamic, meaning it can change if the data -->
