var artist = "lomepal";
var result;

fetch("https://fr.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles="+ artist, {
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
	    	console.log(t[id].extract);
	    	result = t[id].extract;
	    	document.getElementById("wikimedia").innerHTML = result;
	});


