
var xml = require('xml-object-stream');
var path = require('path');
var fs = require('fs');

var useRepl = false;
var outputJson = './whole/vm20131128.json'; // or false;

var readStream = fs.createReadStream(path.join(__dirname, 'whole', 'vm20131128.xml'));
var parser = xml.parse(readStream);

var volnaMista = [];

var convertDate = function(val) {
	return new Date(val);
}

var convertValue = function(val, name, target) {
	if (/^[+-]?\d{1,}$/.test(val))
		return parseInt(val, 10);
	if (/^[+-]?\d+\.\d+$/.test(val))
		return parseFloat(val);
	//2013-10-30T12:19:38.000Z
	if (/^\d\d\d\d-\d\d-\d\d(T\d\d:\d\d:\d\d.\d\d\dZ?)?$/.test(val))
		return new Date(val);
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


parser.each('VOLNEMISTO', function(volneMisto) {
	volnaMista.push(processVolneMisto(volneMisto));
});


parser.on('end', function() {
	console.log('Sorting...');
	// sort descendant
	volnaMista.sort(function(a, b) {
		var an = a.mzda.min || Infinity;
		var ax = a.mzda.max || 0;
		var bn = b.mzda.min || Infinity;
		var bx = b.mzda.max || 0;
		if (an < bn) return 1;
		if (an > bn) return -1;
		if (ax < bx) return -1;
		if (ax > bx) return 1;
		return 0;
	});

	if (outputJson) {
		var p = path.join(__dirname, outputJson);
		console.log('Writing ' + p);
		var json = JSON.stringify(volnaMista, null, "\t");
		fs.writeFileSync(p, json, 'utf-8');
	}
	console.log('DONE');
})


if (useRepl) {
	var repl = require('repl').start({
		useGlobal: true
	});

	repl.context.parser = parser;
	repl.context.volnaMista = volnaMista;
}
