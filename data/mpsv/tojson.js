var fs = require('fs'),
	path = require('path'),
	xml2js = require('xml2js');

var options = {
	normalizeTags: true,
	mergeAttrs: true,
	explicitArray: false
};

var parser = new xml2js.Parser(options);
fs.readFile(path.join(__dirname, 'whole', 'vm20131128.xml'), { encoding: 'utf8' }, function(err, data) {
	if (err) throw err;

	console.log('readed, now parsing');

	parser.parseString(data, function (err, result) {
		if (err) throw err;

		console.log('parsed, now making JSON');

		var json = JSON.stringify(result, null, 2);
		fs.writeFileSync(path.join(__dirname, 'vm20131128.json'), json, 'utf8');

		console.log('done');
	});
});