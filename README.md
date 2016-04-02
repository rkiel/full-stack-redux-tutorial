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

npm install --save redux


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
