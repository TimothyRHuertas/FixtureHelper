require('core-js/es5');
var FixtureHelper = require("../../index.js"),
  chai = require('chai'),
  assert = chai.assert, 
  Sinon = require("sinon");

describe("When using the FixtureHelper", (() => {
  var server,
  testURL = "/path/to/someJSON?q=notSuperman";

  beforeEach(() => {
    //you are still responsible for managing sinon's fake server lifecycle
    server = Sinon.fakeServer.create();
  });

  afterEach(() => {
    server.restore();
  });

  describe("when a get request is issued", (() => {
    var xhr;

    beforeEach(() => {
      xhr = new XMLHttpRequest();
      xhr.open("GET", testURL, true);
      xhr.send(null);
      FixtureHelper.respondToJSON(server, testURL, "TestFixture");
    });

    it("responds with the content of fixture file", (()=> {
      var expectedResponseText = '{"name": "Peter Parker", "job": "Spider Man"}'
      assert.equal(xhr.responseText, expectedResponseText);
    }));
  }));
  
}));