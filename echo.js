#!/usr/bin/env node
'use strict'
require('./helper')

function* echo() {
    // Use 'yield' in here
    // Your implementation here
    let args = yield process.argv
    console.log(args[2])
}

module.exports = echo
