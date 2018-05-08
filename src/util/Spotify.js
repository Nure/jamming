const clientID = 'e1b8ce82ad16470a9fc1d30f2c3be6ba';
const redirectURI = 'http://localhost:3000';

const url = window.location.href;
let userAccessToken = url.match(/access_token=([^&]*)/);
let expiresIn = url.match(/expires_in=([^&]*)/);


const Spotify = {
    getAccessToken() {
        if(!this.userAccessToken === '') {
            return userAccessToken;
            // console.log('obtained existing : ' + userAccessToken);
        } else if(!userAccessToken && expiresIn === '') {
            window.setTimeout(() => userAccessToken = null, expiresIn = 3000);
            window.history.pushState('Access Token', null, '/')
            console.log('obtained a new token' + userAccessToken);
            return userAccessToken;
            // console.log('obtained a new token' + userAccessToken);
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(term) {
        this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&limit=10&q=${term}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        }).then(response => {
            if(response.ok) {
                return response.json;
            }
            throw new Error('Request Failed!');
        }, networkError => console.log(networkError.message)).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    title: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
                // console.log(jsonResponse.tracks);
            } else {
                return [];
            }
        })
    }

}
export default Spotify;
