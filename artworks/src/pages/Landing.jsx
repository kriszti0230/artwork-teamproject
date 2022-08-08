import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../layout/Page";
import SearchBar from "./SearchBar";
import ArtCardList from "./ArtCardList";
import "./Landing.css";

export default function Landing(props) {
  //----------PROPS----------
  const { artworks } = props;

  //----------useParams for url from searchBar----------
  const params = useParams();

  //----------useState for searchBar value----------
  const [value, setValue] = useState(params.value || "");

  //----------filter artworks----------
  const filteredArtWorks = artworks.filter((artwork) => {
    return artwork.people[0].displayname
      .toLowerCase()
      .includes(value.toLowerCase());
  });

  //----------useNavigate for search results----------
  const navigate = useNavigate();

  //----------useEffect for search results----------
  useEffect(() => {
    if (value !== "") {
      navigate(`/search/${value}`);
    } else {
      navigate("/");
    }
  }, [navigate, value]);

  return (
    <Page>
      <SearchBar value={value} setValue={setValue} />
      <ArtCardList artworks={filteredArtWorks} />
    </Page>
  );
}
