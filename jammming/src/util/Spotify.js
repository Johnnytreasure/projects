const clientId = 'af18c3ae47974b9fb04fc642ca7a86f9';
const redirectUri = 'http://JohnnyJammming.surge.sh';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
      const urlToken = window.location.href.match(/access_token=([^&]*)/);
      const expirationTime = window.location.href.match(/expires_in=([^&]*)/);
      if (urlToken && expirationTime) {
        accessToken = urlToken[1];
        const expiresIn = parseInt(expirationTime[1])
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
        window.location = accessUrl;
      }
  },

  search(term) {
    let accessToken= Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers:  {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
      return response.json();
      }
      throw new Error('Request failed');
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map( track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
    })
  },

 savePlaylist(playlistName, trackURIs) {
   let userId;
   let playlistId;
   const headers = {
     Authorization: `Bearer ${accessToken}`
   };
   if (!playlistName || !trackURIs)return;
   fetch(`https://api.spotify.com/v1/me`, {
     headers: headers
   })
   .then(response => response.json())
  .then(jsonResponse => userId = jsonResponse.id)
   .then(() => {
     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
       {
         method: 'POST',
         headers: headers,
         body: JSON.stringify({
           name: playlistName
        }
     )}
   )})
   .then(response => response.json())
    .then(jsonResponse => playlistId = jsonResponse.id)
    .then(() => {
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
          uris: trackURIs
          })
        });
      });
    }
  };

export default Spotify;
