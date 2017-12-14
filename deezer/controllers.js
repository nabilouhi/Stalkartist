

var LOGNS = 'APP ::';
var APP_ID = '264202';
var CHANNEL_URL = 'http://localhost/stalkartist/channel.html';

var angapp = angular.module('app', []);

angapp.config(function($routeProvider) {
	$routeProvider
		.when("/albums", {
			action: "albums"
		})
		.when("/album/:id", {
			action: "album"
		})
		.when("/artists", {
			action: "artists"
		})
		.when("/artist/:id", {
			action: "artist"
		})
		.when("/favorites", {
			action: "favorites"
		})
		.when("/search/:pattern", {
			action: "search"
		});
});



angapp.directive('onKeyupSearch', function() {
	return function(scope, elm, attrs) {
		elm.bind("keyup", function(e) {
			console.log(LOGNS, 'search field: enter pressed');
			scope.trigger_search();
			scope.$apply();
		});
	};
});

angapp.controller("AppController", function($scope, $route, $routeParams, $location, $rootScope) {
	// Init config
	$rootScope.title = 'DZ';
	$scope.logged = false;

	$scope.view = 'loading';
	$scope.albums = [];
	$scope.artists = [];


	// Global for test purpose
	rootScope = $rootScope;
	scope = $scope;

	DZ.init({
		appId: APP_ID,
		channelUrl: CHANNEL_URL,
		player: {

		}
	});

	// --------------------------------------------------- Methods

	$scope.login = function() {
		console.log(LOGNS, 'login clicked');

		DZ.login(function(response) {
			if (response.authResponse) {
				console.log(LOGNS, 'logged');
				$scope.logged();
			} else {
				console.log(LOGNS, 'not logged');
			}
		}, {scope: 'manage_library,basic_access'});
	};

	$scope.logged = function() {
		$scope.logged = true;
		console.log(LOGNS, 'Player loaded');
		$('#controls').css('opacity', 1);
		$scope.handleRoute();
	};

	$scope.trigger_search = function(){
		var query = $scope.query;
		console.log(LOGNS, 'Search for', query);

		if (query) {
			$location.path("/search/"+query);
		} else {
			if ($scope.last_path) {
				$location.path($scope.last_path);
			} else {
				$location.path('/');
			}
		}
	};



	// --------------------------------------------------- Angular events

	$scope.$watch('query', function(query, oldValue) {
		if (query !== oldValue) {
			console.log(LOGNS, 'watch query', query, oldValue);
			$scope.trigger_search();
		}
	});

	$scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
		if ($scope.logged) {
			if ($route.current.action !== 'search') {
				$scope.last_path = $location.path(); // when empty search go to this
			}

			$scope.handleRoute();
		}
	});

	$scope.sliderClicked = function(e) {
		var slider = $(e.delegateTarget);
		var x = e.clientX - slider.offset().left;
		var xMax = slider.width();
		console.log(LOGNS, e.clientX, slider.offset().left, e);
		console.log(LOGNS, x / xMax * 100);
		DZ.player.seek(x / xMax * 100);
	};

	// --------------------------------------------------- DZ events

	DZ.Event.subscribe('player_loaded', function(){
		console.log(LOGNS, 'check login...');

		DZ.getLoginStatus(function(response) {
			if (response.authResponse) {
				console.log(LOGNS, 'check login: logged');
				$scope.logged();
			} else {
				console.log(LOGNS, 'check login: not logged');
				$scope.view = 'login';
			}
			$scope.$apply();
		}, {scope: 'manage_library,basic_access'});
	});

	DZ.Event.subscribe('player_play', function(e){
		console.log(LOGNS, "player_play");
		$scope.playing = true;
		$scope.$apply();
	});

	DZ.Event.subscribe('player_paused', function(e){
		console.log(LOGNS, "player_paused");
		$scope.playing = false;
		$scope.$apply();
	});

	DZ.Event.subscribe('player_position', function(e){
		//flood console.log(LOGNS, "Player position", e);
		$scope.time_current = e[0];
		if (e[1]) $scope.time_total = +e[1];
		$scope.$apply();
	});

	DZ.Event.subscribe('current_track', function(e){
		console.log(LOGNS, "current_track", e);

		$scope.playing_artist = e.track.artist.name;
		$scope.playing_artist_link = '#/artist/'+e.track.artist.id;
		$scope.playing_title = e.track.title;
		$scope.playing_album_link = '#/album/'+e.track.album.id;
		$scope.$apply();

		DZ.api('/track/' + e.track.id, function(response){
			console.log(LOGNS, response.album.cover);
			$scope.playing_cover_src = response.album.cover;
			$scope.$apply();
		});
	});

	// --------------------------------------------------- Handle routes

	$scope.handleRoute = function() {
		var renderAction = $route.current.action;
		console.log(LOGNS, 'handleRoute', renderAction);
		console.log(LOGNS, 'width params', $routeParams);

		switch (renderAction) {
			case 'albums':
				DZ.api('/user/me/albums', function(response){
					console.log(LOGNS, 'albums', response.data);
					$scope.albums = response.data;
					$scope.view = renderAction;
					$rootScope.title = 'Albums';
					$scope.$apply();

					$('img').on('load', function(){
						console.log(LOGNS, this);
						$(this).css('opacity', 1);
					});
				});
				break;
			case 'album':
				DZ.api('/album/' + encodeURIComponent($routeParams.id), function(response){
					console.log(LOGNS, 'album', $routeParams.id, response);
					var tracks = response.tracks.data;
					var tracks_ids = [];
					for (var prop in tracks) {
						tracks_ids.push(tracks[prop].id);
					}
					$scope.tracks_ids = tracks_ids;
					$scope.album = response;
					$scope.view = renderAction;
					$rootScope.title = response.title;
					$scope.$apply();
				});
				break;

			case 'artists':
				DZ.api('/user/me/artists', function(response){
					console.log(LOGNS, 'artists', response.data);
					$scope.artists = response.data;
					$scope.view = renderAction;
					$rootScope.title = 'Artists';
					$scope.$apply();

					$('img').on('load', function(){
						console.log(LOGNS, this);
						$(this).css('opacity', 1);
					});
				});
				break;
			case 'artist':
				DZ.api('/artist/' + encodeURIComponent($routeParams.id), function(response){
					console.log(LOGNS, 'artist', $routeParams.id, response);
					$scope.artist = response;
					$scope.view = renderAction;
					$rootScope.title = response.name;
					$scope.$apply();

					DZ.api('/artist/' + $routeParams.id + '/albums', function(response){
						console.log(LOGNS, 'artist albums', response.data);
						$scope.albums = response.data;
						$scope.view = renderAction;
						$scope.$apply();

						$('img').on('load', function(){
							console.log(LOGNS, this);
							$(this).css('opacity', 1);
						});
					});
				});
				break;

			case 'favorites':
				DZ.api('/user/me/tracks', function(response){
					console.log(LOGNS, 'favorites', response.data);
					var tracks_ids = [];
					for (var i=0, track; track=response.data[i]; i++) {
						tracks_ids.push(track.id);
					}
					$scope.favorites = response.data;
					$scope.tracks_ids = tracks_ids;
					$scope.view = renderAction;
					$rootScope.title = 'Favorites';
					$scope.$apply();
				});
				break;

			case 'search':
				var query = $scope.query = $routeParams.pattern;

				DZ.api('/search?q=' + encodeURIComponent(query), function(response){
					console.log(LOGNS, 'search tracks', response.data);
					$scope.search_tracks = response.data.slice(0, 10);
					$scope.view = 'search';
					$scope.$apply();
				});

				DZ.api('/search/album?q=' + encodeURIComponent(query), function(response){
					console.log(LOGNS, 'search album', response.data);
					$scope.search_albums = response.data.slice(0, 10);
					$scope.view = 'search';
					$scope.$apply();
				});

				DZ.api('/search/artist?q=' + encodeURIComponent(query), function(response){
					console.log(LOGNS, 'search artist', response.data);
					$scope.search_artists = response.data.slice(0, 10);
					$scope.view = 'search';
					$scope.$apply();
				});

				$scope.view = 'loading';
				$rootScope.title = 'Search: ' + query;
				$scope.$apply();
				break;

			default:
				return;
		}

		$scope.view = 'loading';
	};
});
