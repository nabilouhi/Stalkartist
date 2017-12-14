var artist = "muse";
var result;

function request(art) {
	fetch("https://fr.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles="+ art, {
	    method: 'POST',
	    headers: new Headers( {'Api-User-Agent': 'Example/1.0'})
	        } ).
	        then( function ( response ) {
	        	return response.json()}).then (function (response) {
	    result = response;
	    var t = result.query.pages;

	    var id;
	    for (k in t);
	    	id = k;
	    	result = t[id].extract;
	    	console.log(result);
	    	console.log(art);
	    	if (result == "" && !art.includes("_(groupe)")) 
	    		return request(art+"_(groupe)");
	    	test(result);
	});
}

function test(param) {
	if (param == "") 
		document.getElementById("wikimedia").innerHTML = "L'artiste demandé n'a pas été trouvé sur wikipedia";
	else
		document.getElementById("wikimedia").innerHTML = param;
}

request(artist);