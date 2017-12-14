
		function getAccessToken(){
			return document.getElementById("spoToken").value;
		}
		
		function getDirection(){
			var retour
			fetch("https://api.spotify.com/v1/search?q="+document.getElementById("query").value+"&type=artist", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+getAccessToken()
				}
			}).then(function(response) {
				response.json().then(function(data){
					retour = data.artists.items[0].id
				})
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
			return retour;
		}
	
		function getSpoToken() 
		{ 
			var accessToken =  document.getElementById("spoToken").value;
			var spoArtist = document.getElementById("query").value;
			var final_art
			var final_tra
			var final_alb
			var final_rel
			var result_artist
			var id_tra = 0
			var id_alb = 0
			var id_rel = 0
			
			fetch("https://api.spotify.com/v1/search?q="+spoArtist+"&type=artist", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			}).then(function(response) {
				response.json().then(function(data){
					result_artist = data
					getArtist(accessToken, result_artist.artists.items[0].id)
					getAlbum(accessToken, result_artist.artists.items[0].id)
					getTrack(accessToken, result_artist.artists.items[0].id)
					getRelated(accessToken, result_artist.artists.items[0].id)
				})
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
		}
		
		function getAlbum2() 
		{ 
			var accessToken = document.getElementById("spoToken").value;
			var spoArtist = document.getElementById("query").value;
			var final_alb
			
			fetch("https://api.spotify.com/v1/search?q="+spoArtist+"&type=artist", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			})
			.then(function(response) {
				response.json().then(function(data){
					result_artist = data
					fetch("https://api.spotify.com/v1/artists/"+result_artist.artists.items[0].id+"/albums", {
						headers: {
							Accept: "application/json",
							Authorization: "Bearer "+accessToken
						}
					}).then(function(response) {
						response.json().then(function(data){
							final_alb = data
							random_alb = (Math.floor((Math.random() * final_alb.items.length) + 1))
							document.getElementById('spo_image_alb').src=final_alb.items[random_alb].images[0].url
							document.getElementById('spo_text_alb').innerHTML=final_alb.items[random_alb].name
							document.getElementById('spo_link_alb').href=final_alb.items[random_alb].external_urls.spotify
						})
					})
					.catch(function(error) {
						console.log('Request failed', error)
					});
				})
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
			
			
		}
		
		function getTrack2() 
		{ 
			var accessToken = document.getElementById("spoToken").value;
			var spoArtist = document.getElementById("query").value;
			var final_tra
			
			fetch("https://api.spotify.com/v1/search?q="+spoArtist+"&type=artist", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			})
			.then(function(response) {
				response.json().then(function(data){
					result_artist = data
					fetch("https://api.spotify.com/v1/artists/"+result_artist.artists.items[0].id+"/top-tracks?country=FR", {
						headers: {
							Accept: "application/json",
							Authorization: "Bearer "+accessToken
						}
					}).then(function(response) {
						response.json().then(function(data){
							final_tra = data
							random_tra = (Math.floor((Math.random() * final_tra.tracks.length) + 1))
							document.getElementById('spo_text_tra').innerHTML=final_tra.tracks[random_tra].name
							document.getElementById('spo_link_tra').href=final_tra.tracks[random_tra].external_urls.spotify
						})
					})
					.catch(function(error) {
						console.log('Request failed', error)
					});
				})
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
			
			
		}
		
		function getRelated2() 
		{ 
			var accessToken = document.getElementById("spoToken").value;
			var spoArtist = document.getElementById("query").value;
			var final_rel
			
			fetch("https://api.spotify.com/v1/search?q="+spoArtist+"&type=artist", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			})
			.then(function(response) {
				response.json().then(function(data){
					result_artist = data
					fetch("https://api.spotify.com/v1/artists/"+result_artist.artists.items[0].id+"/related-artists", {
						headers: {
							Accept: "application/json",
							Authorization: "Bearer "+accessToken
						}
					}).then(function(response) {
						response.json().then(function(data){
							final_rel = data
							random_rel = (Math.floor((Math.random() * final_rel.artists.length) + 1))
							document.getElementById('spo_image_rel').src=final_rel.artists[random_rel].images[0].url
							document.getElementById('spo_text_rel').innerHTML=final_rel.artists[random_rel].name
							document.getElementById('spo_link_rel').href=final_rel.artists[random_rel].external_urls.spotify
							
						})
					})
					.catch(function(error) {
						console.log('Request failed', error)
					});
				})
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
			
			
		}
		
		function getArtist(accessToken, direction){
			fetch("https://api.spotify.com/v1/artists/"+direction, {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			})
			.then(function(response) {
				response.json().then(function(data){
					final_art = data
					document.getElementById('spo_image_art').src=final_art.images[0].url
					document.getElementById('spo_text_art').innerHTML=final_art.followers.total+" followers"
					document.getElementById('spo_link_art').href=final_art.external_urls.spotify
				})
			})
		}
		
		function getAlbum(accessToken, direction){
			fetch("https://api.spotify.com/v1/artists/"+direction+"/albums", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			})
			.then(function(response) {
				response.json().then(function(data){
					final_alb = data
					document.getElementById('spo_image_alb').src=final_alb.items[0].images[0].url
					document.getElementById('spo_text_alb').innerHTML=final_alb.items[0].name
					document.getElementById('spo_link_alb').href=final_alb.items[0].external_urls.spotify;
				})
			})		
		}
		
		function getTrack(accessToken, direction){
			fetch("https://api.spotify.com/v1/artists/"+direction+"/top-tracks?country=FR", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			})
			.then(function(response) {
				response.json().then(function(data){
					final_tra = data
					document.getElementById('spo_text_tra').innerHTML=final_tra.tracks[0].name;
					document.getElementById('spo_link_tra').href=final_tra.tracks[0].external_urls.spotify;
				})
			})
		}
		
		function getRelated(accessToken, direction){
			fetch("https://api.spotify.com/v1/artists/"+direction+"/related-artists", {
				headers: {
					Accept: "application/json",
					Authorization: "Bearer "+accessToken
				}
			})
			.then(function(response) {
				response.json().then(function(data){
					final_rel = data
					document.getElementById('spo_image_rel').src = final_rel.artists[0].images[0].url
					document.getElementById('spo_text_rel').innerHTML = final_rel.artists[0].name
					document.getElementById('spo_link_rel').href=final_rel.artists[0].external_urls.spotify
				})
			})
		}
		
		function mixColor(){
			document.getElementById('spo_image_rel').src=1
			document.getElementById('spo_image_rel').src=1
			document.getElementById('spo_image_rel').src=1
			document.getElementById('spo_image_rel').src=1
		}
		
