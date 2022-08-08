const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors());

//----------Endpoint for favorites----------
app.get("/favorites/:userId", (req, res) => {
  let { userId } = req.params;

  fs.readFile("favorites.json", "utf8", (err, data) => {
    const favorites = JSON.parse(data);

    if (err) throw err;

    res.send(favorites[userId] || []);
  });
});

//----------Endpoint for POST favorites----------
app.post("/favorites", (req, res) => {
  let userId = req.body.userId;
  let artworkId = req.body.artworkId;

  fs.readFile("favorites.json", "utf8", (err, data) => {
    const favorites = JSON.parse(data);

    if (favorites[userId] === undefined) {
      favorites[userId] = [];
    }

    if (!favorites[userId].includes(artworkId)) {
      favorites[userId].push(artworkId);
    }

    fs.writeFile(
      "favorites.json",
      JSON.stringify(favorites, null, 4),
      (err) => {
        if (err) throw err;
        console.log("Artwork is added to favorites");
        res.send();
      }
    );
  });
});

//----------Endpoint for delete from favorites----------
app.delete("/favorites", (req, res) => {
  const userId = req.body.userId;
  const artworkIdToDelete = req.body.artworkId;

  fs.readFile("favorites.json", "utf8", (err, data) => {
    const favorites = JSON.parse(data);

    if (favorites[userId] === undefined) {
      res.send();
      return;
    }

    favorites[userId] = favorites[userId].filter(
      (artworkId) => artworkId !== artworkIdToDelete
    );
    /* a filter egy true/false-t ad vissza, ezért a filtert így használjuk, ahogy fentebbb*/

    fs.writeFile(
      "favorites.json",
      JSON.stringify(favorites, null, 4),
      (err) => {
        if (err) throw err;
        console.log("Artwork is deleted from favorites");
        res.send();
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});
