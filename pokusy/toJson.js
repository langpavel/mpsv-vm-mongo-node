var fs = require('fs');
var path = require('path');
var XmlStream = require('xml-stream');
//var model = require('../model');


// Create a file stream and pass it to XmlStream
var stream = fs.createReadStream(path.join(__dirname, '../data/mpsv/files/vm20131205.xml'));
var xml = new XmlStream(stream);


function Entity = function(name, parent, attrs) {
	if (parent)
		this.parents = [parent];
	else
		this.parents = [];

	this.attributes = attrs;
	this.childs = [];
}


Entity.prototype.toJSON = function() {
	return {

	};
}

var xmlStack = [];


// mapping tagName -> object
var elementMapping = {};
var currentElement = null;


xml.on('startElement', function(tagname, attribs) {
	var el = {};
	elements.push();
});

xml.on('updateElement', function(tagname, attribs) {
	console.error("UNEXPECTED: updateElement", arguments);
});

xml.on('endElement', function(tagname){
	var actualClose = xmlpath.pop();
	if (tagname !== actualClose)
	console.error('UNEXPECTED CLOSE: ' + tagname);
});

xml.on('end', function(){
	console.log(analyze);
})

module.exports = {
	data: data
}