/*The MIT License

Copyright (c) 2012 Comfirm <http://www.comfirm.se/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

var Comfirm = Comfirm || {};
Comfirm.AlphaMail = Comfirm.AlphaMail || {};

var Verimail = Comfirm.AlphaMail.Verimail = function(options){
    // Set default options
    this.options = {
        // Service url
        url: "http://jsapi.comfirm.se/verify/v1/",
        // Authentication token.. Leave empty for client-side only validation.
        token: null,
        // Fore emails to require a valid TLD
        enforceTld: true,
        // Deny users from using a temp email domain (e.g. mailinator.com)
        denyTempEmailDomains: false,
        // Language to use (currently supported, [en, sv])
        language: 'en',
        // Determines whether or not messages are in HTML or just Plain Text
        richTextMessages: true,
        // Distance function (leave empty for default: levenshtein)
        distanceFunction: null
    };

    // Copy over existing options
    for (key in options) {
        if (options.hasOwnProperty(key)) {
            this.options[key] = options[key];
        }
    }

    // Set the language, default to english if non-existing
    this.setLanguage(this.options.language, 'en');

    // Temporary..
    this.Service = {};
    this.Service.verify = function(email, onStatusUpdate){
        //setTimeout(1000 * 3, function(){
            onStatusUpdate(Verimail.Status.CorrectSyntax, "It looks OK!");
        //});
    };
};

// Email status codes
Verimail.Status = {
    // Unable to connect to MX servers
    MxServerDownError: -7,
    // Domain does not have any MX records
    MissingMxRecordsError: -6,
    // Domain does not exist
    DomainError: -5,
    // The email domain is blocked.
    BlockedError: -4,
    // The email format is OK, but a part of the syntax is wrong.
    InvalidPart: -3,
    // The email is incorrectly formatted.
    SyntaxError: -2,
    // The email is empty.
    EmptyError: -1,
    // The email syntax is correct.
    CorrectSyntax: 0,
    // Waiting for an external service to resolve the status of the email.
    Pending: 1,
    // The mail server reported that the email exists.
    EmailExists: 2,
    // The email is registered and active on social networks
    EmailExistsOnSocialNetworks: 3,
    // Unable to verify the email, but server has an accept all policy
    AcceptAllPolicy: 4
};

// Localization
Verimail.Language = {
    en: {
        success: "Email looks OK",
        typo: "Did you mean <span class='suggestion'>%s</span>?",
        invalidTld: "Top level domain <span class='tld'>%s</span> does not exist",
        domainBlocked: "Domain <span class='blocked'>%s</span> is not allowed",
        invalidFormat: "Email is not correctly formatted",
        empty: "Email is empty"
    },
    sv: {
        success: "E-postadressen är godkänd",
        typo: "Menade du <span class='suggestion'>%s</span>?",
        invalidTld: "Toppdomänen <span class='tld'>%s</span> existerar inte",
        domainBlocked: "Domänen <span class='domain'>%s</span> är inte tillåten",
        invalidFormat: "Ogiltig e-postadress",
        empty: "E-postadressen är tom"
    },
    ee: {
        success: "E-maili aadress on korrektne",
        typo: "Kas pidasite silmas <span class='suggestion'>%s</span>?",
        invalidTld: "Tippdomeeni <span class='tld'>%s</span> ei eksisteeri",
        domainBlocked: "Domeen <span class='domain'>%s</span> ei ole lubatud",
        invalidFormat: "Emaili aadress on vigane",
        empty: "Emaili väli oli tühi"
    }
};

// Table of the most common email domains
Verimail.MostCommonEmailDomains = {
    "gmail.com":null, "msn.com":null, "hotmail.com":null, "hotmail.co.uk":null,
    "yahoo.com":null, "yahoo.co.uk":null, "facebook.com":null, "live.com":null,
    "mail.com":null, "gmx.com":null, "aol.com":null, "verizon.net":null, "comcast.net":null,
    "googlemail.com":null, "att.net":null, "mail.com":null, "mac.com":null, "mail.ee":null,
    "rocketmail.com":null, "ymail.com":null, "hot.ee":null, "suhtlus.ee":null
};

// Table of the most common TLDs according to Google
// Reference http://www.seobythesea.com/2006/01/googles-most-popular-and-least-popular-top-level-domains/
Verimail.MostCommonTlds = {
    com:null, org:null, edu:null, gov:null, uk:null, net:null,
    ca:null, de:null, jp:null, fr:null, au:null, us:null, ru:null,
    ch:null, it:null, nl:null, se:null, dk:null, no:null, es:null, mil:null
};

// Table of all TLDs registered by IANA
// http://data.iana.org/TLD/tlds-alpha-by-domain.txt
// Version 2014081700, Last Updated Sun Aug 17 07:07:01 2014 UTC
Verimail.IANARegisteredTlds = { 
	ac:null, 	academy:null, 	accountants:null, 	active:null, 	actor:null, 	ad:null, 	ae:null, 	aero:null, 	af:null, 
	ag:null, 	agency:null, 	ai:null, 	airforce:null, 	al:null, 	am:null, 	an:null, 	ao:null, 	aq:null, 
	ar:null, 	archi:null, 	army:null, 	arpa:null, 	as:null, 	asia:null, 	associates:null, 	at:null, 	attorney:null, 
	au:null, 	auction:null, 	audio:null, 	autos:null, 	aw:null, 	ax:null, 	axa:null, 	az:null, 	ba:null, 
	bar:null, 	bargains:null, 	bayern:null, 	bb:null, 	bd:null, 	be:null, 	beer:null, 	berlin:null, 	best:null, 
	bf:null, 	bg:null, 	bh:null, 	bi:null, 	bid:null, 	bike:null, 	bio:null, 	biz:null, 	bj:null, 
	black:null, 	blackfriday:null, 	blue:null, 	bm:null, 	bmw:null, 	bn:null, 	bnpparibas:null, 	bo:null, 	boutique:null, 
	br:null, 	brussels:null, 	bs:null, 	bt:null, 	build:null, 	builders:null, 	buzz:null, 	bv:null, 	bw:null, 
	by:null, 	bz:null, 	bzh:null, 	ca:null, 	cab:null, 	camera:null, 	camp:null, 	cancerresearch:null, 	capetown:null, 
	capital:null, 	caravan:null, 	cards:null, 	care:null, 	career:null, 	careers:null, 	cash:null, 	cat:null, 	catering:null, 
	cc:null, 	cd:null, 	center:null, 	ceo:null, 	cern:null, 	cf:null, 	cg:null, 	ch:null, 	cheap:null, 
	christmas:null, 	church:null, 	ci:null, 	citic:null, 	city:null, 	ck:null, 	cl:null, 	claims:null, 	cleaning:null, 
	click:null, 	clinic:null, 	clothing:null, 	club:null, 	cm:null, 	cn:null, 	co:null, 	codes:null, 	coffee:null, 
	college:null, 	cologne:null, 	com:null, 	community:null, 	company:null, 	computer:null, 	condos:null, 	construction:null, 	consulting:null, 
	contractors:null, 	cooking:null, 	cool:null, 	coop:null, 	country:null, 	cr:null, 	credit:null, 	creditcard:null, 	cruises:null, 
	cu:null, 	cuisinella:null, 	cv:null, 	cw:null, 	cx:null, 	cy:null, 	cymru:null, 	cz:null, 	dance:null, 
	dating:null, 	de:null, 	deals:null, 	degree:null, 	democrat:null, 	dental:null, 	dentist:null, 	desi:null, 	diamonds:null, 
	diet:null, 	digital:null, 	direct:null, 	directory:null, 	discount:null, 	dj:null, 	dk:null, 	dm:null, 	dnp:null, 
	do:null, 	domains:null, 	durban:null, 	dz:null, 	ec:null, 	edu:null, 	education:null, 	ee:null, 	eg:null, 
	email:null, 	engineer:null, 	engineering:null, 	enterprises:null, 	equipment:null, 	er:null, 	es:null, 	estate:null, 	et:null, 
	eu:null, 	eus:null, 	events:null, 	exchange:null, 	expert:null, 	exposed:null, 	fail:null, 	farm:null, 	feedback:null, 
	fi:null, 	finance:null, 	financial:null, 	fish:null, 	fishing:null, 	fitness:null, 	fj:null, 	fk:null, 	flights:null, 
	florist:null, 	fm:null, 	fo:null, 	foo:null, 	foundation:null, 	fr:null, 	frogans:null, 	fund:null, 	furniture:null, 
	futbol:null, 	ga:null, 	gal:null, 	gallery:null, 	gb:null, 	gd:null, 	ge:null, 	gent:null, 	gf:null, 
	gg:null, 	gh:null, 	gi:null, 	gift:null, 	gifts:null, 	gives:null, 	gl:null, 	glass:null, 	global:null, 
	globo:null, 	gm:null, 	gmo:null, 	gn:null, 	gop:null, 	gov:null, 	gp:null, 	gq:null, 	gr:null, 
	graphics:null, 	gratis:null, 	green:null, 	gripe:null, 	gs:null, 	gt:null, 	gu:null, 	guide:null, 	guitars:null, 
	guru:null, 	gw:null, 	gy:null, 	hamburg:null, 	haus:null, 	healthcare:null, 	help:null, 	hiphop:null, 	hiv:null, 
	hk:null, 	hm:null, 	hn:null, 	holdings:null, 	holiday:null, 	homes:null, 	horse:null, 	host:null, 	hosting:null, 
	house:null, 	how:null, 	hr:null, 	ht:null, 	hu:null, 	id:null, 	ie:null, 	il:null, 	im:null, 
	immobilien:null, 	in:null, 	industries:null, 	info:null, 	ink:null, 	institute:null, 	insure:null, 	int:null, 	international:null, 
	investments:null, 	io:null, 	iq:null, 	ir:null, 	is:null, 	it:null, 	je:null, 	jetzt:null, 	jm:null, 
	jo:null, 	jobs:null, 	joburg:null, 	jp:null, 	juegos:null, 	kaufen:null, 	ke:null, 	kg:null, 	kh:null, 
	ki:null, 	kim:null, 	kitchen:null, 	kiwi:null, 	km:null, 	kn:null, 	koeln:null, 	kp:null, 	kr:null, 
	krd:null, 	kred:null, 	kw:null, 	ky:null, 	kz:null, 	la:null, 	lacaixa:null, 	land:null, 	lawyer:null, 
	lb:null, 	lc:null, 	lease:null, 	lgbt:null, 	li:null, 	life:null, 	lighting:null, 	limited:null, 	limo:null, 
	link:null, 	lk:null, 	loans:null, 	london:null, 	lotto:null, 	lr:null, 	ls:null, 	lt:null, 	ltda:null, 
	lu:null, 	luxe:null, 	luxury:null, 	lv:null, 	ly:null, 	ma:null, 	maison:null, 	management:null, 	mango:null, 
	market:null, 	marketing:null, 	mc:null, 	md:null, 	me:null, 	media:null, 	meet:null, 	melbourne:null, 	menu:null, 
	mg:null, 	mh:null, 	miami:null, 	mil:null, 	mini:null, 	mk:null, 	ml:null, 	mm:null, 	mn:null, 
	mo:null, 	mobi:null, 	moda:null, 	moe:null, 	monash:null, 	mortgage:null, 	moscow:null, 	motorcycles:null, 	mp:null, 
	mq:null, 	mr:null, 	ms:null, 	mt:null, 	mu:null, 	museum:null, 	mv:null, 	mw:null, 	mx:null, 
	my:null, 	mz:null, 	na:null, 	nagoya:null, 	name:null, 	navy:null, 	nc:null, 	ne:null, 	net:null, 
	neustar:null, 	nf:null, 	ng:null, 	ngo:null, 	nhk:null, 	ni:null, 	ninja:null, 	nl:null, 	no:null, 
	np:null, 	nr:null, 	nra:null, 	nrw:null, 	nu:null, 	nyc:null, 	nz:null, 	okinawa:null, 	om:null, 
	ong:null, 	onl:null, 	ooo:null, 	org:null, 	organic:null, 	ovh:null, 	pa:null, 	paris:null, 	partners:null, 
	parts:null, 	pe:null, 	pf:null, 	pg:null, 	ph:null, 	photo:null, 	photography:null, 	photos:null, 	physio:null, 
	pics:null, 	pictures:null, 	pink:null, 	pk:null, 	pl:null, 	place:null, 	plumbing:null, 	pm:null, 	pn:null, 
	post:null, 	pr:null, 	praxi:null, 	press:null, 	pro:null, 	productions:null, 	properties:null, 	property:null, 	ps:null, 
	pt:null, 	pub:null, 	pw:null, 	py:null, 	qa:null, 	qpon:null, 	quebec:null, 	re:null, 	realtor:null, 
	recipes:null, 	red:null, 	rehab:null, 	reise:null, 	reisen:null, 	ren:null, 	rentals:null, 	repair:null, 	report:null, 
	republican:null, 	rest:null, 	restaurant:null, 	reviews:null, 	rich:null, 	rio:null, 	ro:null, 	rocks:null, 	rodeo:null, 
	rs:null, 	ru:null, 	ruhr:null, 	rw:null, 	ryukyu:null, 	sa:null, 	saarland:null, 	sarl:null, 	sb:null, 
	sc:null, 	sca:null, 	scb:null, 	schmidt:null, 	schule:null, 	scot:null, 	sd:null, 	se:null, 	services:null, 
	sexy:null, 	sg:null, 	sh:null, 	shiksha:null, 	shoes:null, 	si:null, 	singles:null, 	sj:null, 	sk:null, 
	sl:null, 	sm:null, 	sn:null, 	so:null, 	social:null, 	software:null, 	sohu:null, 	solar:null, 	solutions:null, 
	soy:null, 	space:null, 	spiegel:null, 	sr:null, 	st:null, 	su:null, 	supplies:null, 	supply:null, 	support:null, 
	surf:null, 	surgery:null, 	suzuki:null, 	sv:null, 	sx:null, 	sy:null, 	systems:null, 	sz:null, 	tatar:null, 
	tattoo:null, 	tax:null, 	tc:null, 	td:null, 	technology:null, 	tel:null, 	tf:null, 	tg:null, 	th:null, 
	tienda:null, 	tips:null, 	tirol:null, 	tj:null, 	tk:null, 	tl:null, 	tm:null, 	tn:null, 	to:null, 
	today:null, 	tokyo:null, 	tools:null, 	top:null, 	town:null, 	toys:null, 	tp:null, 	tr:null, 	trade:null, 
	training:null, 	travel:null, 	tt:null, 	tv:null, 	tw:null, 	tz:null, 	ua:null, 	ug:null, 	uk:null, 
	university:null, 	uno:null, 	uol:null, 	us:null, 	uy:null, 	uz:null, 	va:null, 	vacations:null, 	vc:null, 
	ve:null, 	vegas:null, 	ventures:null, 	versicherung:null, 	vet:null, 	vg:null, 	vi:null, 	viajes:null, 	villas:null, 
	vision:null, 	vlaanderen:null, 	vn:null, 	vodka:null, 	vote:null, 	voting:null, 	voto:null, 	voyage:null, 	vu:null, 
	wales:null, 	wang:null, 	watch:null, 	webcam:null, 	website:null, 	wed:null, 	wf:null, 	whoswho:null, 	wien:null, 
	wiki:null, 	williamhill:null, 	works:null, 	ws:null, 	wtc:null, 	wtf:null, 	xn--1qqw23a:null, 	xn--3bst00m:null, 	xn--3ds443g:null, 
	xn--3e0b707e:null, 	xn--45brj9c:null, 	xn--4gbrim:null, 	xn--55qw42g:null, 	xn--55qx5d:null, 	xn--6frz82g:null, 	xn--6qq986b3xl:null, 	xn--80adxhks:null, 	xn--80ao21a:null, 
	xn--80asehdb:null, 	xn--80aswg:null, 	xn--90a3ac:null, 	xn--c1avg:null, 	xn--cg4bki:null, 	xn--clchc0ea0b2g2a9gcd:null, 	xn--czr694b:null, 	xn--czru2d:null, 	xn--d1acj3b:null, 
	xn--fiq228c5hs:null, 	xn--fiq64b:null, 	xn--fiqs8s:null, 	xn--fiqz9s:null, 	xn--fpcrj9c3d:null, 	xn--fzc2c9e2c:null, 	xn--gecrj9c:null, 	xn--h2brj9c:null, 	xn--i1b6b1a6a2e:null, 
	xn--io0a7i:null, 	xn--j1amh:null, 	xn--j6w193g:null, 	xn--kprw13d:null, 	xn--kpry57d:null, 	xn--kput3i:null, 	xn--l1acc:null, 	xn--lgbbat1ad8j:null, 	xn--mgb9awbf:null, 
	xn--mgba3a4f16a:null, 	xn--mgbaam7a8h:null, 	xn--mgbab2bd:null, 	xn--mgbayh7gpa:null, 	xn--mgbbh1a71e:null, 	xn--mgbc0a9azcg:null, 	xn--mgberp4a5d4ar:null, 	xn--mgbx4cd0ab:null, 	xn--ngbc5azd:null, 
	xn--nqv7f:null, 	xn--nqv7fs00ema:null, 	xn--o3cw4h:null, 	xn--ogbpf8fl:null, 	xn--p1ai:null, 	xn--pgbs0dh:null, 	xn--q9jyb4c:null, 	xn--rhqv96g:null, 	xn--s9brj9c:null, 
	xn--ses554g:null, 	xn--unup4y:null, 	xn--wgbh1c:null, 	xn--wgbl6a:null, 	xn--xhq521b:null, 	xn--xkc2al3hye2a:null, 	xn--xkc2dl3a5ee0h:null, 	xn--yfro4i67o:null, 	xn--ygbi2ammx:null, 
	xn--zfr164b:null, 	xxx:null, 	xyz:null, 	yachts:null, 	yandex:null, 	ye:null, 	yokohama:null, 	yt:null, 	za:null, 
	zm:null, 	zone:null, 	zw:null
};

// Lookup table for the most common temp email domains
// Mostly from http://www.sizlopedia.com/2007/05/27/top-20-temporary-and-disposable-email-services/
Verimail.TempEmailDomains = {
    com: {
        mytrashmail: null,
        mailmetrash: null,
        trashymail: null,
        mailinator: null,
        mailexpire: null,
        temporaryinbox: null,
        rtrtr: null,
        sharklasers: null,
        guerrillamailblock: null,
        guerrillamail: null
    },
    net: {
        guerrillamail: null,
        tempemail: null
    },
    org: {
        guerrillamail: null,
        spamfree24: null,
        jetable: null
    },
    fr: {
        tempomail: null
    },
    de: {
        guerrillamail: null
    },
    biz: {
        guerrillamail: null
    }
};

// Levenshtein distance algorithm
// Implementation from http://webreflection.blogspot.se/2009/02/levenshtein-algorithm-revisited-25.html
Verimail.getLevenshteinDistance = function(min, split){
    try{split=!("0")[0]}catch(i){split=true};
    return function(a, b){
        if(a == b)return 0;
        if(!a.length || !b.length)return b.length || a.length;
        if(split){a = a.split("");b = b.split("")};
        var len1 = a.length + 1,
            len2 = b.length + 1,
            I = 0,
            i = 0,
            d = [[0]],
            c, j, J;
        while(++i < len2)
            d[0][i] = i;
        i = 0;
        while(++i < len1){
            J = j = 0;
            c = a[I];
            d[i] = [i];
            while(++j < len2){
                d[i][j] = min(d[I][j] + 1, d[i][J] + 1, d[I][J] + (c != b[J]));
                ++J;
            };
            ++I;
        };
        return d[len1 - 1][len2 - 1];
    }
}(Math.min, false);

// Gets the closest string using a string distance algorithm (eg. levenshtein)
Verimail.getClosestString = function(subject, suggestions, tolerance, distanceFunction){
    tolerance = tolerance || 0.5;
    var closestDistance = Number.MAX_VALUE, closestSuggestion = false;
    distanceFunction = distanceFunction || Verimail.getLevenshteinDistance;

    if(!(subject in suggestions)){
        for(var suggestion in suggestions){
            var distance = distanceFunction(subject, suggestion);
            if((distance < closestDistance) && ((distance / subject.length) < tolerance)){
                closestDistance = distance;
                closestSuggestion = suggestion;
            }
        }
    }

    return closestSuggestion;
};

// Gets the closest TLD distance-wise
Verimail.getClosestTld = function(domain, tolerance, distanceFunction){
    return Verimail.getClosestString(domain, Verimail.MostCommonTlds, tolerance, distanceFunction);
};

// Gets the closest domain distance-wise
Verimail.getClosestEmailDomain = function(domain, tolerance, distanceFunction){
    return Verimail.getClosestString(domain, Verimail.MostCommonEmailDomains, tolerance, distanceFunction);
};

// Validate the format of an email according to RFC 822
Verimail.testEmailFormat = function(email){
    // Regex should be according to RFC 822
    // Borrowed from http://badsyntax.co/post/javascript-email-validation-rfc822
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(email);
};

// Sets the language that the messages will be generated in
Verimail.prototype.setLanguage = function(code, fallback){
    this.options.language = (code && code in Verimail.Language) ? code : fallback;
};

// Retrieves a language text by key. Either as rich text (HTML) or plain
Verimail.prototype.getLanguageText = function(key, arg1){
    var text = Verimail.Language[this.options.language][key];

    // Simple formatting
    if(arg1){
        text = text.replace("%s", arg1);
    }

    // Turn formatted text (HTML) into plain text
    if(!this.options.richTextMessages){
        text = Verimail.stripHtml(text);
    }

    return text;
};

// Strips any HTML elements from a string
Verimail.stripHtml = function(data){
    if(data != null && data.indexOf('<') != -1){
        if(typeof document !== 'undefined'){
            var temp = document.createElement("DIV");
            temp.innerHTML = data;
            data = temp.textContent || temp.innerText;
        }else{
            data = data.replace(/(<([^>]+)>)/ig, '');
        }
    }
    return data;
};

// Parse an email address into segments (local, domain, tld)
Verimail.getEmailAddressSegments = function(email){
    var state = 'local';
    var segments = {local:"", domain:"", tld:""};

    for(var i=0;i<email.length;++i){
        var character = email.charAt(i);
        switch(state){
            case 'local':
                if(character == '@'){
                    state = 'domain';
                }else{
                    segments.local += character;
                }
                break;
            case 'domain':
                if(character == '.'){
                    state = 'tld';
                }else{
                    segments.domain += character;
                }
                break;
            case 'tld':
                if(character == '.'){
                    segments.domain += "." + segments.tld;
                    segments.tld = "";
                }else{
                    segments.tld += character;
                }
                break;
        }
    }

    segments.fullDomain = segments.domain + "." + segments.tld;

    return segments;
};

// Verifies an email and calls a callback function once it's ready
Verimail.prototype.verify = function(email, onStatusUpdate){
    email = (email || "").toLowerCase();
    var status = null, message = null, suggestion = null;

    // Helper method that wraps a text in a span/correction element
    var markAsCorrection = function(text){
        return "<span class='correction'>" + text + "</span>";
    };

    // Check if the email is empty.. White space doesn't fool us!
    if(!email || email.length == 0 || (email.replace && email.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ').length == 0)){
        status = Verimail.Status.EmptyError;
        message = this.getLanguageText("empty");
    // Validate the format of the email
    }else if(!Verimail.testEmailFormat(email)){
        status = Verimail.Status.SyntaxError;
        message = this.getLanguageText("invalidFormat");
    }else{
        var segments = Verimail.getEmailAddressSegments(email);

        if(this.options.denyTempEmailDomains && segments.tld in Verimail.TempEmailDomains && segments.domain in Verimail.TempEmailDomains[segments.tld]){
            status = Verimail.Status.BlockedError;
            message = this.getLanguageText("domainBlocked", segments.fullDomain);
        }else{
            if(this.options.enforceTld){
                if(!segments.tld){
                    status = Verimail.Status.InvalidPart;
                    message = this.getLanguageText("invalidFormat");
                }else if(!(segments.tld in Verimail.IANARegisteredTlds)){
                    status = Verimail.Status.InvalidPart;
                    var closestTld = Verimail.getClosestTld(segments.tld, 10, this.options.distanceFunction);
                    if(closestTld){
                        var closestDomain = Verimail.getClosestEmailDomain(segments.domain + "." + closestTld, 0.25, this.options.distanceFunction);
                        if(closestDomain){
                            suggestion = segments.local + "@" + closestDomain;
                            message = this.getLanguageText("typo", segments.local + "@" + markAsCorrection(closestDomain));
                        }else{
                            suggestion = segments.local + "@" + segments.domain + "." + closestTld;
                            message = this.getLanguageText("typo", segments.local + "@" + segments.domain + "." + markAsCorrection(closestTld));
                        }
                    }else{
                        message = this.getLanguageText("invalidTld", segments.tld);
                    }
                }
            }
        }
    }

    if(status === null || status == Verimail.SyntaxError){
        var closestDomain = Verimail.getClosestEmailDomain(segments.domain + "." + segments.tld, 0.3, this.options.distanceFunction);
        if(closestDomain){
            status = Verimail.Status.CorrectSyntax;
            suggestion = segments.local + "@" + closestDomain;
            message = this.getLanguageText("typo", segments.local + "@" + markAsCorrection(closestDomain));
        }else{
            status = Verimail.Status.CorrectSyntax;
            message = message || this.getLanguageText("success");
        }
    }

    //if(this.options.token && status == Verimail.Status.CorrectSyntax){
    //    onStatusUpdate(Verimail.Status.Pending, message, suggestion);
    //    this.Service.verify(email, onStatusUpdate);
    //}else{
        onStatusUpdate(status, message, suggestion);
    //}
};

(function($, window, document, undefined){
    var Verimail = function(element, options){
        this.element = element;
        this.$element = $(element);
        this.options = options;
    };

    Verimail.prototype = {
        defaults: {
            messageElement: null,
            statusElement: null,
            prefixName: 'verimail',
            onStatusChange: null
        },

        init: function() {
            var outerScope = this;
            var config = this.config = $.extend({}, this.defaults, this.options);
            var verimailInstance = this.instance = new Comfirm.AlphaMail.Verimail(this.config);

            var verifyEmailCallback = function(email){
                verimailInstance.verify(email, function(status, message, suggestion){
                    var statusClass = "error";
                    var statusElement = config.statusElement ? $(config.statusElement) : outerScope.$element;
                    var isPendingStatus = status == Comfirm.AlphaMail.Verimail.Status.Pending;

                    if(status >= 0){
                        statusClass = isPendingStatus ? "pending" : "success";
                    }
                    
                    if(config.onStatusChange){
                        config.onStatusChange(config, status, message, suggestion);
                    }

                    statusElement
                        .removeClass(config.prefixName + '-success')
                        .removeClass(config.prefixName + '-error')
                        .removeClass(config.prefixName + '-pending')
                        .addClass(config.prefixName + '-' + statusClass);

                    outerScope.isPendingStatus = isPendingStatus;
                    outerScope.$element.data('verimail-status', statusClass);

                    if(config.messageElement){
                        var messageContainer = $("<span>" + message + "</span>")
                            .addClass(statusClass);

                        if(suggestion){
                            var suggestionAnchor = $("<a />")
                                .attr('href', '#')
                                .click(function(){
                                    email = suggestion;
                                    outerScope.$element.val(suggestion);
                                    verifyEmailCallback(suggestion);
                                    return false;
                                });

                            $("span.suggestion", messageContainer)
                                .wrap(suggestionAnchor);
                        }

                        $(config.messageElement)
                            .html(messageContainer);
                    }
                });
            };

            if(this.$element.val() && this.$element.val().length > 0){
                verifyEmailCallback(this.$element.val());
            }

            this.$element.keyup(function(e){
                var email = $(this).val();

                if(outerScope.timeoutId){
                    clearTimeout(outerScope.timeoutId);
                }

                if(outerScope.isPendingStatus){
                    outerScope.timeoutId = setTimeout(function(){
                        verifyEmailCallback(email);
                    }, 500);
                }else{
                    verifyEmailCallback(email);
                }
            });

            return this;
        }
    };

    Verimail.defaults = Verimail.prototype.defaults;

    $.fn.verimail = function(options) {
        return this.each(function(){
            new Verimail(this, options).init();
        });
    };

    $.fn.getVerimailStatus = function() {
        return this.data('verimail-status');
    };
})(jQuery, window, document);
