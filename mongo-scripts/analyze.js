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
        var len = val.length;
        emit(prefix + '.' + key, {
          types: 'Array',
          min: len,
          max: len,
          count: 1
        });
        val.forEach(function(val) {
          mapRecurse(prefix + '.' + key, val);
        });
      } else if (typeof val === 'object') {
        emit(prefix + '.' + key, {
          types: [typeName],
          count: 1
        });
        mapRecurse(prefix + '.' + key, val);
      } else {
        emit(prefix + '.' + key, {
          types: [typeName],
          distinct: [val],
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
  var min, max; // undefined, only arrays
  var distinct = [];

  values.forEach(function(val) {
    result = result.concat(val.types);
    count += val.count;
    if (typeof val.min === 'number') {
      if (typeof min === 'undefined' || val.min < min) min = val.min;
      if (typeof max === 'undefined' || val.max > max) max = val.max;
    }
    if (val.distinct)
      distinct = Array.unique(distinct.concat(val.distinct));
  });

  var result = {
    types: Array.unique(result),
    count: count,
  }

  if (typeof min !== 'undefined') {
    result.min = min;
    result.max = max;
  }

  if (distinct)
    result.distinct = distinct;

  return result;
};

var result = vm.mapReduce(map, reduce, {
  out: {
    inline: true,
  }
});

result.results.forEach(function(val) {
  print(val._id);
  print('  types:\t' + val.value.types.join());
  if (typeof val.value.min !== 'undefined') {
    print('  min:\t' + val.value.min + '\tmax:\t' + val.value.max);
  }
  if (val.value.distinct) {
    if (val.value.distinct.length < 15) {
      print('  enum:\t"' + val.value.distinct.join('", "') + '"');
    } else {
      print('  distinct:\t' + val.value.distinct.length);
    } 
  }
});

