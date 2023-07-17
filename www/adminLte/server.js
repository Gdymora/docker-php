const express = require("express");
const fetch = require("node-fetch");
const app = express();
const WP_ENDPOINT = "https://www.jdymora.com";
app.use(express.static(__dirname + "/dist/angularjs-to-angular/"));

app.get("/api", function (req, res) {
  res.send("hello");
});

//https://bump.sh/hivepress/doc/rest-api
const hivePress = async () => {
  const posts = await fetch(`${WP_ENDPOINT}/wp-json/hivepress/v1`);
  console.log(posts);
  const postsJson = await posts.json();
  return postsJson;
};

app.get("/hive", async (req, res) => {
  try {
    const posts = await hivePress();
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});
const hivePressList = async () => {
    try {
      const response = await fetch(`${WP_ENDPOINT}/wp-json/hivepress/v1/listings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            "jdymora:lY5vmJKWzBCiNv7f82L5QE9r",
            "utf-8"
          ).toString("base64")}`,
        } 
      });
      
      if (response.status !== 200) {
        throw new Error("Failed to fetch listings");
      }
      
      const postsJson = await response.json();
      return postsJson;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

app.get("/hivelist", async (req, res) => {
  try {
    const posts = await hivePressList();
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});

  app.get("/api", function (req, res) {
    res.send("hello");
  });
//https://developer.wordpress.org/rest-api/reference/
const fetchPosts = async () => {
  const posts = await fetch(`${WP_ENDPOINT}/wp-json/wp/v2/posts`);
  console.log(posts);
  const postsJson = await posts.json();
  return postsJson;
};

app.get("/posts", async (req, res) => {
  try {
    const posts = await fetchPosts();
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});
const createdPost = async () => {
  const posts = await fetch(`${WP_ENDPOINT}/wp-json/wp/v2/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(
        "jdymora:lY5vmJKWzBCiNv7f82L5QE9r",
        "utf-8"
      ).toString("base64")}`,
    },
    body: JSON.stringify({
      title: "New post title",
      content: "New content2",
    }),
  });
  return posts;
};

app.get("/create", async (req, res) => {
  try {
    const posts = await createdPost();
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});


/* app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/angularjs-to-angular/index.html'));
}); */

app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port 3000! http://localhost:3000/");
});
