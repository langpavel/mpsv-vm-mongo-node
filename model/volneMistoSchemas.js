
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var CiselnikSchema = function(proto) {
	proto = proto || {};
	proto.kod = proto.kod || { type:Number, required: true, unique: true };
	proto.nazev = proto.nazev || { type:Number, unique: true}
	return Schema(proto);
};


var schemas = {
	Dovednost: CiselnikSchema(),
	Jazyk: CiselnikSchema(),
	MinVzdelani: CiselnikSchema(),
	Obor: CiselnikSchema(),
	Povolani: CiselnikSchema(),
	PracpravniVztah: CiselnikSchema(),
	Profese: CiselnikSchema(),
	Smennost: CiselnikSchema(),
	UradPrace: CiselnikSchema(),
	Uvazek: CiselnikSchema(),
	Vyhoda: CiselnikSchema(),
	Vzdelani: CiselnikSchema(),
}

schemas.Firma = Schema({
	nazev: { type: String, required: true },
	ic: { type: String },
	www: String
});


schemas.VolneMisto = Schema({
	uid: { type: String, required: true, unique: true }, //Schema.Types.ObjectId, // required
	celkemVm: Number,
	zmena: Date,
	jakKontaktovat: Number, // [1..3]
	autor: Number, // [1..2]
	vyraditDne: Date,
	www: String,

	profese: {
		// Profese
		ref: Schema.Types.ObjectId,
		doplnek: String
	},

	firma: {
		ref: Schema.Types.ObjectId,
	},

	smennost: {
		// Smennost
		ref: Schema.Types.ObjectId,
	},

	minVzdelani: {
		// MinVzdelani
		ref: Schema.Types.ObjectId,
	},

	uvazek: {
		// Uvazek
		ref: Schema.Types.ObjectId,
	},

	pracpravniVztah: {
		// PracpravniVztah
		ref: Schema.Types.ObjectId,
	},

	konOs: {
		jmeno: String,
		prijmeni: String,
		telefon: String,
		email: String,
		titul: String,
		adresa: String,
		titulZa: String,
	},

	pracoviste: {
		okresKod: String, // required
		okres: String, // required
		obec: String, // required
		cobce: String, // 14054
		ulice: String, // 12356
		cp: String, // 15177
		co: String, // 5518
		psc: String, // 15322
		posta: String, // 14880
		nazev: String, // 13807
	},

	mzda: {
		min: Number,
		max: Number,
	},

	pracPomer: {
		od: { type: Date, required: true },
		do: Date,
	},

	vhodnePro: [String],

	poznamka: String,

	uradPrace: {
		// UradPrace
		ref: Schema.Types.ObjectId,
	},

	zeleneKarty: {
		pocetVmProZk: Number,
		typZk: String,
		klicovyPersonal: String,
		celkemVmProZk: Number,
		vmRezervProZk: Number,
		vmRezervProPodanZk: Number,
		vmRezervProVyhovZk: Number,
		vmRezervProVydanZk: Number,
	},

	modreKarty: {
		pocetVmProMk: Number,
		celkemVmProMk: Number,
		vmRezervProMk: Number,
		vmRezervProPodanMk: Number,
		vmRezervProVyhovMk: Number,
		vmRezervProVydanMk: Number,
	},

	obor: {
		// Obor
		ref: Schema.Types.ObjectId,
	},

	dovednost: {
		// Dovednost
		ref: Schema.Types.ObjectId,
		popis: String,
	},

	jazyk: {
		// Jazyk
		ref: Schema.Types.ObjectId,
		uroven: [String],
		popis: String,
	},

	vzdelani: {
		// Vzdelani
		ref: Schema.Types.ObjectId,
	},

	vyhoda: {
		// Vyhoda
		ref: Schema.Types.ObjectId,
		popis: String,
	},

	povolani: {
		// Povolani
		ref: Schema.Types.ObjectId,
		praxe: Number, // in years
	},

})


module.exports = schemas;


