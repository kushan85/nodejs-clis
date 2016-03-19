#!/usr/bin/env node
'use strict'
require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require("path")

let isRecursive = (process.argv[3] === '-R') ? true : false

let ls = co.wrap(function*(rootpath) {
  
	// Your implementation here
	let filenames = yield fs.readdir(rootpath)

	for (let file of filenames){
		
		let filePath = path.join(rootpath, file)
		let stat = yield fs.stat(filePath)

		if (!stat.isDirectory()){
			if(rootpath === process.argv[2]) {
				process.stdout.write(file + "\n")	
			} else {
				process.stdout.write(rootpath + '/' + file + "\n")
			}
			
		} else if(isRecursive) {
			// ordering without performance
			yield ls(filePath, filePath)
			// no ordering with performance improvement	
			// ls(filePath, filePath) 
		}
		
	}
})

function* main() {
	yield ls(process.argv[2])
}

module.exports=main