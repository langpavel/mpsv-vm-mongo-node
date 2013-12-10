var fs        = require('fs')
  , path      = require('path')
  , XmlStream = require('xml-stream')
  ;

// Create a file stream and pass it to XmlStream
var stream = fs.createReadStream(path.join(__dirname, 'whole/vm20131128.xml'));
var xml = new XmlStream(stream);

var xmlpath = [];
var analyze = {};


var Element = function(parent, name, attrs) {
	this.parent = parent;
	this.name = name;
	Object.keys(attrs).forEach(function(name) {
		this.setAttribute(name, attrs[name]);
	});
};


Element.prototype.setAttribute = function(name , value) {
	this[name] = value;
};


Element.prototype.addChild = function(element) {
	if (element.name
};

var createElement = function(name, attrs) {
	return new Element(name, attrs);
}

var rootElement;

var elementFactory = {
	'VOLNAMISTA': function(name, attribs) {
		return rootElement = createElement(name, attribs);
	}
}


var currentElement = rootElement;


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