
var fs = require('fs');
var path = require('path');
var XmlStream = require('xml-stream');
var model = require('../../model');


// Create a file stream and pass it to XmlStream
var stream = fs.createReadStream(path.join(__dirname, 'whole/vm20131128.xml'));
var xml = new XmlStream(stream);

var xmlpath = [];
var analyze = {};

xml.on('startElement', function(tagname, attribs) {
	xmlpath.push(tagname);
	var path = xmlpath.join('/');
	analyze[path] = analyze[path] ? analyze[path] + 1 : 1;
	Object.keys(attribs).forEach(function(key) {
		var attrPath = path + '#' + key;
		analyze[attrPath] = analyze[attrPath] ? analyze[attrPath] + 1 : 1;
	});
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
	file: function(fileName) {

	}
}