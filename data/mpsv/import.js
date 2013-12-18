
var xml = require('xml-object-stream');
var path = require('path');
var fs = require('fs');
var mongo = require('mongodb');

var useRepl = true;
var outputJson = false; // './whole/vm20131128.json'; // or false;

var readStream = fs.createReadStream(path.join(__dirname, 'whole', 'vm20131218.xml'));
var parser = xml.parse(readStream);

var volnaMista = [];

var convertDate = function(val) {
	return new Date(val);
}

var convertValue = function(val, name, target) {
	if (/^[+-]?\d+$/.test(val))
		return parseInt(val, 10);
	if (/^[+-]?\d*\.\d*$/.test(val))
		return parseFloat(val);
	//2013-10-30T12:19:38.000Z
	if (/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d.\d\d\dZ?)?$/.test(val))
		return new Date(val);
	return val;
}

var setText = function(entryName) {
	return function(vm, node) {
		if (!node.$text)
			return;

		if (typeof vm[entryName] !== 'undefined')
			throw new Error('Key already set: ' + entryName);

		vm[entryName] = node.$text;
	}
};

var setAttribs = function(entryName) {
	return function(vm, node) {
		if (typeof vm[entryName] !== 'undefined')
			throw new Error('Key already set: ' + entryName);
		vm[entryName] = {};
		Object.keys(node.$).forEach(function(attrName){
			vm[entryName][attrName] = convertValue(node.$[attrName]);
		});
		if (node.$text)
			vm[entryName].textContent = convertValue(node.$text);
	}
};

var setAttribsArray = function(entryName) {
	return function(vm, node) {
		if (typeof vm[entryName] === 'undefined')
			vm[entryName] = [];
		var item = {};
		Object.keys(node.$).forEach(function(attrName){
			item[attrName] = convertValue(node.$[attrName]);
		});
		if (node.$text)
			item.textContent = convertValue(node.$text);
		vm[entryName].push(item);
	}
};

var converters = {
	'PROFESE': setAttribs('profese'),
	'FIRMA': setAttribs('firma'),
	'SMENNOST': setAttribs('smennost'),
	'MIN_VZDELANI': setAttribs('minVzdelani'),
	'UVAZEK': setAttribs('uvazek'),
	'PRACPRAVNI_VZTAH': setAttribs('pracpravni_vztah'),
	'KONOS': setAttribs('konos'),
	'PRACOVISTE': setAttribs('pracoviste'),
	'MZDA': setAttribs('mzda'),
	'PRAC_POMER': setAttribs('pracovniPomer'),
	'VHODNE_PRO': setAttribs('vhodnePro'),
	'POZNAMKA': setText('poznamka'),
	'URAD_PRACE': setAttribs('uradPrace'),
	'ZELENE_KARTY': setAttribs('zeleneKarty'),
	'MODRE_KARTY': setAttribs('modreKarty'),
	'OBOR': setAttribsArray('obor'),
	'DOVEDNOST': setAttribsArray('dovednosti'),
	'JAZYK': setAttribsArray('jazyky'),
	'VZDELANI': setAttribsArray('vzdelani'),
	'VYHODA': setAttribsArray('vyhody'),
	'POVOLANI': setAttribsArray('povolani'),
};


var processVolneMisto = function(node) {
	var vm = {};
	Object.keys(node.$).forEach(function(name){
		var val = node.$[name];
		switch(name) {
			case 'zmena':
				vm[name] = convertDate(val);
				break;
			default:
				vm[name] = val;
		}
	})

	node.$children.forEach(function(child) {
		var converter = converters[child.$name];
		if (!converter)
			throw new Error('Converter not found: ' + child.$name);
		converter(vm, child);
	});

	if (node.$text) {
		var text = node.$text.trim();
		if (text)
			vm.popis = node.$text;
	}

	//vm.source = node;

	return vm;
};


var startRepl = function(context) {
	var repl = require('repl').start({
		useGlobal: true
	});

	repl.context.parser = parser;
	repl.context.volnaMista = volnaMista;
	Object.keys(context).forEach(function(name) {
		repl.context[name] = context[name];
	})
}


parser.each('VOLNEMISTO', function(volneMisto) {
	volnaMista.push(processVolneMisto(volneMisto));
});


var importMongo = function() {
	mongo.MongoClient.connect('mongodb://127.0.0.1:27017/changejob', {}, function(err, db) {
		if (err) throw err;

		console.log('mongo db opened as db, collection as col');

		var col = db.collection('mpsvvm');

		col.drop();

		volnaMista.forEach(function(vm) {
			col.insert(vm, function(err) {
				if (err)
					process.stderr.write('x');
				else
					process.stderr.write('.');
			});
		});

		if (useRepl) {
			startRepl({
				db: db,
				collection: col,
			});
		} else {
			db.close();
			process.exit(0);
		}
	});
};


parser.on('end', function() {
	if (outputJson) {
		var p = path.join(__dirname, outputJson);
		console.log('Writing ' + p);
		var json = JSON.stringify(volnaMista, null, "\t");
		fs.writeFileSync(p, json, 'utf-8');
	}
	console.log('Connecting DB...');
	importMongo();
})


