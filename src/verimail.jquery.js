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
    }
};

// Table of the most common email domains
Verimail.MostCommonEmailDomains = {
    "gmail.com":null, "msn.com":null, "hotmail.com":null, "hotmail.co.uk":null,
    "yahoo.com":null, "yahoo.co.uk":null, "facebook.com":null, "live.com":null,
    "mail.com":null, "gmx.com":null, "aol.com":null, "verizon.net":null, "comcast.net":null,
    "googlemail.com":null, "att.net":null, "mail.com":null, "mac.com":null,
    "rocketmail.com":null, "ymail.com":null
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
// Version 2016040400, Last Updated Mon Apr  4 07:07:01 2016 UTC
Verimail.IANARegisteredTlds = { 
'aaa':null,
'aarp':null,
'abb':null,
'abbott':null,
'abogado':null,
'ac':null,
'academy':null,
'accenture':null,
'accountant':null,
'accountants':null,
'aco':null,
'active':null,
'actor':null,
'ad':null,
'adac':null,
'ads':null,
'adult':null,
'ae':null,
'aeg':null,
'aero':null,
'af':null,
'afl':null,
'ag':null,
'agency':null,
'ai':null,
'aig':null,
'airforce':null,
'airtel':null,
'al':null,
'alibaba':null,
'alipay':null,
'allfinanz':null,
'ally':null,
'alsace':null,
'am':null,
'amica':null,
'amsterdam':null,
'analytics':null,
'android':null,
'anquan':null,
'ao':null,
'apartments':null,
'app':null,
'apple':null,
'aq':null,
'aquarelle':null,
'ar':null,
'aramco':null,
'archi':null,
'army':null,
'arpa':null,
'arte':null,
'as':null,
'asia':null,
'associates':null,
'at':null,
'attorney':null,
'au':null,
'auction':null,
'audi':null,
'audio':null,
'author':null,
'auto':null,
'autos':null,
'avianca':null,
'aw':null,
'aws':null,
'ax':null,
'axa':null,
'az':null,
'azure':null,
'ba':null,
'baidu':null,
'band':null,
'bank':null,
'bar':null,
'barcelona':null,
'barclaycard':null,
'barclays':null,
'barefoot':null,
'bargains':null,
'bauhaus':null,
'bayern':null,
'bb':null,
'bbc':null,
'bbva':null,
'bcg':null,
'bcn':null,
'bd':null,
'be':null,
'beats':null,
'beer':null,
'bentley':null,
'berlin':null,
'best':null,
'bet':null,
'bf':null,
'bg':null,
'bh':null,
'bharti':null,
'bi':null,
'bible':null,
'bid':null,
'bike':null,
'bing':null,
'bingo':null,
'bio':null,
'biz':null,
'bj':null,
'black':null,
'blackfriday':null,
'bloomberg':null,
'blue':null,
'bm':null,
'bms':null,
'bmw':null,
'bn':null,
'bnl':null,
'bnpparibas':null,
'bo':null,
'boats':null,
'boehringer':null,
'bom':null,
'bond':null,
'boo':null,
'book':null,
'boots':null,
'bosch':null,
'bostik':null,
'bot':null,
'boutique':null,
'br':null,
'bradesco':null,
'bridgestone':null,
'broadway':null,
'broker':null,
'brother':null,
'brussels':null,
'bs':null,
'bt':null,
'budapest':null,
'bugatti':null,
'build':null,
'builders':null,
'business':null,
'buy':null,
'buzz':null,
'bv':null,
'bw':null,
'by':null,
'bz':null,
'bzh':null,
'ca':null,
'cab':null,
'cafe':null,
'cal':null,
'call':null,
'camera':null,
'camp':null,
'cancerresearch':null,
'canon':null,
'capetown':null,
'capital':null,
'car':null,
'caravan':null,
'cards':null,
'care':null,
'career':null,
'careers':null,
'cars':null,
'cartier':null,
'casa':null,
'cash':null,
'casino':null,
'cat':null,
'catering':null,
'cba':null,
'cbn':null,
'cc':null,
'cd':null,
'ceb':null,
'center':null,
'ceo':null,
'cern':null,
'cf':null,
'cfa':null,
'cfd':null,
'cg':null,
'ch':null,
'chanel':null,
'channel':null,
'chase':null,
'chat':null,
'cheap':null,
'chloe':null,
'christmas':null,
'chrome':null,
'church':null,
'ci':null,
'cipriani':null,
'circle':null,
'cisco':null,
'citic':null,
'city':null,
'cityeats':null,
'ck':null,
'cl':null,
'claims':null,
'cleaning':null,
'click':null,
'clinic':null,
'clinique':null,
'clothing':null,
'cloud':null,
'club':null,
'clubmed':null,
'cm':null,
'cn':null,
'co':null,
'coach':null,
'codes':null,
'coffee':null,
'college':null,
'cologne':null,
'com':null,
'commbank':null,
'community':null,
'company':null,
'compare':null,
'computer':null,
'comsec':null,
'condos':null,
'construction':null,
'consulting':null,
'contact':null,
'contractors':null,
'cooking':null,
'cool':null,
'coop':null,
'corsica':null,
'country':null,
'coupon':null,
'coupons':null,
'courses':null,
'cr':null,
'credit':null,
'creditcard':null,
'creditunion':null,
'cricket':null,
'crown':null,
'crs':null,
'cruises':null,
'csc':null,
'cu':null,
'cuisinella':null,
'cv':null,
'cw':null,
'cx':null,
'cy':null,
'cymru':null,
'cyou':null,
'cz':null,
'dabur':null,
'dad':null,
'dance':null,
'date':null,
'dating':null,
'datsun':null,
'day':null,
'dclk':null,
'de':null,
'dealer':null,
'deals':null,
'degree':null,
'delivery':null,
'dell':null,
'deloitte':null,
'delta':null,
'democrat':null,
'dental':null,
'dentist':null,
'desi':null,
'design':null,
'dev':null,
'diamonds':null,
'diet':null,
'digital':null,
'direct':null,
'directory':null,
'discount':null,
'dj':null,
'dk':null,
'dm':null,
'dnp':null,
'do':null,
'docs':null,
'dog':null,
'doha':null,
'domains':null,
'download':null,
'drive':null,
'dubai':null,
'durban':null,
'dvag':null,
'dz':null,
'earth':null,
'eat':null,
'ec':null,
'edeka':null,
'edu':null,
'education':null,
'ee':null,
'eg':null,
'email':null,
'emerck':null,
'energy':null,
'engineer':null,
'engineering':null,
'enterprises':null,
'epson':null,
'equipment':null,
'er':null,
'erni':null,
'es':null,
'esq':null,
'estate':null,
'et':null,
'eu':null,
'eurovision':null,
'eus':null,
'events':null,
'everbank':null,
'exchange':null,
'expert':null,
'exposed':null,
'express':null,
'extraspace':null,
'fage':null,
'fail':null,
'fairwinds':null,
'faith':null,
'family':null,
'fan':null,
'fans':null,
'farm':null,
'fashion':null,
'fast':null,
'feedback':null,
'ferrero':null,
'fi':null,
'film':null,
'final':null,
'finance':null,
'financial':null,
'firestone':null,
'firmdale':null,
'fish':null,
'fishing':null,
'fit':null,
'fitness':null,
'fj':null,
'fk':null,
'flickr':null,
'flights':null,
'florist':null,
'flowers':null,
'flsmidth':null,
'fly':null,
'fm':null,
'fo':null,
'foo':null,
'football':null,
'ford':null,
'forex':null,
'forsale':null,
'forum':null,
'foundation':null,
'fox':null,
'fr':null,
'fresenius':null,
'frl':null,
'frogans':null,
'frontier':null,
'fund':null,
'furniture':null,
'futbol':null,
'fyi':null,
'ga':null,
'gal':null,
'gallery':null,
'gallo':null,
'gallup':null,
'game':null,
'garden':null,
'gb':null,
'gbiz':null,
'gd':null,
'gdn':null,
'ge':null,
'gea':null,
'gent':null,
'genting':null,
'gf':null,
'gg':null,
'ggee':null,
'gh':null,
'gi':null,
'gift':null,
'gifts':null,
'gives':null,
'giving':null,
'gl':null,
'glass':null,
'gle':null,
'global':null,
'globo':null,
'gm':null,
'gmail':null,
'gmbh':null,
'gmo':null,
'gmx':null,
'gn':null,
'gold':null,
'goldpoint':null,
'golf':null,
'goo':null,
'goog':null,
'google':null,
'gop':null,
'got':null,
'gov':null,
'gp':null,
'gq':null,
'gr':null,
'grainger':null,
'graphics':null,
'gratis':null,
'green':null,
'gripe':null,
'group':null,
'gs':null,
'gt':null,
'gu':null,
'gucci':null,
'guge':null,
'guide':null,
'guitars':null,
'guru':null,
'gw':null,
'gy':null,
'hamburg':null,
'hangout':null,
'haus':null,
'hdfcbank':null,
'health':null,
'healthcare':null,
'help':null,
'helsinki':null,
'here':null,
'hermes':null,
'hiphop':null,
'hitachi':null,
'hiv':null,
'hk':null,
'hm':null,
'hn':null,
'hockey':null,
'holdings':null,
'holiday':null,
'homedepot':null,
'homes':null,
'honda':null,
'horse':null,
'host':null,
'hosting':null,
'hoteles':null,
'hotmail':null,
'house':null,
'how':null,
'hr':null,
'hsbc':null,
'ht':null,
'htc':null,
'hu':null,
'hyundai':null,
'ibm':null,
'icbc':null,
'ice':null,
'icu':null,
'id':null,
'ie':null,
'ifm':null,
'iinet':null,
'il':null,
'im':null,
'immo':null,
'immobilien':null,
'in':null,
'industries':null,
'infiniti':null,
'info':null,
'ing':null,
'ink':null,
'institute':null,
'insurance':null,
'insure':null,
'int':null,
'international':null,
'investments':null,
'io':null,
'ipiranga':null,
'iq':null,
'ir':null,
'irish':null,
'is':null,
'iselect':null,
'ist':null,
'istanbul':null,
'it':null,
'itau':null,
'iwc':null,
'jaguar':null,
'java':null,
'jcb':null,
'jcp':null,
'je':null,
'jetzt':null,
'jewelry':null,
'jlc':null,
'jll':null,
'jm':null,
'jmp':null,
'jo':null,
'jobs':null,
'joburg':null,
'jot':null,
'joy':null,
'jp':null,
'jpmorgan':null,
'jprs':null,
'juegos':null,
'kaufen':null,
'kddi':null,
'ke':null,
'kerryhotels':null,
'kerrylogistics':null,
'kerryproperties':null,
'kfh':null,
'kg':null,
'kh':null,
'ki':null,
'kia':null,
'kim':null,
'kinder':null,
'kitchen':null,
'kiwi':null,
'km':null,
'kn':null,
'koeln':null,
'komatsu':null,
'kp':null,
'kpn':null,
'kr':null,
'krd':null,
'kred':null,
'kuokgroup':null,
'kw':null,
'ky':null,
'kyoto':null,
'kz':null,
'la':null,
'lacaixa':null,
'lamborghini':null,
'lamer':null,
'lancaster':null,
'land':null,
'landrover':null,
'lanxess':null,
'lasalle':null,
'lat':null,
'latrobe':null,
'law':null,
'lawyer':null,
'lb':null,
'lc':null,
'lds':null,
'lease':null,
'leclerc':null,
'legal':null,
'lexus':null,
'lgbt':null,
'li':null,
'liaison':null,
'lidl':null,
'life':null,
'lifeinsurance':null,
'lifestyle':null,
'lighting':null,
'like':null,
'limited':null,
'limo':null,
'lincoln':null,
'linde':null,
'link':null,
'live':null,
'living':null,
'lixil':null,
'lk':null,
'loan':null,
'loans':null,
'locus':null,
'lol':null,
'london':null,
'lotte':null,
'lotto':null,
'love':null,
'lr':null,
'ls':null,
'lt':null,
'ltd':null,
'ltda':null,
'lu':null,
'lupin':null,
'luxe':null,
'luxury':null,
'lv':null,
'ly':null,
'ma':null,
'madrid':null,
'maif':null,
'maison':null,
'makeup':null,
'man':null,
'management':null,
'mango':null,
'market':null,
'marketing':null,
'markets':null,
'marriott':null,
'mba':null,
'mc':null,
'md':null,
'me':null,
'med':null,
'media':null,
'meet':null,
'melbourne':null,
'meme':null,
'memorial':null,
'men':null,
'menu':null,
'meo':null,
'mg':null,
'mh':null,
'miami':null,
'microsoft':null,
'mil':null,
'mini':null,
'mk':null,
'ml':null,
'mm':null,
'mma':null,
'mn':null,
'mo':null,
'mobi':null,
'mobily':null,
'moda':null,
'moe':null,
'moi':null,
'mom':null,
'monash':null,
'money':null,
'montblanc':null,
'mormon':null,
'mortgage':null,
'moscow':null,
'motorcycles':null,
'mov':null,
'movie':null,
'movistar':null,
'mp':null,
'mq':null,
'mr':null,
'ms':null,
'mt':null,
'mtn':null,
'mtpc':null,
'mtr':null,
'mu':null,
'museum':null,
'mutuelle':null,
'mv':null,
'mw':null,
'mx':null,
'my':null,
'mz':null,
'na':null,
'nadex':null,
'nagoya':null,
'name':null,
'natura':null,
'navy':null,
'nc':null,
'ne':null,
'nec':null,
'net':null,
'netbank':null,
'network':null,
'neustar':null,
'new':null,
'news':null,
'nexus':null,
'nf':null,
'ng':null,
'ngo':null,
'nhk':null,
'ni':null,
'nico':null,
'nikon':null,
'ninja':null,
'nissan':null,
'nissay':null,
'nl':null,
'no':null,
'nokia':null,
'norton':null,
'nowruz':null,
'np':null,
'nr':null,
'nra':null,
'nrw':null,
'ntt':null,
'nu':null,
'nyc':null,
'nz':null,
'obi':null,
'office':null,
'okinawa':null,
'om':null,
'omega':null,
'one':null,
'ong':null,
'onl':null,
'online':null,
'ooo':null,
'oracle':null,
'orange':null,
'org':null,
'organic':null,
'origins':null,
'osaka':null,
'otsuka':null,
'ovh':null,
'pa':null,
'page':null,
'pamperedchef':null,
'panerai':null,
'paris':null,
'pars':null,
'partners':null,
'parts':null,
'party':null,
'passagens':null,
'pe':null,
'pet':null,
'pf':null,
'pg':null,
'ph':null,
'pharmacy':null,
'philips':null,
'photo':null,
'photography':null,
'photos':null,
'physio':null,
'piaget':null,
'pics':null,
'pictet':null,
'pictures':null,
'pid':null,
'pin':null,
'ping':null,
'pink':null,
'pizza':null,
'pk':null,
'pl':null,
'place':null,
'play':null,
'playstation':null,
'plumbing':null,
'plus':null,
'pm':null,
'pn':null,
'pohl':null,
'poker':null,
'porn':null,
'post':null,
'pr':null,
'praxi':null,
'press':null,
'pro':null,
'prod':null,
'productions':null,
'prof':null,
'promo':null,
'properties':null,
'property':null,
'protection':null,
'ps':null,
'pt':null,
'pub':null,
'pw':null,
'pwc':null,
'py':null,
'qa':null,
'qpon':null,
'quebec':null,
'quest':null,
'racing':null,
're':null,
'read':null,
'realtor':null,
'realty':null,
'recipes':null,
'red':null,
'redstone':null,
'redumbrella':null,
'rehab':null,
'reise':null,
'reisen':null,
'reit':null,
'ren':null,
'rent':null,
'rentals':null,
'repair':null,
'report':null,
'republican':null,
'rest':null,
'restaurant':null,
'review':null,
'reviews':null,
'rexroth':null,
'rich':null,
'ricoh':null,
'rio':null,
'rip':null,
'ro':null,
'rocher':null,
'rocks':null,
'rodeo':null,
'room':null,
'rs':null,
'rsvp':null,
'ru':null,
'ruhr':null,
'run':null,
'rw':null,
'rwe':null,
'ryukyu':null,
'sa':null,
'saarland':null,
'safe':null,
'safety':null,
'sakura':null,
'sale':null,
'salon':null,
'samsung':null,
'sandvik':null,
'sandvikcoromant':null,
'sanofi':null,
'sap':null,
'sapo':null,
'sarl':null,
'sas':null,
'saxo':null,
'sb':null,
'sbs':null,
'sc':null,
'sca':null,
'scb':null,
'schaeffler':null,
'schmidt':null,
'scholarships':null,
'school':null,
'schule':null,
'schwarz':null,
'science':null,
'scor':null,
'scot':null,
'sd':null,
'se':null,
'seat':null,
'security':null,
'seek':null,
'select':null,
'sener':null,
'services':null,
'seven':null,
'sew':null,
'sex':null,
'sexy':null,
'sfr':null,
'sg':null,
'sh':null,
'sharp':null,
'shaw':null,
'shell':null,
'shia':null,
'shiksha':null,
'shoes':null,
'shouji':null,
'show':null,
'shriram':null,
'si':null,
'sina':null,
'singles':null,
'site':null,
'sj':null,
'sk':null,
'ski':null,
'skin':null,
'sky':null,
'skype':null,
'sl':null,
'sm':null,
'smile':null,
'sn':null,
'sncf':null,
'so':null,
'soccer':null,
'social':null,
'softbank':null,
'software':null,
'sohu':null,
'solar':null,
'solutions':null,
'song':null,
'sony':null,
'soy':null,
'space':null,
'spiegel':null,
'spot':null,
'spreadbetting':null,
'sr':null,
'srl':null,
'st':null,
'stada':null,
'star':null,
'starhub':null,
'statefarm':null,
'statoil':null,
'stc':null,
'stcgroup':null,
'stockholm':null,
'storage':null,
'store':null,
'stream':null,
'studio':null,
'study':null,
'style':null,
'su':null,
'sucks':null,
'supplies':null,
'supply':null,
'support':null,
'surf':null,
'surgery':null,
'suzuki':null,
'sv':null,
'swatch':null,
'swiss':null,
'sx':null,
'sy':null,
'sydney':null,
'symantec':null,
'systems':null,
'sz':null,
'tab':null,
'taipei':null,
'talk':null,
'taobao':null,
'tatamotors':null,
'tatar':null,
'tattoo':null,
'tax':null,
'taxi':null,
'tc':null,
'tci':null,
'td':null,
'team':null,
'tech':null,
'technology':null,
'tel':null,
'telecity':null,
'telefonica':null,
'temasek':null,
'tennis':null,
'tf':null,
'tg':null,
'th':null,
'thd':null,
'theater':null,
'theatre':null,
'tickets':null,
'tienda':null,
'tiffany':null,
'tips':null,
'tires':null,
'tirol':null,
'tj':null,
'tk':null,
'tl':null,
'tm':null,
'tmall':null,
'tn':null,
'to':null,
'today':null,
'tokyo':null,
'tools':null,
'top':null,
'toray':null,
'toshiba':null,
'total':null,
'tours':null,
'town':null,
'toyota':null,
'toys':null,
'tr':null,
'trade':null,
'trading':null,
'training':null,
'travel':null,
'travelers':null,
'travelersinsurance':null,
'trust':null,
'trv':null,
'tt':null,
'tube':null,
'tui':null,
'tunes':null,
'tushu':null,
'tv':null,
'tvs':null,
'tw':null,
'tz':null,
'ua':null,
'ubs':null,
'ug':null,
'uk':null,
'unicom':null,
'university':null,
'uno':null,
'uol':null,
'us':null,
'uy':null,
'uz':null,
'va':null,
'vacations':null,
'vana':null,
'vc':null,
've':null,
'vegas':null,
'ventures':null,
'verisign':null,
'versicherung':null,
'vet':null,
'vg':null,
'vi':null,
'viajes':null,
'video':null,
'viking':null,
'villas':null,
'vin':null,
'vip':null,
'virgin':null,
'vision':null,
'vista':null,
'vistaprint':null,
'viva':null,
'vlaanderen':null,
'vn':null,
'vodka':null,
'volkswagen':null,
'vote':null,
'voting':null,
'voto':null,
'voyage':null,
'vu':null,
'vuelos':null,
'wales':null,
'walter':null,
'wang':null,
'wanggou':null,
'watch':null,
'watches':null,
'weather':null,
'weatherchannel':null,
'webcam':null,
'weber':null,
'website':null,
'wed':null,
'wedding':null,
'weir':null,
'wf':null,
'whoswho':null,
'wien':null,
'wiki':null,
'williamhill':null,
'win':null,
'windows':null,
'wine':null,
'wme':null,
'wolterskluwer':null,
'work':null,
'works':null,
'world':null,
'ws':null,
'wtc':null,
'wtf':null,
'xbox':null,
'xerox':null,
'xihuan':null,
'xin':null,
'xn--11b4c3d':null,
'xn--1ck2e1b':null,
'xn--1qqw23a':null,
'xn--30rr7y':null,
'xn--3bst00m':null,
'xn--3ds443g':null,
'xn--3e0b707e':null,
'xn--3pxu8k':null,
'xn--42c2d9a':null,
'xn--45brj9c':null,
'xn--45q11c':null,
'xn--4gbrim':null,
'xn--55qw42g':null,
'xn--55qx5d':null,
'xn--6frz82g':null,
'xn--6qq986b3xl':null,
'xn--80adxhks':null,
'xn--80ao21a':null,
'xn--80asehdb':null,
'xn--80aswg':null,
'xn--8y0a063a':null,
'xn--90a3ac':null,
'xn--90ais':null,
'xn--9dbq2a':null,
'xn--9et52u':null,
'xn--b4w605ferd':null,
'xn--bck1b9a5dre4c':null,
'xn--c1avg':null,
'xn--c2br7g':null,
'xn--cck2b3b':null,
'xn--cg4bki':null,
'xn--clchc0ea0b2g2a9gcd':null,
'xn--czr694b':null,
'xn--czrs0t':null,
'xn--czru2d':null,
'xn--d1acj3b':null,
'xn--d1alf':null,
'xn--e1a4c':null,
'xn--eckvdtc9d':null,
'xn--efvy88h':null,
'xn--estv75g':null,
'xn--fct429k':null,
'xn--fhbei':null,
'xn--fiq228c5hs':null,
'xn--fiq64b':null,
'xn--fiqs8s':null,
'xn--fiqz9s':null,
'xn--fjq720a':null,
'xn--flw351e':null,
'xn--fpcrj9c3d':null,
'xn--fzc2c9e2c':null,
'xn--g2xx48c':null,
'xn--gckr3f0f':null,
'xn--gecrj9c':null,
'xn--h2brj9c':null,
'xn--hxt814e':null,
'xn--i1b6b1a6a2e':null,
'xn--imr513n':null,
'xn--io0a7i':null,
'xn--j1aef':null,
'xn--j1amh':null,
'xn--j6w193g':null,
'xn--jlq61u9w7b':null,
'xn--jvr189m':null,
'xn--kcrx77d1x4a':null,
'xn--kprw13d':null,
'xn--kpry57d':null,
'xn--kpu716f':null,
'xn--kput3i':null,
'xn--l1acc':null,
'xn--lgbbat1ad8j':null,
'xn--mgb9awbf':null,
'xn--mgba3a3ejt':null,
'xn--mgba3a4f16a':null,
'xn--mgbaam7a8h':null,
'xn--mgbab2bd':null,
'xn--mgbayh7gpa':null,
'xn--mgbb9fbpob':null,
'xn--mgbbh1a71e':null,
'xn--mgbc0a9azcg':null,
'xn--mgberp4a5d4ar':null,
'xn--mgbpl2fh':null,
'xn--mgbt3dhd':null,
'xn--mgbtx2b':null,
'xn--mgbx4cd0ab':null,
'xn--mix891f':null,
'xn--mk1bu44c':null,
'xn--mxtq1m':null,
'xn--ngbc5azd':null,
'xn--ngbe9e0a':null,
'xn--node':null,
'xn--nqv7f':null,
'xn--nqv7fs00ema':null,
'xn--nyqy26a':null,
'xn--o3cw4h':null,
'xn--ogbpf8fl':null,
'xn--p1acf':null,
'xn--p1ai':null,
'xn--pbt977c':null,
'xn--pgbs0dh':null,
'xn--pssy2u':null,
'xn--q9jyb4c':null,
'xn--qcka1pmc':null,
'xn--qxam':null,
'xn--rhqv96g':null,
'xn--rovu88b':null,
'xn--s9brj9c':null,
'xn--ses554g':null,
'xn--t60b56a':null,
'xn--tckwe':null,
'xn--unup4y':null,
'xn--vermgensberater-ctb':null,
'xn--vermgensberatung-pwb':null,
'xn--vhquv':null,
'xn--vuq861b':null,
'xn--w4r85el8fhu5dnra':null,
'xn--wgbh1c':null,
'xn--wgbl6a':null,
'xn--xhq521b':null,
'xn--xkc2al3hye2a':null,
'xn--xkc2dl3a5ee0h':null,
'xn--y9a3aq':null,
'xn--yfro4i67o':null,
'xn--ygbi2ammx':null,
'xn--zfr164b':null,
'xperia':null,
'xxx':null,
'xyz':null,
'yachts':null,
'yahoo':null,
'yamaxun':null,
'yandex':null,
'ye':null,
'yodobashi':null,
'yoga':null,
'yokohama':null,
'you':null,
'youtube':null,
'yt':null,
'yun':null,
'za':null,
'zara':null,
'zero':null,
'zip':null,
'zm':null,
'zone':null,
'zuerich':null,
'zw':null
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