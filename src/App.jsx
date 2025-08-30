import Index from "./Index";
import Create from "./Create";
import axios from "axios";
import { useState, useEffect } from "react";
const apiUrl = `http://${window.location.hostname}:3000/api/`

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [playlistUri, setPlaylistUri] = useState(null)


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    window.history.replaceState({}, document.title, window.location.pathname);
    const code = params?.get("code");
    const state = params?.get('state');
    if (code && state) {
      getLoginTokenFromSpotify(code, state);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.expiresAt > Date.now()) {
      setUser(user)
      return true
    }
    localStorage.removeItem("user")
    setUser(null)
    return false
  }

  const LoginWithSpotify = async () => {
    if (checkUser()) return true;

    try {
      const res = await axios.get(`${apiUrl}login.php`);
      if (res.data && res.data.url) {
        window.location.href = res.data.url;
      } else {
        console.error("No login URL returned from backend");
      }
    } catch (err) {
      console.error("Login request failed:", err);
    }
  };

  const getLoginTokenFromSpotify = async (code, state) => {
    const res = await axios.get(`${apiUrl}/callback.php?code=${code}&state=${state}`)
    if (res.data && res.data.status) {
      const res2 = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${res.data.accessToken}`
        }
      });
      if (res2 && res2.data) {
        localStorage.setItem('user', JSON.stringify({
          accessToken: res.data.accessToken,
          expiresAt: res.data.expiresAt,
          name: res2.data.display_name,
          id: res2.data.id,
          profileImg: res2.data.images?.[0]?.url || null
        }))

        setUser({
          accessToken: res.data.accessToken,
          expiresAt: res.data.expiresAt,
          name: res2.data.display_name,
          id: res2.data.id,
          profileImg: res2.data.images?.[0]?.url || null
        })
      }

      alert("Login successful! You can now close this tab.")
    } else {
      alert(res.data.error || "Login failed")
    }


  }
  const login = async () => {
    setIsLoading(true)
    const res = await LoginWithSpotify()
    setIsLoading(false)
  }

  const createPlaylist = async () => {
    setIsLoading(true);

    if (!playlistName) {
      alert("Please enter a playlist name");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Create playlist
      const createRes = await axios.post(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          name: playlistName,
          description: "Created with NotDMs",
          public: false
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      const playlistId = createRes.data.id;
      const playlistUrl = createRes.data.external_urls.spotify;
      setPlaylistUri(playlistUrl)
      console.log(`Created playlist "${playlistName}" (${playlistId})`);

      // 2. Fetch ALL liked songs (paginate 50 at a time)
      let uris = [];
      let offset = 0;
      const limit = 50;

      while (true) {
        const res = await axios.get(
          `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` }
          }
        );

        const items = res.data.items;
        if (!items.length) break;

        uris = uris.concat(items.map(item => item.track.uri));

        if (items.length < limit) break;
        offset += limit;
      }

      console.log(`Fetched ${uris.length} liked songs`);

      // 3. Add tracks in batches of 100
      for (let i = 0; i < uris.length; i += 100) {
        const batch = uris.slice(i, i + 100);
        await axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          { uris: batch },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );
      }

      alert(`Playlist "${playlistName}" created with ${uris.length} songs!`);

      setIsLoading(false);
      setShowModal(false);
      setShowPlaylistModal(true);
      return playlistUrl; // 🎯 return share URL

    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the playlist. Please try again.");
      setIsLoading(false);
    }
  };



  return (
    <main className="h-screen w-full py-10 bg-black">
      {!user && <Index onClick={login} isLoading={isLoading} />}
      {user && <Create playlistUri={playlistUri} showPlaylistModal={showPlaylistModal} setShowPlaylistModal={setShowPlaylistModal} showModal={showModal} setShowModal={setShowModal} isLoading={isLoading} setPlaylistName={setPlaylistName} createPlaylist={createPlaylist} setIsLoading={setIsLoading} name={user.name} />}

    </main>
  )
}

export default App;