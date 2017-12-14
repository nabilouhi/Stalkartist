function request() {
	var artist = document.getElementById("query").value;
	q2=capitalizeFirstLetter(artist);
	console.log(q2);
	var result;
	fetch("https://fr.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles="+ q2, {
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
	    	if (result == "" && !art.includes("_(groupe)")) 
	    		return request(art+"_(groupe)");
	    	add(result,artist);
	});
}

function add(param,artist) {
	if (param == "") 
		document.getElementById("wikimedia").innerHTML = "L'artiste demandé n'a pas été trouvé sur wikipedia";
	else
		document.getElementById("wikimedia").innerHTML = "<center><b>"+artist+"</b></center><br>"+param;
}

function capitalizeFirstLetter(string) {
	string = string.charAt(0).toUpperCase() + string.slice(1);
	var ind = string.indexOf(' ');
	while(ind != -1) {
    	string = string.substr(0, ind)+"_"+string.charAt(ind+1).toUpperCase() + string.substr(ind+2,string.length);
    	ind = string.indexOf(' ');
	}
	return string;
}