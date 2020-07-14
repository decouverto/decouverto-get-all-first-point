#!/usr/bin/env node
let path = require('path')
let tool = require('./')
date = (new Date()).getTime()
tool.write(path.resolve(__dirname, './result' + date + '.json') , function (err) {
    if (err) {
        console.error('An error occured.')
    } else {
        console.log('File created.')
    }
})