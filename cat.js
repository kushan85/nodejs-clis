#!/usr/bin/env node
'use strict'
require('./helper')
let fs = require('fs').promise

function* cat() {
    // Use 'yield' in here
    // Your implementation here
    console.log(yield fs.readFile(process.argv[2], 'utf8', console.log))
}

module.exports = cat
