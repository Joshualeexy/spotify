import Index from "./Index";
import Create from "./Create";
import axios from "axios";
import { useState, useEffect } from "react";
const apiUrl = `http://${window.location.hostname}:3000/api/`

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
          profileImg: res2.data.images?.[0]?.url || null
        }))

        setUser({
          accessToken: res.data.accessToken,
          expiresAt: res.data.expiresAt,
          name: res2.data.display_name,
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
    setIsLoading(true) }

  return (
    <main className="h-screen w-full py-10 bg-black">
      {!user && <Index onClick={login} isLoading={isLoading} />}
      {user && <Create isLoading={isLoading} createPlaylist={createPlaylist} setIsLoading={setIsLoading} name={user.name} />}

    </main>
  )
}

export default App;