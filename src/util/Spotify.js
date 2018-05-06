const apiSecret = '4b19f5c73be1430dbd444346198abc82';
const clientID = '28adf6a9ddc44165bef6d067ef9ec4dc';
const redirectURI = 'http://localhost:3000/callback/';

let userAccessToken = '';
let expiresIn = '';

const Spotify = {
    getAccessToken() {
        const url = window.location.href;
        const token = url.match(/access_token=([^&]*)/);
        const time = url.match(/expires_in=([^&]*)/);
        if(!this.userAccessToken === '') {
            return userAccessToken;
        } else if(!token && time === '') {
            userAccessToken = token;
            expiresIn = time;
            window.setTimeout(() => userAccessToken = '', expiresIn = 1000);
            window.history.pushState('Access Token', null, '/')
            return userAccessToken;
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    search(term) {
        return fetch(`https://api.spotify.com/v1/search&q=${term}&type=track&limit=10`, {
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
            } else {
                return [];
            }
        })
    }

}
export default Spotify;
