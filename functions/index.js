const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({
  origin: true
});

admin.initializeApp();
db = admin.database();

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
      const name = req.query.name;
      if (!name) {
        return res.json({ error: "Missing parameter 'name'!" });
      } else if (name.length > 25) {
        return res.json({
          error: "Parameter 'name' only allows 25 characters!"
        });
      }
      db.ref("/groups")
        .orderByKey()
        .equalTo(slug)
        .limitToFirst(1)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            return res.json({ error: "Slug already in use!" });
          } else {
            db.ref("/groups")
              .child(slug)
              .set({ name: name, createdAt: t });

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
      const slug = req.query.slug;
      db.ref("/groups")
        .orderByKey()
        .equalTo(slug)
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
