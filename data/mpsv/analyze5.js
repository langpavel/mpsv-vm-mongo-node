var fs        = require('fs')
  , path      = require('path')
  , XmlStream = require('xml-stream')
  ;

// Create a file stream and pass it to XmlStream
var stream = fs.createReadStream(path.join(__dirname, 'whole/vm20131128.xml'));
var xml = new XmlStream(stream);


var root = null;
var current = null;
var stack = [];


var mapAsArray = []; // ['VOLNEMISTO'];


var Node = function(name, attrs) {
	var self = this;
	//self.name = name;
	if (attrs) {
		Object.keys(attrs).forEach(function(name) {
			if ((typeof self[name]) !== 'undefined')
				throw new Error('Duplicate attribute?!?');
			self[name] = attrs[name];
		});
	}
};

//Node.prototype.onClose = function(el) {
//	console.log('close '+el);
//}


var createObject = function(parent, name, attrs) {
	//console.log(parent, name, attrs);
	var node = new Node(name, attrs);
	if (!root)
		root = node;

	if (parent) {
		console.log(mapAsArray.indexOf(name), name, typeof(parent[name]));
		if (mapAsArray.indexOf(name) >= 0) {
			console.log('there');
			if (typeof(parent[name]) !== 'undefined') {
				parent[name].push(node);
			} else {
				parent[name] = [node];
			}
		} else {
			console.log('tam');
			if (typeof(parent[name]) !== 'undefined') {
				throw new Error('Only once allowed: ' + name);
			} else {
				parent[name] = node;
				console.log('single')
			}
		}
	}

	return node;
};

var xmlpath = [];
//var analyze = {};

xml.on('startElement', function(tagname, attrs) {
	//xmlpath.push(tagname);
	var path = xmlpath.join('/');
	console.log('+ '+path);

	current = createObject(current, tagname, attrs);
	stack.push(current);

	//analyze[path] = analyze[path] ? analyze[path] + 1 : 1;
	//Object.keys(attrs).forEach(function(key) {
	//	var attrPath = path + '#' + key;
	//	analyze[attrPath] = analyze[attrPath] ? analyze[attrPath] + 1 : 1;
	//});
});

xml.on('updateElement', function(tagname, attribs) {
	console.error("UNEXPECTED: updateElement", arguments);
	//current.onUpdate && current.onUpdate.apply(current)
});

xml.on('endElement', function(tagname){
	var path = xmlpath.join('/');
	console.log('- '+path);

	var current = stack.pop();
	if (!current)
		throw new Error('Unexpected close of ' + tagname);
	current.onClose && current.onClose(tagname);

	//var actualClose = xmlpath.pop();
	//if (tagname !== actualClose)
	//	console.error('UNEXPECTED CLOSE: ' + tagname);
});

xml.on('end', function(){
	//console.log(analyze);
	console.log(root);
});

