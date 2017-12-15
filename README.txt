"# Stalkartist" 

READ_ME

Stalkartist Project

Projet de 5 étudiant MIASHS UM3 2017-2018

Delaforge Alexis : Api Spotify 
Ouhi Nabil : Api Youtube + assemblage
Maillot Sylvain : Api Wikipedia
Landolsi Mohammed amine : Api Deezer

Spotify section :

Pour récupérer un token Spotify, vous devez vous rendre à ce lien : (par exemple)
https://developer.spotify.com/web-api/console/get-search-item/
Ceci nécessitera un compte Spotify. /!\
Il vous faudra ensuite cliquer sur "GET OAUTH TOKEN"
Il n'est pas nécessaire de cocher quoi que ce soit dans la fenêtre qui s'ouvre.
Cliquer sur "REQUEST TOKEN"
La page se charge alors avec le TOKEN dans le champ "OAuth Token"
Vous pouvez alors copié l'intégralité de ce TOKEN et vous en servir dans l'API pour avoir accès aux informations Spotify.


Youtube section : 
Je récupère les ID des videos youtube à l'aide d'une clé (API KEY ) sur le site suivant  :
https://console.developers.google.com (  Youtube Data API )
Elle peut posséder des restrictions que je peux choisir d'appliquer ou pas.
On peut précisé par example : l'utilisation uniquement sur un domaine (serveur web) ou  de sur un Référents HTTP (sites Web).
Elle est valable pendant 2 mois et limité à 10 000 requetage .
Si vous compter corriger après fin février, contacter moi je vous générerai une autre clé provisoire.

Ma requête retourne un fichier json contenant une liste de video avec leur identifiant, leur description
et un grand nombre d'information concernant la video et les info du « channel ».
Je récupère que seulement l'idendifiant des 4 premières pour les afficher sur le site . 
(Pour plus de détails voir le fichier YoutubeSearchAPI.js, où j'ai détaillé toutes les étapes )



Wikipedia section : 


Deezer section : 