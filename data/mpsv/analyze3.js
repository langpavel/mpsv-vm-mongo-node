var fs        = require('fs')
  , path      = require('path')
  , XmlStream = require('xml-stream')
  ;

// Create a file stream and pass it to XmlStream
var stream = fs.createReadStream(path.join(__dirname, 'whole/vm20131128.xml'));
var xml = new XmlStream(stream);

var xmlpath = [];
var analyze = {};

var root = {};

// throw generic error
var factoryError = function(message, args) {
	var argstr = [].slice.call(args).map(function(x) { return "'" + x + "'"}).join(', ');
	throw new Error(argstr);
};

// function generators
var ignore = null;




var attrib = function(name) {
	return function(parent, value) {
		if (typeof(parent[name]) !== 'undefined')
			factoryError('attrib rewrite', arguments);

		parent[name] = value;
		return current;
	}
};

var elementArray = function() {

};

var trans = {
	'VOLNAMISTA': function() { return root; },
	'VOLNAMISTA[xmlns:xsi]': ignore,
	'VOLNAMISTA[xmlns]': ignore,
	'VOLNAMISTA[xsi:schemaLocation]': ignore,
	'VOLNAMISTA[aktualizace]': ignore,
	'VOLNAMISTA[verze]': ignore,
	'VOLNAMISTA[detailvm]': ignore,
	'VOLNAMISTA/VOLNEMISTO': elementArray('volnaMista'),
	'VOLNAMISTA/VOLNEMISTO[uid]': attrib,
	'VOLNAMISTA/VOLNEMISTO[celkemVm]': attrib('celkemVm'),
	'VOLNAMISTA/VOLNEMISTO[zmena]': attrib('zmena'),
	'VOLNAMISTA/VOLNEMISTO[jakKontaktovat]': attrib('jakKontaktovat'),
	'VOLNAMISTA/VOLNEMISTO[autor]': attrib('autor'),
	'VOLNAMISTA/VOLNEMISTO/PROFESE': function() {},
	'VOLNAMISTA/VOLNEMISTO/PROFESE[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/PROFESE[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/PROFESE[doplnek]': attrib('doplnek'),
	'VOLNAMISTA/VOLNEMISTO/FIRMA': function() {},
	'VOLNAMISTA/VOLNEMISTO/FIRMA[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/FIRMA[ic]': attrib('ic'),
	'VOLNAMISTA/VOLNEMISTO/SMENNOST': function() {},
	'VOLNAMISTA/VOLNEMISTO/SMENNOST[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/SMENNOST[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/MIN_VZDELANI': function() {},
	'VOLNAMISTA/VOLNEMISTO/MIN_VZDELANI[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/MIN_VZDELANI[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/UVAZEK': function() {},
	'VOLNAMISTA/VOLNEMISTO/UVAZEK[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/UVAZEK[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/PRACPRAVNI_VZTAH': function() {},
	'VOLNAMISTA/VOLNEMISTO/PRACPRAVNI_VZTAH[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/PRACPRAVNI_VZTAH[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/KONOS': function() {},
	'VOLNAMISTA/VOLNEMISTO/KONOS[jmeno]': attrib('jmeno'),
	'VOLNAMISTA/VOLNEMISTO/KONOS[prijmeni]': attrib('prijmeni'),
	'VOLNAMISTA/VOLNEMISTO/KONOS[telefon]': attrib('telefon'),
	'VOLNAMISTA/VOLNEMISTO/KONOS[email]': attrib('email'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE': function() {},
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[okresKod]': attrib('okresKod'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[okres]': attrib('okres'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[obec]': attrib('obec'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[cobce]': attrib('cobce'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[ulice]': attrib('ulice'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[cp]': attrib('cp'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[co]': attrib('co'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[psc]': attrib('psc'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[posta]': attrib('posta'),
	'VOLNAMISTA/VOLNEMISTO/PRACOVISTE[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/MZDA': function() {},
	'VOLNAMISTA/VOLNEMISTO/MZDA[min]': attrib('min'),
	'VOLNAMISTA/VOLNEMISTO/MZDA[max]': attrib('max'),
	'VOLNAMISTA/VOLNEMISTO/PRAC_POMER': function() {},
	'VOLNAMISTA/VOLNEMISTO/PRAC_POMER[od]': attrib('od'),
	'VOLNAMISTA/VOLNEMISTO/VHODNE_PRO': function() {},
	'VOLNAMISTA/VOLNEMISTO/VHODNE_PRO[absolventySs]': attrib('absolventySs'),
	'VOLNAMISTA/VOLNEMISTO/VHODNE_PRO[absolventyVs]': attrib('absolventyVs'),
	'VOLNAMISTA/VOLNEMISTO/VHODNE_PRO[ozp]': attrib('ozp'),
	'VOLNAMISTA/VOLNEMISTO/VHODNE_PRO[bezbar]': attrib('bezbar'),
	'VOLNAMISTA/VOLNEMISTO/VHODNE_PRO[cizince]': attrib('cizince'),
	'VOLNAMISTA/VOLNEMISTO/POZNAMKA': function() {},
	'VOLNAMISTA/VOLNEMISTO/URAD_PRACE': function() {},
	'VOLNAMISTA/VOLNEMISTO/URAD_PRACE[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/URAD_PRACE[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY': function() {},
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[pocetVmProZk]': attrib('pocetVmProZk'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[typZk]': attrib('typZk'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[klicovyPersonal]': attrib('klicovyPersonal'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[celkemVmProZk]': attrib('celkemVmProZk'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[vmRezervProZk]': attrib('vmRezervProZk'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[vmRezervProPodanZk]': attrib('vmRezervProPodanZk'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[vmRezervProVyhovZk]': attrib('vmRezervProVyhovZk'),
	'VOLNAMISTA/VOLNEMISTO/ZELENE_KARTY[vmRezervProVydanZk]': attrib('vmRezervProVydanZk'),
	'VOLNAMISTA/VOLNEMISTO/MODRE_KARTY': function() {},
	'VOLNAMISTA/VOLNEMISTO/MODRE_KARTY[pocetVmProMk]': attrib('pocetVmProMk'),
	'VOLNAMISTA/VOLNEMISTO/MODRE_KARTY[celkemVmProMk]': attrib('celkemVmProMk'),
	'VOLNAMISTA/VOLNEMISTO/MODRE_KARTY[vmRezervProMk]': attrib('vmRezervProMk'),
	'VOLNAMISTA/VOLNEMISTO/MODRE_KARTY[vmRezervProPodanMk]': attrib('vmRezervProPodanMk'),
	'VOLNAMISTA/VOLNEMISTO/MODRE_KARTY[vmRezervProVyhovMk]': attrib('vmRezervProVyhovMk'),
	'VOLNAMISTA/VOLNEMISTO/MODRE_KARTY[vmRezervProVydanMk]': attrib('vmRezervProVydanMk'),
	'VOLNAMISTA/VOLNEMISTO/OBOR': function() {},
	'VOLNAMISTA/VOLNEMISTO/OBOR[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/OBOR[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/DOVEDNOST': function() {},
	'VOLNAMISTA/VOLNEMISTO/DOVEDNOST[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/DOVEDNOST[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/JAZYK': function() {},
	'VOLNAMISTA/VOLNEMISTO/JAZYK[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/JAZYK[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/JAZYK[urovenKod]': attrib('urovenKod'),
	'VOLNAMISTA/VOLNEMISTO/JAZYK[uroven]': attrib('uroven'),
	'VOLNAMISTA/VOLNEMISTO[vyraditDne]': attrib('vyraditDne'),
	'VOLNAMISTA/VOLNEMISTO/PRAC_POMER[do]': attrib('do'),
	'VOLNAMISTA/VOLNEMISTO/KONOS[titul]': attrib('titul'),
	'VOLNAMISTA/VOLNEMISTO[www]': attrib('www'),
	'VOLNAMISTA/VOLNEMISTO/KONOS[adresa]': attrib('adresa'),
	'VOLNAMISTA/VOLNEMISTO/JAZYK[popis]': attrib('popis'),
	'VOLNAMISTA/VOLNEMISTO/FIRMA[www]': attrib('www'),
	'VOLNAMISTA/VOLNEMISTO/DOVEDNOST[popis]': attrib('popis'),
	'VOLNAMISTA/VOLNEMISTO/VZDELANI': function() {},
	'VOLNAMISTA/VOLNEMISTO/VZDELANI[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/VZDELANI[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/VYHODA': function() {},
	'VOLNAMISTA/VOLNEMISTO/VYHODA[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/VYHODA[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/VYHODA[popis]': attrib('popis'),
	'VOLNAMISTA/VOLNEMISTO/POVOLANI': function() {},
	'VOLNAMISTA/VOLNEMISTO/POVOLANI[kod]': attrib('kod'),
	'VOLNAMISTA/VOLNEMISTO/POVOLANI[nazev]': attrib('nazev'),
	'VOLNAMISTA/VOLNEMISTO/POVOLANI[praxe]': attrib('praxe'),
	'VOLNAMISTA/VOLNEMISTO/KONOS[titulZa]': attrib('titulZa')
}


xml.on('startElement', function(tagname, attribs) {
	xmlpath.push(tagname);
	var path = xmlpath.join('/');

	var f = factories[path];
	if (f === null)
		throw new Error("Factory not exists: '" + path + "'");

	f();

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