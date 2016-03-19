#!/usr/bin/env node
'use strict'
require('./helper')
let fs = require('fs').promise

function* touch() {

	let fd = yield fs.open(process.argv[2], 'r')
	let date = new Date();
	let datetime = date.getTime()/1000;
	yield fs.futimes(fd, datetime, datetime);
}

module.exports=touch