import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Page from "../layout/Page";
import SearchBar from "./SearchBar";
import ArtCardList from "./ArtCardList";

import "./Favs.css";

export default function Favs(props) {
  const { favoriteArtworks, userId } = props;

  const navigate = useNavigate();

  //----------useState for searchBar value----------
  const [value, setValue] = useState("");

  function handleClick() {
    navigate("/login");
  }

  //----------filter favorite artworks----------
  const filteredFavoriteArtWorks = favoriteArtworks.filter((artwork) => {
    return artwork.people[0].displayname
      .toLowerCase()
      .includes(value.toLowerCase());
  });

  return (
    <Page>
      <SearchBar value={value} setValue={setValue} />
      <Link to="/">
        <i className="fa-solid fa-arrow-left-long"></i>
      </Link>
      {userId ? (
        <ArtCardList artworks={filteredFavoriteArtWorks} />
      ) : (
        <div className="loginWrapper">
          <button className="loginInFavs" onClick={handleClick}>
            Please log in
          </button>
        </div>
      )}
    </Page>
  );
}
