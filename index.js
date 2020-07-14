#!/usr/bin/env node
var request = require('then-request');
var fs = require('fs');

module.exports = {
    get: function (cb) {
        
        request('GET', 'https://decouverto.fr/walks/index.json').getBody('utf8').then(JSON.parse).done(function (walks) {
            let promises = []     
            walks.forEach(function (w) {
                promises.push(new Promise(function (resolve, reject) {
                    let res = { id: w.id, title: w.title }
                    request('GET', 'https://decouverto.fr/walks/' + w.id + '/index.json').getBody('utf8').then(JSON.parse).done(function (walk) {
                        res.coord = walk.itinerary[0];
                        resolve(res)
                    })
                }));
            })
            Promise.all(promises).then(cb)
        });
    },
    write: function (path,cb) {
        this.get(function (res) {
            fs.writeFile(path, JSON.stringify(res), 'utf8', cb);
        });
    }
}

