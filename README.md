# Full-Stack Redux Tutorial

#### Notes

The main difference is that in Redux, the application state is all stored in one single tree structure. In other words, everything there is to know about your application's state is stored in one data structure formed out of maps and arrays.

This has many consequences, as we will soon begin to see. One of the most important ones is how this lets you think about the application state in isolation from the application's behavior. The state is pure data. It doesn't have methods or functions. And it isn't tucked away inside objects. It's all in one place.

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


