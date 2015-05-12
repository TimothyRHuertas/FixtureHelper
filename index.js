"use strict";

var Sinon = require("sinon");
require("babel/polyfill");
Sinon.FakeXMLHttpRequest.useFilters = true;
Sinon.FakeXMLHttpRequest.addFilter(((method, url) => {
    return !!url.match(/^\/base\/test\/fixtures\//);
}));

module.exports =  {
    loadFixtureJSON(name){
        var url = `/base/test/fixtures/${name}.json`;
        var responseJSON;
        var request = new XMLHttpRequest();
        request.open('GET', url, false);  // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) {
          responseJSON = request.responseText;
        }

        return responseJSON;
    },
    respondToJSON(server, url, fixtureName){
        var request;

        //I don't want to include a polyfill for just the find method
        server.requests.some(r => {
            if(r.url === url){
                request = r;
                return true;
            }

            return false;
        });

        if(request){
            var responseJSON = this.loadFixtureJSON(fixtureName);
            request.respond(
                200,
                { "Content-Type": "application/json" },
                responseJSON
            );
        }
        else {
            throw new Error(`Request for url (${url}) not found`);
        }
    }
};