# Full-Stack Redux Tutorial

#### Server setup

cd /vagrant/server

npm init -y

npm install --save-dev babel-core
npm install --save-dev babel-cli
npm install --save-dev babel-preset-es2015

npm install --save-dev mocha
npm install --save-dev chai

npm install --save immutable
npm install --save-dev chai-immutable


#### Immutable

Immutable collections should be treated as values rather than objects. While objects represents some thing which could change over time, a value represents the state of that thing at a particular instance of time. This principle is most important to understanding the appropriate use of immutable data.

it's important to use the Immutable.is() function or .equals() method to determine value equality instead of the === operator which determines object reference identity.

#### Writing The Application Logic With Pure Functions

The main difference is that in Redux, the application state is all stored in one single tree structure. In other words, everything there is to know about your application's state is stored in one data structure formed out of maps and arrays.

This has many consequences, as we will soon begin to see. One of the most important ones is how this lets you think about the application state in isolation from the application's behavior. The state is pure data. It doesn't have methods or functions. And it isn't tucked away inside objects. It's all in one place.

The second important point about the Redux architecture is that the state is not just a tree, but it is in fact an immutable tree.

A Redux application's state tree is an immutable data structure. That means that once you have a state tree, it will never change as long as it exists. It will keep holding the same state forever. How you then go to the next state is by producing another state tree that reflects the changes you wanted to make.

It is generally a good idea in these state transformation functions to always morph the old state into the new one instead of building the new state completely from scratch.

Here we have an acceptable version of the core logic of our app, exp:ressed as a few functions. We also have unit tests for them, and writing those tests has been relatively easy: No setup, no mocks, no stubs. That's the beauty of pure functions. We can just call them and inspect the return values.

#### Introducing Actions and Reducers

We have the core functions of our app, but in Redux you don't actually call those functions directly. There is a layer of indirection between the functions and the outside world: Actions.

An action is a simple data structure that describes a change that should occur in your app state. It's basically a description of a function call packaged into a little object. By convention, every action has a type attribute that describes which operation the action is for. Each action may also carry additional attributes.

What we're going to write is a generic function that takes any kind of action - along with the current state - and invokes the core function that matches the action. This function is called a reducer.

Our reducer should delegate to one of the core functions based on the type of the action. It also knows how to unpack the additional arguments of each function from the action object.

An important additional requirement of reducers is that if they are called with an undefined state, they know how to initialize it to a meaningful value.

Actually, given a collection of past actions, you can actually just reduce that collection into the current state. That's why the function is called a reducer: It fulfills the contract of a reduce callback function.

This ability to batch and/or replay a collection of actions is a major benefit of the action/reducer model of state transitions, when compared to calling the core functions directly.

#### A Taste of Reducer Composition

Our core functionality is currently defined so that each function takes the whole state of the application and returns the whole, next state of the application.

It is a much better idea to, whenever you can, make operations work on the smallest piece (or subtree) of the state possible. 


