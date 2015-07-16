require("babel/register")({
  stage: 0,
  optional: ['es7.asyncFunctions']
});

global.expect = require('chai').expect;