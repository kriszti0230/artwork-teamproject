import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ArtPage from "./pages/ArtPage";
import Favs from "./pages/Favs";
import "./App.css";
import "./reset.css";

function App() {
  //----------useState for fetch----------
  const [artworks, setArtworks] = useState([]);

  const [favoriteArtworkIds, setFavoriteArtworkIds] = useState([]);

  //----------useState for signIn----------
  const [user, setUser] = useState({});

  /*
  const favoriteArtworks = favoriteArtworkIds.map((id) =>
    artworks.find((artwork) => artwork.id === id)
  );
  */

  const favoriteArtworks = artworks.filter((artwork) =>
    favoriteArtworkIds.includes(artwork.id)
  );

  //----------fetch artworks----------
  async function fetchArtWorks() {
    //Harvard Art Museums API key
    const apikey = "e10c94fc-881a-4828-8c61-0139c224a2f5";

    //fetch URL
    const url = `https://api.harvardartmuseums.org/object?apikey=${apikey}&culture=Japanese&classification=Prints&q=peoplecount:1&hasimage=1&size=100`;

    const response = await fetch(url);

    const responseJson = await response.json();

    //show artworks with image
    setArtworks(
      responseJson.records.filter((artwork) => artwork.primaryimageurl !== null)
    );
  }

  //----------useEffect for fetch----------
  useEffect(() => {
    fetchArtWorks();
  }, []);

  //----------fetch favorites from backend----------
  //userId
  const userId = user.sub;

  const fetchFavorites = useCallback(async () => {
    if (userId) {
      const response = await fetch(`http://127.0.0.1:5000/favorites/${userId}`);
      const responseJson = await response.json();

      setFavoriteArtworkIds(responseJson);
    } else {
      setFavoriteArtworkIds([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleJwt = useCallback(
    (jwt) => {
      window.localStorage.setItem("artworkToken", jwt);
      let userObject = jwt_decode(jwt);
      setUser(userObject);
    },
    [setUser]
  );

  useEffect(() => {
    const jwt = window.localStorage.getItem("artworkToken");
    if (jwt) {
      handleJwt(jwt);
    }
  }, [handleJwt]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing artworks={artworks} />} />
        <Route
          path="/search/:value"
          element={<Landing artworks={artworks} />}
        />
        <Route
          path="/artwork/:id"
          element={
            <ArtPage
              userId={userId}
              artworks={artworks}
              updateFavorites={fetchFavorites}
              favorites={favoriteArtworkIds}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login user={user} setUser={setUser} handleJwt={handleJwt} />
          }
        />
        <Route
          path="/favorites"
          element={<Favs favoriteArtworks={favoriteArtworks} userId={userId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
