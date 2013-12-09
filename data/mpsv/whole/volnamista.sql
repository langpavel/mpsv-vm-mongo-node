TEMPLATE `CISELNIK` (
	`kod` INT UNSIGNED PRIMARY OR INDEX,
	`nazev` VARCHAR,
);

-- VOLNEMISTO: 15884
-- 	-uid: required
-- 	-celkemVm: required
-- 	-zmena: required
-- 	-jakKontaktovat: required
-- 	-autor: required
-- 	-vyraditDne: 8386
-- 	-www: 885
CREATE TABLE `volneMisto` (
	`uid` BIGINT PRIMARY,
	`celkemVm` +SMALLINT DEFAULT 1,
	`jakKontaktovat` SMALLINT UNSIGNED CAN BE ENUM,
	`autor` UNKNOWN ENUM (TINYINT),
	`vyraditDne` TIMESTAMP,
	`www` VARCHAR(180) OPTIONAL,

	`profese` FOREIGN `profese` SHOULD BE NOT NULL,

	`zmena` TIMESTAMP NOT NULL DEFAUL CURRENT_TIMESTAMP
);

CREATE TABLE `profese` AS `ciselnik` (
);

	PROFESE: required ciselnik(kod+nazev)
		-doplnek: 14893
	FIRMA: 15429
		-nazev: required
		-ic: 15427
		-www: 373
	SMENNOST: required ciselnik(kod+nazev)
	MIN_VZDELANI: required ciselnik(kod+nazev)
	UVAZEK: required ciselnik(kod+nazev)
	PRACPRAVNI_VZTAH: required ciselnik(kod+nazev)
	KONOS: 15426
		-jmeno: 13201
		-prijmeni: required
		-telefon: 12736
		-email: 12038
		-titul: 2695
		-adresa: 1833
		-titulZa: 160
	PRACOVISTE: required
		-okresKod: required
		-okres: required
		-obec: required
		-cobce: 14054
		-ulice: 12356
		-cp: 15177
		-co: 5518
		-psc: 15322
		-posta: 14880
		-nazev: 13807
	MZDA: required
		-min: required
		-max: 7133
	PRAC_POMER: required
		-od: required
		-do: 2544
	VHODNE_PRO: required
		-absolventySs: required
		-absolventyVs: required
		-ozp: required
		-bezbar: required
		-cizince: required
	POZNAMKA: 15479
	URAD_PRACE: required ciselnik(kod+nazev)
	ZELENE_KARTY: required
		-pocetVmProZk: required
		-typZk: required
		-klicovyPersonal: required
		-celkemVmProZk: required
		-vmRezervProZk: required
		-vmRezervProPodanZk: required
		-vmRezervProVyhovZk: required
		-vmRezervProVydanZk: required
	MODRE_KARTY: required
		-pocetVmProMk: required
		-celkemVmProMk: required
		-vmRezervProMk: required
		-vmRezervProPodanMk: required
		-vmRezervProVyhovMk: required
		-vmRezervProVydanMk: required
	OBOR: 20330 ciselnik(kod+nazev)
	DOVEDNOST: 3068 ciselnik(kod+nazev)
		-popis: 404
	JAZYK: 1731 ciselnik(kod+nazev)
		-urovenKod: required
		-uroven: required
		-popis: 336
	VZDELANI: 344 ciselnik(kod+nazev)
	VYHODA: 1510 ciselnik(kod+nazev)
		-popis: 675
	POVOLANI: 292 ciselnik(kod+nazev)
		-praxe: 260
