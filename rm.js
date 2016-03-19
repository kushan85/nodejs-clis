#!/usr/bin/env node
'use strict'
require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require("path")

let rm = co.wrap(function*(rootpath) {	
	let rootStat = yield fs.stat(rootpath)
	if(!rootStat.isDirectory()) {
		yield fs.unlink(rootpath)
		return
	}

	let filenames = yield fs.readdir(rootpath)
	for(let file of filenames) {
		let filepath = path.join(rootpath, file)
		let stat = yield fs.stat(filepath)
		if(stat.isDirectory()) {
			yield rm(filepath)
		} else {
			console.log('Removed ' + filepath)
			yield fs.unlink(filepath)
		}
	}
	console.log('Removed ' + rootpath)
	yield fs.rmdir(rootpath);
})

function* main() {
	yield rm(process.argv[2])
}

module.exports = main
