# Full-Stack Redux Tutorial

[http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)
[https://www.youtube.com/watch?v=xsSnOQynTHs](https://www.youtube.com/watch?v=xsSnOQynTHs)


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

npm install --save redux
npm install --save socket.io

#### Client setup

cd /vagrant/client

npm init -y

     npm install --save-dev webpack webpack-dev-server
sudo npm install -g         webpack webpack-dev-server

npm install --save-dev babel-core
npm install --save-dev babel-loader
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-react

npm install --save-dev mocha chai
npm install --save-dev jsdom
npm install --save immutable
npm install --save-dev chai-immutable

npm install --save react react-dom
npm install --save-dev react-hot-loader
npm install --save react-addons-test-utils

### Server Application

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

The main reducer function only hands parts of the state to lower-level reducer functions. We separate the job of finding the right location in the state tree from applying the update to that location.

#### Introducing The Redux Store

If you had a collection of all the actions that are ever going to occur in your application, you could just call reduce. Out pops the final state of your app. Of course, you usually don't have a collection of all those actions. They will arrive spread out over time, as things happen in the world: When users interact with the app, when data is received from networks, or when timeouts trigger.

To deal with this reality, we can use a Redux Store. It is an object that, as the name implies, stores the state of your application over time.

A Redux Store is initialized with a reducer function.  What you can then do is dispatch actions to that Store. The Store will internally use your reducer to apply the actions to the current state, and store the resulting, next state.  At any point in time, you can obtain the current state from inside the Store.

The Redux store ties things together into something we'll be able to use as the central point of our application: It holds the current state, and over time can receive actions that evolve the state from one version to the next, using the core application logic we have written and exposed through the reducer.

It is quite remarkable just how small the integration surface area between our application code and Redux actually is. Because we have a generic reducer function, that's the only thing we need to let Redux know about. The rest is all in our own, non-framework-specific, highly portable and purely functional code!

#### Setting Up a Socket.io Server

Our application is going to act as a server for a separate browser application that provides the UIs for voting and viewing results. For that purpose, we need a way for the clients to communicate with the server, and vice versa.

We're going to use WebSockets to communicate. More specifically, we're going to use the Socket.io library that provides a nice abstraction for WebSockets that works across browsers. It also has a number of fallback mechanisms for clients that don't support WebSockets.

#### Broadcasting State from A Redux Listener

Our server should be able to let clients know about the current state of the application. Our server should be able to let clients know about the current state of the application.  It can do so by emitting a Socket.io event to all connected clients whenever something changes.

And how can we know when something has changed? Well, Redux provides something for exactly this purpose: You can subscribe to a Redux store. You do that by providing a function that the store will call after every action it applies, when the state has potentially changed. It is essentially a callback to state changes within the store.

We are now publishing the whole state to everyone whenever any changes occur. This may end up causing a lot of data transfer. One could think of various ways of optimizing this (e.g. just sending the relevant subset, sending diffs instead of snapshots...), but this implementation has the benefit of being easy to write, so we'll just use it for our example app.

In addition to sending a state snapshot whenever state changes, it will be useful for clients to immediately receive the current state when they connect to the application. That lets them sync their client-side state to the latest server state right away.

We can listen to 'connection' events on our Socket.io server. We get one each time a client connects.

#### Receiving Remote Redux Actions

In addition to emitting the application state out to clients, we should also be able to receive updates from them.

Our server now operates essentially like this:

* A client sends an action to the server.
* The server hands the action to the Redux Store.
* The Store calls the reducer and the reducer executes the logic related to the action.
* The Store updates its state based on the return value of the reducer.
* The Store executes the listener function subscribed by the server.
* The server emits a 'state' event.
* All connected clients - including the one that initiated the original action - receive the new state.

### Client Applicaiton

#### React and react-hot-loader

What's really cool about the way React applications get built with Redux and Immutable is that we can write everything as so-called Pure Components (also sometimes called "Dumb Components").

As a concept, this is similar to pure functions, in that there are a couple of rules to follow:

* A pure component receives all its data as props, like a function receives all its data as arguments. It should have no side effects, including reading data from anywhere else, initiating network requests, etc.
* A pure component generally has no internal state. What it renders is fully driven by its input props. Rendering the same pure component twice with the same props should result in the same UI. There's no hidden state inside the component that would cause the UI to differ between the two renders.

If components can't have state, where will the state be? In an immutable data structure inside a Redux store! We've already seen how that works. The big idea is to separate the state from the user interface code. The React components are just a stateless projection of the state at a given point in time.

#### Writing The UI for The Voting Screen
