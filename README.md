es7-module-boilerplate
===================

A simple starting point for writing ES2015/ES7 Node modules. The project includes Babel (and babel-runtime) for compiling next-gen Javascript, as well as Mocha and Chai for testing. 

##Usage

First write some tests in the `./test` directory, then write your module code in `./src` to make them pass:
```
$ npm test
```

The tests are run through Babel at runtime - so you can write all the next-gen Javascript you want and not worry about it!

##Publishing

Once you're ready to publish your module, you'll need to compile it to vanilla Javascript with our build step:
```
$ npm run build
```

That will compile your module files and place them into the `./lib` directory. From there, you can publish your module to NPM:
```
$ npm publish
```
The above step will automatically run `npm run build` as well. 
