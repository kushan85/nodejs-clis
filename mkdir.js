#!/usr/bin/env node
'use strict'
require('./helper')
let fs = require('fs').promise

function* mkdir() {
    // Use 'yield' in here
    // Your implementation here
    let filepaths = process.argv[2].split('/')
    let filepath = '.'

    for(let i = 1; i < filepaths.length; i++) {
    	try {
    		let stat = yield fs.stat(filepaths[i])
    	} catch (err) {
    		//console.error(err)
    		if(err.code === 'ENOENT') {
    			filepath = filepath + '/' + filepaths[i]
    			//console.log(filepath)
    			yield fs.mkdir(filepath)
    		}
    	}
    }
}

module.exports = mkdir
