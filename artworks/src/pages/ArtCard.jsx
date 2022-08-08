import React from "react";
import "./ArtCard.css";
import { Link } from "react-router-dom";

export default function ArtCard(props) {
  //----------PROPS----------
  const { artwork } = props;

  return (
    <Link to={"/artwork/" + artwork.id}>
      <section className="artcard" key={artwork.id}>
        <img src={artwork.primaryimageurl} alt="artwork" />
        <h3 className="artcard-title">{artwork.title}</h3>
        <h4 className="artcard-dated">{artwork.people[0].displayname}</h4>
      </section>
    </Link>
  );
}
