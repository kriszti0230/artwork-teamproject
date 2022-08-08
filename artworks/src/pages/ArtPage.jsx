import React from "react";
import { useParams, Link } from "react-router-dom";
import Page from "../layout/Page";
import "./ArtPage.css";

export default function ArtPage(props) {
  const params = useParams();
  const artworkId = parseInt(params.id);

  const { artworks, userId, updateFavorites, favorites } = props;

  const isFavorite = favorites.includes(artworkId);

  //----------filter artworks----------
  const artwork = artworks?.find((artwork) => {
    return artwork.id === artworkId;
  });

  async function heartClick() {
    // A: a kattintás működése

    if (isFavorite) {
      const url = `http://localhost:5000/favorites`;
      const body = {
        // A: ez azu objektum amit küldünk a backend-nek
        userId: userId,
        artworkId: artworkId,
      };
      const requestOption = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      await fetch(url, requestOption);

      updateFavorites();
    } else {
      const url = `http://localhost:5000/favorites`;
      const body = {
        // A: ez azu objektum amit küldünk a backend-nek
        userId: userId,
        artworkId: artworkId,
      };
      const requestOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      await fetch(url, requestOption);

      updateFavorites();
    }
  }

  return (
    <Page>
      <div className="icons">
        <Link to="/">
          <i className="fa-solid fa-arrow-left-long"></i>
        </Link>
        {userId && (
          <i
            onClick={heartClick}
            className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        )}
      </div>
      {artwork ? (
        <div className="artwork-details container">
          <section className="img-section">
            <img src={artwork.primaryimageurl} alt="artwork" />
          </section>
          <section className="details-section">
            <h2>{artwork.title}</h2>
            <h3>{artwork.people[0].displayname}</h3>
            <h3>{artwork.period}</h3>
            <h3>{artwork.medium}</h3>
            <h3>{artwork.dimensions}</h3>
          </section>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Page>
  );
}
