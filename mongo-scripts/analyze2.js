print("Variety: A MongoDB Schema Analyzer")
print("Version 1.2.4, released 05 December 2013")
print("========================================")

var dbs = new Array();
var emptyDbs = new Array();

var db = db.getMongo().getDB('changejob');
var vm = db.mpsvvm;

var map = function() {
	var mapRecurse = function(prefix, obj) {
		var keys = Object.keys(obj);
		var i, l = keys.length;
		for(i = 0; i < l; i++) {
			var key = keys[i];
			var val = obj[key];
			var typeName = Object.prototype.toString.call(val);
			typeName = typeName.substr(8, typeName.length - 9);
			if (Array.isArray(val)) {
				val.forEach(function(val) {
					mapRecurse(prefix + '.' + key, val);
				});
			} else if (typeof val === 'object') {
				mapRecurse(prefix + '.' + key, val);
			} else {
				emit(prefix + '.' + key, {
					types: [typeName],
					count: 1
				});
			}
		}
	};

	mapRecurse('vm', this);
};

var reduce = function(key, values) {
	var result = [];
	var count = 0;
	values.forEach(function(val) {
		result = result.concat(val.types);
		count += val.count;
	});

	return {
		types: Array.unique(result),
		count: count
	}
};

var result = vm.mapReduce(map, reduce, {
	out: {
		inline: true,
	}
});

result.results.forEach(function(val) {
	print(val._id + '\n  types:\t' + val.value.types.join() + '\n  count:\t' + val.value.count);
});

