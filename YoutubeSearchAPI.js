
function search2() {
	// Je récupere les mots clés ( nom de l'artiste)
	// je récupére la div ou on affichera les résultats
	// je change les espaces des mots clé en "+" 
	//  key =clé d'acces à changer tout les 2 mois ( clé qu'on peut restreindre au domaine qui fait la requete) 
	// je concatene le tout pour faire la requete 
	
	var q = document.getElementById("query").value; 
	var box = document.getElementById("box") 			
   	q2=q.replace(" ", "+"); 													
   var key='AIzaSyAtz8IfLeVxdw-vvgdzdtxS2u9JzSUiy1g'	
	var RQ ='https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q='+q2+'&type=video&key='+key+''; 

	var result=""; // initialisation 
	var integration=""; // initialisation
	
	// on effectue la requete à l'aide du fetch , on repupere la réponse qu'on lit en json 
	// et pui à la moulinette on parrcours les données pour recupere les id des video 
	// on concatene les id avec le lien youtube 
	// puis avec le iframe pour les integrer au html  
	fetch(RQ).then( 
		function(response){
			response.json().then(function(data){
					for (i=1;i<5;i++) {
						result ='https://www.youtube.com/embed/'+ data.items[i].id.videoId;
						integration +=' <div class="card"><iframe width="320" height="240" src="'+result+'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe></div>';
						box.innerHTML=integration;
					}
			})
		}
	)	
}
