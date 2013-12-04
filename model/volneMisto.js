
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var CiselnikSchema = function(proto) {
	proto = proto || {};
	proto.kod = proto.kod || { type:Number, required: true, unique: true };
	proto.nazev = proto.nazev || { type:Number, unique: true}
	return Schema(proto);
};


var profeseSchema = CiselnikSchema({

});



var volneMistoSchema = Schema({
	uid: { type: String, required: true, unique: true }, //Schema.Types.ObjectId, // required
	celkemVm: Number,
	zmena: Date,
	jakKontaktovat: Number, // [1..3]
	autor: Number, // [1..2]
	vyraditDne: Date,
	www: String,
})



var VolneMisto = mongoose.model('VolneMisto', volneMistoSchema);



