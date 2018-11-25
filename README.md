## FundsKeeper

This is Vue.js2 app (!only front-end. Backend here just imitate real backend that will work on RubyOnRails) with Auth0 JWT Authentication that helps you keeps your money.

## Installation

```bash

# Get the project
git clone git@github.com:dimabranik/funds-keeper.git


# Change directory
cd funds-keeper


# Make pre-installations
brew install node


# Install the dependencies
npm install

npm install -g @vue/cli

npm install jwt-decode auth0-js --save

npm install vue-resource --save

npm install vue-router --save

npm install axios --save


# Run your app
node server/server.js

npm run dev

# Your app is running on localhost:8080 