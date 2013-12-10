var fs        = require('fs')
  , path      = require('path')
  , XmlStream = require('xml-stream')
  ;

// Create a file stream and pass it to XmlStream
var stream = fs.createReadStream(path.join(__dirname, 'whole/vm20131128.xml'));
var xml = new XmlStream(stream);

var multiTags = ['VOLNEMISTO', 'KONOS'];

var xmlpath = [];
var analyze = {};
var nodeStack = [];
var currentNode;

xml.on('startElement', function(tagname, attribs) {

	console.log('Start1', tagname);

	var prevNode = nodeStack[nodeStack.length-1];

	currentNode = {};
	nodeStack.push(currentNode);

	xmlpath.push(tagname);
	var path = xmlpath.join('/');
	analyze[path] = analyze[path] ? analyze[path] + 1 : 1;
	Object.keys(attribs).forEach(function(key) {
		currentNode[key] = attribs[key];

		var attrPath = path + '#' + key;
		analyze[attrPath] = analyze[attrPath] ? analyze[attrPath] + 1 : 1;
	});

	if (prevNode) {
		console.log(tagname, 'OJ', multiTags.indexOf(tagname), prevNode);
		if (multiTags.indexOf(tagname) === -1) {
			console.log('HU');
			console.log(tagname, 'oce');
			if (typeof(prevNode[tagname]) !== 'unedfined') {
				console.log(tagname, 'FUU');
				throw new Error('Multiple, but single expected: ' + tagname);
				console.log(tagname, 'OIU');
			} else {
				console.log(tagname, 'QUA');
				prevNode[tagname] = currentNode;
				console.log(tagname, 'HUU');
			}
		} else {
			console.log(tagname, 'mul');
			if (typeof(prevNode[tagname]) !== 'unedfined') {
				console.log(tagname);
				console.log(typeof(prevNode[tagname]));
				console.log(tagname, 'MEE');
				prevNode[tagname].push(currentNode);
			} else {
				console.log(tagname, 'BUU');
				prevNode[tagname] = [currentNode];
			}
		}
	}

	console.log('Start2', tagname);
});

xml.on('updateElement', function(tagname, attribs) {
	console.error("UNEXPECTED: updateElement", arguments);
});

xml.on('endElement', function(tagname){
	console.log('End1', tagname);
	var actualClose = xmlpath.pop();
	if (tagname !== actualClose)
	console.error('UNEXPECTED CLOSE: ' + tagname);

	currentNode = nodeStack.pop();
	//console.log(currentNode);
	console.log('End2', tagname);
});

xml.on('end', function(){
	console.log(currentNode);
});
