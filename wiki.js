var artist = "lomepal";
var result;

function test(art) {fetch("https://fr.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles="+ art, {
	    method: 'POST',
	    headers: new Headers( {'Origin': '*','Api-User-Agent': 'Example/1.0'})
	        } ).
	        then( function ( response ) {
	        	return response.json()}).then (function (response) {
	    result = response;
	    var t = result.query.pages;

	    var id;
	    for (k in t);
	    	id = k;
	    	console.log(t[id].extract);
	});
}

console.log(test(artist));