const functions = require("firebase-functions");

const cors = require("cors")({
  origin: true
});

const admin = require("firebase-admin");
admin.initializeApp();

makeSlug = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 21; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

exports.newgroup = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "POST") {
      const slug = makeSlug();
      const t = Date.now();
      admin
        .database()
        .ref("/groups")
        .orderByChild("slug")
        .equalTo(slug)
        .limitToFirst(1)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            return res.json({ error: "Slug already in use!" });
          } else {
            admin
              .database()
              .ref("/groups")
              .push({ slug: slug, createdAt: t });

            return res.json({ slug: slug });
          }
        });
    } else {
      res.statusCode = 405;
      return res.json({ error: "Method not allowed!" });
    }
  });
});

exports.getgroup = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "GET") {
      admin
        .database()
        .ref("/groups")
        .orderByChild("slug")
        .equalTo(req.query.slug)
        .limitToFirst(1)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            return res.json(snapshot.val());
          } else {
            return res.json({ error: "Slug invalid!" });
          }
        });
    } else {
      return res.json({ error: "Method not allowed!" });
    }
  });
});
