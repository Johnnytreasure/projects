const clientId = 'af18c3ae47974b9fb04fc642ca7a86f9';
const authorizationUrl = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000';
let accessToken;
let requestTime;
let expirationTime;
let userId;


const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (!accessToken) {
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
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      header:  {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
      return response.json();
      }
    }).then(jsonResponse => {
      if (!jsonResponse.tracks.items) {
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
   const accessToken= Spotify.getAccessToken();
   const headers = {
     Authorization: `Bearer ${accessToken}` };

   if (!playlistName || !trackURIs) {
     return fetch(`https://api.spotify.com/v1/me`, {
     headers: headers
   }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.log('failed to get userId');
      }
    }).then(jsonResponse => {
      if (jsonResponse.id) {
       userId = jsonResponse.id;
     }
     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
   {
     headers: headers,
     method: 'POST',
     body: JSON.stringify({name: playlistName})}
   ).then(response => {
    if (response.ok) {
        return response.json();
    } else {
      console.log('failed to create new playlist');
    }
  }).then(jsonResponse => {
    if (jsonResponse.id) {
      playlistId = jsonResponse.id;
    }
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {headers: headers, method: 'POST', body: JSON.stringify({uris: trackURIs})});
      });
    });
    }
  }
};

export default Spotify;

// return fetch(`https://accounts.spotify.com/authorize?client_id=af18c3ae47974b9fb04fc642ca7a86f9&redirect_uri=${uri}&response_type=token`);
