function request() {
	var artist = document.getElementById("query").value;
	q2=capitalizeFirstLetter(artist);
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
	HTMLL="<div id='wikibox'> "
function add(param,artist) {
	var Q = document.getElementById("query").value;
	q2=capitalizeFirstLetter(Q);
	document.getElementById("wikimedia").innerHTML = "";
	if (param === ""  ) 
		document.getElementById("wikimedia").innerHTML = HTMLL+"<h2>"+artist+"</h2><p>L'artiste demandé n'a pas été trouvé sur wikipedia </p></div>";
	else
		document.getElementById("wikimedia").innerHTML = HTMLL+"<h2>"+artist+"</h2><br>"+param+"<br><p style='text-align:right'>Source: <a href='https://fr.wikipedia.org/wiki/"+q2+"'>Wikipedia</a></p></div>";
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