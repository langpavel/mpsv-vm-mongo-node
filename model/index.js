
var debug = require('debug')('model');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/changejob');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	debug('MongoDB open');
});


var schematas = {
	volneMisto: require('./volneMistoSchemas'),
};


var models = {};
Object.keys(schematas).forEach(function(schemasName) {
	var submodel = models[schemasName] = {};
	var schemas = schematas[schemasName];
	Object.keys(schematas[schemasName]).forEach(function(schemaName) {
		submodel[schemaName] = mongoose.model(schemaName, schemas[schemaName]);
	});
});


module.exports = {
	connection: db,
};
