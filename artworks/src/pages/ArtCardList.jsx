import React from "react";
import ArtCard from "./ArtCard";

export default function ArtCardList(props) {
  const { artworks } = props;

  return (
    <section className="artwork-container">
      {artworks.map((artwork) => (
        <ArtCard key={artwork.id} artwork={artwork} />
      ))}
    </section>
  );
}
