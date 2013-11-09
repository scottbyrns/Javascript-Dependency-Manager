#Javascript Dependency Manager Repository

#INCOMPLETE / IN PROGRESS

## Repository Overview

### Structure

#### pom.json

##### Objective
To represent many varying javascript library packages with a uniform interface for basic implementation.

##### Heirarchy

| Key        | Purpose           | Example  |
| ------------- |:-------------:| -----:|
|name|A human relatable title for the library.|WebGL Neural Network Library|
|description|A long sentence or two short describing what solution the library provides.|A simple plug and play Sigmoid neural network that runs in GLGS Shaders|
| ------------- |:-------------:| -----:|
|groupId|The reverse domain of the libraries origin.|com.scottbyrns|
|artifactId|The name of the object your package represents.|WebGLNeuralNetwork|
|version|Release version number for your artifact. For in-progress work use #.#.#-SNAPSHOT naming.|1.0.0-SNAPSHOT|
| ------------- |:-------------:| -----:|
|configuration|JSON object to be passed to the implimenter during dependency injection of your artifact.|{"foo":"bar"}|
| ------------- |:-------------:| -----:|
|dependencies|||
|sources|An array of paths to files to be included in your package during injection.|["NeuralNetwork.js", "shaders/neuralnet.frag", "shaders/random_distribution_2d.frag"]|


* Name
* Description

* Group ID
* Artifact ID
* Version

* Configuration

* Dependencies
* Sources

##### Purpose & Scope

The pom.json file is moddeled after Mavens pom.xml file. In Maven the pom file is a Project Object Model describing how a software project in Java is related to its dependencies. It carries instructions on how to build the project etc.. In javascript however we develop for a different platform than Java so our domain of implementation and distribution is very different in form and function. For this reason I draw a distinction in the way the pom.json file is precieved during development of this project. Rather than a pom being a project object model it is represents a packages object model. In Java a package inherits awareness of its object model through a series of imports interpreted by the java compiler. In javascript we lack a compiler to enforce a safe dependency loop of object relationships. The package object model provides an approximation of relationship dependency management on a package level.

In general the internet is ready for a fresh evolution of the aged web 2.0 ajax methodologies and practices. We have accomplished a great deal of reuse and modularity in the ajax age and it gave birth to the REST API and the "Web Application". The internet is mobile now. We have to adapt and make our software analgously portable. To create an ecosystem of libraries and widgets on a first class order much as we have in thick clients on mobile apps that are an aggregate of many included modules from disparate sources. Underneeth they are all one coherent mesh of sub systems operating in harmony to proccess all the I/O of the world around the app. Above they are each a unique and distinct object on the highest of order. They are a thing as much as any thing in the world around us. They are unique and modular, distributable, and interchangable. This is the future of the web object. An evolution into a first class object that can be called on at any time any place to fullfill a need. An entire ecosystem of solutions traded openly on global interconnected marked for developers. Some solutions will be business to business but the vast majority will be free and open. Driving an evolution of capability for every developer. Giving us millions of tools where we had dozens before. An addative effect producing a net exponential growth until saturation of solutions is met! 

#### ...

## Server Overview

##### Minimum Requirements

* Node.js
* └ Socket.io
* └ mime
* └ express
* Google Chrome w/ WebGL Support
* SSL Certificate // TODO Append Cert Generation Instructions
