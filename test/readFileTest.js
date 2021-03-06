const electron = require("electron");
var expect = require("chai").expect;
const fs = require("fs");

var Application = require("spectron").Application;
var assert = require("assert");

describe("application launch", function() {
  this.timeout(10000);

  beforeEach(function() {
    this.app = new Application({
      path: `${__dirname}/../node_modules/.bin/electron`,
      args: ["main.js"]
    });
    return this.app.start();
  });

  afterEach(function() {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("should load text from the file into our window", function(){
    return this.app.client
      .waitUntilWindowLoaded()
      .leftClick('#load-button')
      .getText('#editor')
      .then(text => expect(text).to.eq('This is a test.'))
  })
});
